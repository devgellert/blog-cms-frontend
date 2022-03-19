import React from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import useInput from "../../../../lib/hooks/useInput";
import Input from "../../../components/Input/Input";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
//
import css from "./CategoryTranslationCreate.module.scss";

type Props = {};

const CategoryTranslationCreate: FC<Props> = ({}) => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});
    const { value: locale, setValue: setLocale, errorText: localeError, setError: setLocaleError } = useInput({});

    const isPageLoading = useSelector(CategorySelectors.isCategoryTranslationCreatePageLoading);

    const createTranslation = () => {
        dispatch(
            categoryActions.createTranslationRequest({
                categoryId: Number(categoryId),
                locale,
                name,
                cb: {
                    navigate,
                    setNameError,
                    setLocaleError
                }
            })
        );
    };

    return (
        <PageWrap title={`#${categoryId} Category Locale Create`} buttons={[]} isLoading={isPageLoading} hasTopPadding>
            <Container maxWidth="lg" className={css["CategoryTranslationCreate"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        createTranslation();
                    }}
                >
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
                        onClick={createTranslation}
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
