import React, { useEffect, useState } from "react";
import { FC, memo } from "react";
import { map, unset } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Container } from "@mui/material";
import { AxiosResponse } from "axios";
//
import PageWrap from "../../components/PageWrap/PageWrap";
import Input from "../../components/Input/Input";
import { categoryActions } from "../../../redux/category/slice";
import CategorySelectors from "../../../redux/category/selector";
import SelectField from "../../components/inputs/SelectField/SelectField";
import useInput from "../../../lib/hooks/useInput";
import { ApiCategory } from "../../../types/api";
import api from "../../../api";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
import getAxiosError from "../../../lib/getAxiosError";
import isSlugError from "../../../lib/isSlugError";
//
import css from "./CategoryCreate.module.scss";

type Props = {};

const CategoryCreate: FC<Props> = ({}) => {
    const dispatch = useDispatch();

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
    const [successId, setSuccessId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(categoryActions.initializeCategoryCreatePage());
    }, []);

    const onSave = async () => {
        try {
            dispatch(categoryActions.setIsCategoryCreatePageLoading(true));

            setNameError("");
            setParentError("");
            setSlugError("");

            const normalizedParent = parent == "0" ? null : Number(parent);

            const body = {
                name: name,
                slug: slug,
                parent: normalizedParent
            };

            if (body.parent === null) {
                unset(body, "parent");
            }

            const response: AxiosResponse<ApiCategory> = await api.post("/categories", body);

            setSuccessId(response.data.id);
            setSlug("");
            setName("");
            setParent("0");
            dispatch(categoryActions.initializeCategoryCreatePage());
        } catch (e) {
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

    const parentChoices = map([{ id: 0, name: "-" }, ...(parentCategories || [])], elem => ({
        value: elem.id,
        text: elem.name
    }));

    return (
        <PageWrap title="New Category" buttons={[]} isLoading={isCategoryCreatePageLoading}>
            <Container maxWidth="lg" className={css["CategoryCreate"]}>
                {!!successId && (
                    <Alert severity="success" className={css["alert"]}>
                        Category successfully created with id #{successId}
                    </Alert>
                )}

                <div className={css["input-grid"]}>
                    <Input value={name} setValue={setName} label="Name" errorText={nameError} />

                    <Input value={slug} setValue={setSlug} label="Slug" errorText={slugError} />

                    <SelectField
                        labelId="parent-label"
                        label="Parent"
                        errorText={parentError}
                        value={parent}
                        onChange={e => setParent(e.target.value)}
                        choices={parentChoices}
                    />
                </div>

                <Button onClick={onSave} color="success" variant="contained" className={css["button"]}>
                    Save
                </Button>
            </Container>
        </PageWrap>
    );
};

export default memo(CategoryCreate);
