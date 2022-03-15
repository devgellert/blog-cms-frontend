import React, { useEffect, useState } from "react";
import { FC, memo } from "react";
import { useParams } from "react-router-dom";
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
import css from "./CategoryLocaleEdit.module.scss";

type Props = {};

const CategoryLocaleEdit: FC<Props> = ({}) => {
    const { locale, categoryId } = useParams();

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data }: AxiosResponse<ApiCategoryTranslation> = await api.get(
                    `/categories/${categoryId}/translations/${locale}`
                );
                setName(data.name);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const onSave = async () => {
        try {
            setIsLoading(true);
            setNameError("");

            const { data }: AxiosResponse<ApiCategoryTranslation> = await api.put(
                `/categories/${categoryId}/translations/${locale}`,
                {
                    // locale,
                    // category: categoryId,
                    name
                }
            );
            setName(data.name);
        } catch (e) {
            const nameError = getAxiosFieldError(e, "name");
            setNameError(nameError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrap
            title={`#${categoryId} Category Locale (${locale}) Edit`}
            buttons={[]}
            isLoading={isLoading}
            hasTopPadding
        >
            <Container maxWidth="lg" className={css["CategoryLocaleEdit"]}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" className={css["title"]}>
                            Locale - {locale}
                        </Typography>

                        <div className={css["input-wrap"]}>
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

export default memo(CategoryLocaleEdit);
