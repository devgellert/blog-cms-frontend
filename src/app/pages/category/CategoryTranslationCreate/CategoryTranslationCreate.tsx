import React, { FormEventHandler, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import useInput from "../../../../lib/hooks/useInput";
import Input from "../../../components/Input/Input";
import api from "../../../../api";
import getAxiosFieldError from "../../../../lib/getAxiosFieldError";
import { uiActions } from "../../../../redux/ui/slice";
import getAxiosError from "../../../../lib/getAxiosError";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
//
import css from "./CategoryTranslationCreate.module.scss";

type Props = {};

const CategoryTranslationCreate: FC<Props> = ({}) => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});
    const { value: locale, setValue: setLocale, errorText: localeError, setError: setLocaleError } = useInput({});

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: FormEventHandler = async e => {
        try {
            e.preventDefault();

            setIsLoading(true);
            setNameError("");
            setLocaleError("");

            await api.post(`/categories/${categoryId}/translations`, {
                locale,
                name
            });
            dispatch(uiActions.displaySnackbar({ type: "success", text: "Successfully created translation." }));
            navigate(`/categories/${categoryId}`);
        } catch (e) {
            const nameError = getAxiosFieldError(e, "name");
            setNameError(nameError);

            const localeError = getAxiosFieldError(e, "locale");
            setLocaleError(localeError);

            const error = getAxiosError(e);
            if (error.includes("already exists")) {
                setLocaleError(`Locale already exists for this category.`);
            }

            dispatch(
                uiActions.displaySnackbar({
                    type: "error",
                    text: "Failed to create translation."
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrap title={`#${categoryId} Category Locale Create`} buttons={[]} isLoading={isLoading} hasTopPadding>
            <Container maxWidth="lg" className={css["CategoryTranslationCreate"]}>
                <form onSubmit={onSubmit}>
                    <SimpleCard>
                        <Typography variant="h6" className={css["title"]}>
                            Locale
                        </Typography>

                        <TwoColumnGrid>
                            <Input
                                name="category-translation-locale"
                                value={locale}
                                setValue={setLocale}
                                label="Locale"
                                errorText={localeError}
                            />

                            <Input
                                name="category-translation-name"
                                value={name}
                                setValue={setName}
                                label="Name"
                                errorText={nameError}
                            />
                        </TwoColumnGrid>
                    </SimpleCard>

                    <Button
                        type="submit"
                        onClick={onSubmit}
                        color="success"
                        variant="contained"
                        className={css["button"]}
                    >
                        Save
                    </Button>
                </form>
            </Container>
        </PageWrap>
    );
};

export default memo(CategoryTranslationCreate);
