import React, { FormEventHandler, useEffect } from "react";
import { FC, memo } from "react";
import { unset } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
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
import { uiActions } from "../../../../redux/ui/slice";
import SlugField from "../../../components/inputs/SlugField/SlugField";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
//
import css from "./CategoryCreate.module.scss";

const CategoryCreate: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const parentCategoryChoices = useSelector(CategorySelectors.getCategoryOptions);
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
        dispatch(categoryActions.initCategoryOptionsRequest({ flow: "category-create-page" }));
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

            const response: AxiosResponse<ApiCategory> = await api.post("/categories", body);

            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully created category." }));
            navigate(`/categories/${response.data.id}`);
        } catch (e) {
            dispatch(uiActions.displaySnackbar({ type: "error", text: "Failed to create category." }));
            setErrors(e);
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

    return (
        <PageWrap title="New Category" buttons={[]} isLoading={isCategoryCreatePageLoading}>
            <Container maxWidth="lg" className={css["CategoryCreate"]}>
                <form onSubmit={onSubmit}>
                    <div className={css["input-grid"]}>
                        <SimpleCard>
                            <Typography variant="h6">General</Typography>

                            <Input
                                name="category-name"
                                value={name}
                                setValue={setName}
                                label="Name"
                                errorText={nameError}
                                hasMarginBottom
                            />

                            <SelectField
                                name="category-parent"
                                labelId="parent-label"
                                label="Parent"
                                errorText={parentError}
                                value={parent}
                                onChange={e => setParent(e.target.value)}
                                choices={parentCategoryChoices}
                            />
                        </SimpleCard>

                        <SimpleCard>
                            <Typography variant="h6">SEO</Typography>

                            <SlugField name="category-slug" slug={slug} setSlug={setSlug} slugError={slugError} />
                        </SimpleCard>
                    </div>

                    <Button type="submit" color="success" variant="contained" className={css["button"]}>
                        Save
                    </Button>
                </form>
            </Container>
        </PageWrap>
    );
};

export default memo(CategoryCreate);
