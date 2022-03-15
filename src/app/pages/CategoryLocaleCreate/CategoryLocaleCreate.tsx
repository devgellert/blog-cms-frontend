import React, { useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Button, Card, CardContent, Container, Typography } from "@mui/material";
//
import PageWrap from "../../components/PageWrap/PageWrap";
import useInput from "../../../lib/hooks/useInput";
import Input from "../../components/Input/Input";
import { ApiCategoryTranslation } from "../../../types/api";
import api from "../../../api";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
//
import css from "./CategoryLocaleCreate.module.scss";

type Props = {};

const CategoryLocaleCreate: FC<Props> = ({}) => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});
    const { value: locale, setValue: setLocale, errorText: localeError, setError: setLocaleError } = useInput({});

    const [isLoading, setIsLoading] = useState(false);

    const onSave = async () => {
        try {
            setIsLoading(true);
            setNameError("");
            setLocaleError("");

            const { data }: AxiosResponse<ApiCategoryTranslation> = await api.post(
                `/categories/${categoryId}/translations`,
                {
                    locale,
                    name
                }
            );
            setName(data.name);
            navigate(`/categories/${categoryId}`);
        } catch (e) {
            const nameError = getAxiosFieldError(e, "name");
            setNameError(nameError);

            const localeError = getAxiosFieldError(e, "locale");
            setLocaleError(localeError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrap title={`#${categoryId} Category Locale Create`} buttons={[]} isLoading={isLoading} hasTopPadding>
            <Container maxWidth="lg" className={css["CategoryLocaleCreate"]}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" className={css["title"]}>
                            Locale - New
                        </Typography>

                        <div className={css["input-wrap"]}>
                            <Input value={locale} setValue={setLocale} label="Locale" errorText={localeError} />
                            <Input value={name} setValue={setName} label="Name" errorText={nameError} />
                        </div>
                    </CardContent>
                </Card>

                <Button onClick={onSave} color="success" variant="contained" className={css["button"]}>
                    Save
                </Button>
            </Container>
        </PageWrap>
    );
};

export default memo(CategoryLocaleCreate);
