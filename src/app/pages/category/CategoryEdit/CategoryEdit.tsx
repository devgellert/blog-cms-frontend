import React, { FormEventHandler, useEffect } from "react";
import { FC, memo } from "react";
import { map, unset } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import Input from "../../../components/Input/Input";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
import SelectField from "../../../components/inputs/SelectField/SelectField";
import useInput from "../../../../lib/hooks/useInput";
import { ApiCategory } from "../../../../types/api";
import api from "../../../../api";
import getAxiosFieldError from "../../../../lib/getAxiosFieldError";
import getAxiosError from "../../../../lib/getAxiosError";
import isSlugError from "../../../../lib/isSlugError";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import { uiActions } from "../../../../redux/ui/slice";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
//
import css from "./CategoryEdit.module.scss";

type Props = {};

const CategoryEdit: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const parentCategories = useSelector(CategorySelectors.getParentCategories);
    const isCategoryCreatePageLoading = useSelector(CategorySelectors.isCategoryCreatePageLoading);

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});
    const { value: slug, setValue: setSlug, errorText: slugError, setError: setSlugError } = useInput({});
    const {
        value: parent,
        setValue: setParent,
        errorText: parentError,
        setError: setParentError
    } = useInput({ initialValue: "0" });

    useEffect(() => {
        dispatch(categoryActions.initializeCategoryCreatePage());

        (async () => {
            try {
                const { data }: AxiosResponse<ApiCategory> = await api.get(`/categories/${categoryId}`);
                setName(data.name);
                setSlug(data.slug);
                setParent(data.parent);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const onSubmit: FormEventHandler = async event => {
        try {
            event.preventDefault();

            dispatch(categoryActions.setIsCategoryCreatePageLoading(true));

            setNameError("");
            setParentError("");
            setSlugError("");

            const normalizedParent = parent == "0" ? null : Number(parent);

            const body = {
                name: name,
                slug: slugify(slug),
                parent: normalizedParent
            };

            if (body.parent === null) {
                unset(body, "parent");
            }

            const response: AxiosResponse<ApiCategory> = await api.put(`/categories/${categoryId}`, body);

            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully edited category." }));
            navigate(`/categories/${response.data.id}`);
        } catch (e) {
            setErrors(e);
            dispatch(uiActions.displaySnackbar({ type: "error", text: "Failed to edit category." }));
        } finally {
            dispatch(categoryActions.setIsCategoryCreatePageLoading(false));
        }
    };

    const setErrors = (e: any) => {
        const nameError = getAxiosFieldError(e, "name");
        setNameError(nameError);
        const slugError = getAxiosFieldError(e, "slug");
        setSlugError(slugError);
        const parentError = getAxiosFieldError(e, "parent");
        setParentError(parentError);

        const axiosError = getAxiosError(e);
        if (isSlugError(axiosError)) {
            setSlugError(axiosError);
        }
    };

    const parentChoices = map([{ id: 0, name: "-" }, ...(parentCategories || [])], elem => ({
        value: elem.id,
        text: elem.name
    }));

    return (
        <PageWrap title="New Category" buttons={[]} isLoading={isCategoryCreatePageLoading}>
            <Container maxWidth="lg" className={css["CategoryEdit"]}>
                <form onSubmit={onSubmit}>
                    <TwoColumnGrid>
                        <SimpleCard>
                            <Typography variant="h6">General</Typography>

                            <Input value={name} setValue={setName} label="Name" errorText={nameError} hasMarginBottom />

                            <SelectField
                                labelId="parent-label"
                                label="Parent"
                                errorText={parentError}
                                value={parent}
                                onChange={e => setParent(e.target.value)}
                                choices={parentChoices}
                            />
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6">SEO</Typography>

                            <SlugField slug={slug} setSlug={setSlug} slugError={slugError} />
                        </SimpleCard>
                    </TwoColumnGrid>

                    <Button type="submit" color="success" variant="contained" className={css["button"]}>
                        Save
                    </Button>
                </form>
            </Container>
        </PageWrap>
    );
};

export default memo(CategoryEdit);
