import React, { FormEventHandler, useEffect, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { Button, Container, Typography } from "@mui/material";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import useInput from "../../../../lib/hooks/useInput";
import Input from "../../../components/Input/Input";
import { ApiCategoryTranslation } from "../../../../types/api";
import api from "../../../../api";
import getAxiosFieldError from "../../../../lib/getAxiosFieldError";
import { uiActions } from "../../../../redux/ui/slice";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
//
import css from "./CategoryTranslationEdit.module.scss";

type Props = {};

const CategoryTranslationEdit: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const { locale, categoryId } = useParams();
    const navigate = useNavigate();

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});

    const isPageLoading = useSelector(CategorySelectors.isCategoryTranslationEditPageLoading);

    useEffect(() => {
        dispatch(
            categoryActions.initTranslationEditPageRequest({
                categoryId: Number(categoryId),
                locale: locale as string,
                cb: {
                    setName
                }
            })
        );

        return () => {
            dispatch(categoryActions.unmountTranslationEditPage());
        };
    }, []);

    const onSave: FormEventHandler = async e => {
        try {
            e.preventDefault();

            setNameError("");

            const { data }: AxiosResponse<ApiCategoryTranslation> = await api.put(
                `/categories/${categoryId}/translations/${locale}`,
                {
                    name
                }
            );
            setName(data.name);
            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully updated locale." }));
            navigate(`/categories/${categoryId}`);
        } catch (e) {
            const nameError = getAxiosFieldError(e, "name");
            setNameError(nameError);
            dispatch(uiActions.displaySnackbar({ type: "error", text: "Failed to update locale." }));
        }
    };

    return (
        <PageWrap
            title={`#${categoryId} Category Locale (${locale}) Edit`}
            buttons={[]}
            isLoading={isPageLoading}
            hasTopPadding
        >
            <Container maxWidth="lg" className={css["CategoryTranslationEdit"]}>
                <form onSubmit={onSave}>
                    <SimpleCard>
                        <Typography variant="h6" className={css["title"]}>
                            Locale - {locale}
                        </Typography>

                        <div className={css["input-wrap"]}>
                            <Input
                                name="category-translation-name"
                                value={name}
                                setValue={setName}
                                label="Name"
                                errorText={nameError}
                            />
                        </div>
                    </SimpleCard>

                    <Button type="submit" color="success" variant="contained" className={css["button"]}>
                        Save
                    </Button>
                </form>
            </Container>
        </PageWrap>
    );
};

export default memo(CategoryTranslationEdit);
