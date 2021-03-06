import React, { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, List, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
import TabPanel from "../../../components/TabPanel/TabPanel";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import SimpleListItem from "../../../components/SimpleListItem/SimpleListItem";
import TwoColumnGrid from "../../../components/TwoColumnGrid/TwoColumnGrid";
import useTranslationTabs from "../../../../lib/hooks/useTranslationTabs";
import createCategoryPageButtonConfig from "../../../../lib/category/createCategoryPageButtonConfig";
import formatDateString from "../../../../lib/formatDateString";
//
import css from "./Category.module.scss";
import prefixRoute from "../../../../lib/prefixRoute";
import formatId from "../../../../lib/formatId";

const Category: FC = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const translations = useSelector(CategorySelectors.getTranslations);
    const isPageLoading = useSelector(CategorySelectors.isCategoryDetailsLoading);
    const category = useSelector(CategorySelectors.getCategory);

    const { tabIndex, tabsElement } = useTranslationTabs(
        translations ? translations.map(translations => translations.locale) : []
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(categoryActions.initializeCategoryDetailsPage({ id: Number(categoryId) }));

        return () => {
            dispatch(categoryActions.unmountCategoryDetailsPage());
        };
    }, []);

    const createRemoveTranslation = (locale: string) => () =>
        dispatch(
            categoryActions.removeCategoryTranslation({
                categoryId: Number(categoryId),
                locale: locale
            })
        );

    return (
        <PageWrap
            title={`Category ${category ? formatId(Number(category.id), "C") : ""}`}
            buttons={createCategoryPageButtonConfig(navigate, Number(categoryId))}
            isLoading={isPageLoading}
            hasTopPadding
        >
            <Container maxWidth="lg" className={css["Category"]}>
                <TwoColumnGrid>
                    <SimpleCard>
                        <Typography variant="h6">General</Typography>

                        <TwoColumnGrid>
                            <List>
                                <SimpleListItem title="Name" text={category?.name ?? "n/a"} />

                                <SimpleListItem title="Parent" text={category?.parent ? category.parent.name : "-"} />

                                <SimpleListItem title="Enabled" text={category?.enabled ? "Enabled" : "Not Enabled"} />
                            </List>

                            <List>
                                <SimpleListItem
                                    title="Created At"
                                    text={category ? formatDateString(category.createdAt) : "n/a"}
                                />

                                <SimpleListItem
                                    title="Last Updated At"
                                    text={category ? formatDateString(category.updatedAt) : "n/a"}
                                />
                            </List>
                        </TwoColumnGrid>
                    </SimpleCard>

                    <SimpleCard>
                        <Typography variant="h6">SEO</Typography>

                        <List>
                            <SimpleListItem title="Slug" text={category?.slug ?? "n/a"} />
                        </List>
                    </SimpleCard>
                </TwoColumnGrid>

                <SimpleCard className={css["translation-card"]}>
                    <header className={css["card-header"]}>
                        <Typography variant="h6">Translations</Typography>

                        <Button
                            onClick={() => {
                                navigate(prefixRoute(`/categories/${categoryId}/translations/create`));
                            }}
                            variant="outlined"
                            color="success"
                        >
                            New Translation
                        </Button>
                    </header>

                    {!!translations?.length && (
                        <>
                            {tabsElement}

                            {translations?.map((elem, index) => (
                                <TabPanel key={elem.id} value={tabIndex} index={index}>
                                    <TwoColumnGrid>
                                        <List>
                                            <SimpleListItem title="Name" text={elem.name} />
                                        </List>

                                        <List>
                                            <SimpleListItem
                                                title="Enabled"
                                                text={elem.enabled ? "Enabled" : "Not Enabled"}
                                            />
                                        </List>
                                    </TwoColumnGrid>

                                    <Button
                                        onClick={() => {
                                            navigate(
                                                prefixRoute(
                                                    `/categories/${categoryId}/translations/${elem.locale}/edit`
                                                )
                                            );
                                        }}
                                        variant="outlined"
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        onClick={createRemoveTranslation(elem.locale)}
                                        variant="outlined"
                                        color={"error"}
                                        className={css["btn-remove"]}
                                    >
                                        Remove
                                    </Button>
                                </TabPanel>
                            ))}
                        </>
                    )}

                    {!translations?.length && <Typography variant="body1">-</Typography>}
                </SimpleCard>
            </Container>
        </PageWrap>
    );
};

export default memo(Category);
