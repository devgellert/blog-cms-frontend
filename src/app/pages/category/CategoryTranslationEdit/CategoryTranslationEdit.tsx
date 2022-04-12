import React, { useEffect, useState } from "react";
import { FC, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import useInput from "../../../../lib/hooks/useInput";
import Input from "../../../components/Input/Input";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
//
import css from "./CategoryTranslationEdit.module.scss";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import formatId from "../../../../lib/formatId";

type Props = {};

const CategoryTranslationEdit: FC<Props> = () => {
    const dispatch = useDispatch();
    const { locale, categoryId } = useParams();
    const navigate = useNavigate();

    const { value: name, setValue: setName, errorText: nameError, setError: setNameError } = useInput({});
    const [enabled, setEnabled] = useState(false);

    const isPageLoading = useSelector(CategorySelectors.isCategoryTranslationEditPageLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(
            categoryActions.initTranslationEditPageRequest({
                categoryId: Number(categoryId),
                locale: locale as string,
                cb: {
                    setName,
                    setEnabled
                }
            })
        );

        return () => {
            dispatch(categoryActions.unmountTranslationEditPage());
        };
    }, []);

    const editTranslation = () => {
        dispatch(
            categoryActions.editTranslationRequest({
                locale: locale as string,
                categoryId: Number(categoryId),
                name,
                enabled,
                cb: {
                    navigate,
                    setNameError
                }
            })
        );
    };

    return (
        <PageWrap
            title={`Edit Translation: Category ${formatId(Number(categoryId), "C")}`}
            buttons={[]}
            isLoading={isPageLoading}
            hasTopPadding
        >
            <Container maxWidth="lg" className={css["CategoryTranslationEdit"]}>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        editTranslation();
                    }}
                >
                    <SimpleCard>
                        <Typography variant="h6" className={css["title"]}>
                            Locale - {locale}
                        </Typography>

                        <TwoColumnGrid>
                            <Input
                                name="category-translation-name"
                                value={name}
                                setValue={setName}
                                label="Name"
                                errorText={nameError}
                            />

                            <div />

                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={e => {
                                            setEnabled((e.target as any)?.checked);
                                        }}
                                        checked={enabled}
                                    />
                                }
                                label="Enabled"
                            />
                        </TwoColumnGrid>
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
