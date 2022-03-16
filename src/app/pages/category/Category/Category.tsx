import React, { FC, memo, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
//
import PageWrap from "../../../components/PageWrap/PageWrap";
import { categoryActions } from "../../../../redux/category/slice";
import CategorySelectors from "../../../../redux/category/selector";
//
import css from "./Category.module.scss";

const Category: FC = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isCategoryDetailsLoading = useSelector(CategorySelectors.isCategoryDetailsLoading);
    const translations = useSelector(CategorySelectors.getTranslations);
    const category = useSelector(CategorySelectors.getCategory);

    useEffect(() => {
        dispatch(categoryActions.initializeCategoryDetailsPage({ id: Number(categoryId) }));
    }, []);

    useEffect(() => {
        setTab(0);
    }, [translations?.length]);

    const [tab, setTab] = useState(0);

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <PageWrap
            title={`Category #${categoryId}`}
            buttons={[
                {
                    text: "Create Translation",
                    color: "success",
                    variant: "contained",
                    onClick: () => {
                        navigate(`/categories/${categoryId}/translations/create`);
                    }
                },
                {
                    text: "Edit Category",
                    color: "primary",
                    variant: "contained",
                    onClick: () => {
                        navigate(`/categories/${categoryId}/edit`);
                    }
                }
            ]}
            isLoading={isCategoryDetailsLoading}
            hasTopPadding
        >
            <Container maxWidth="lg" className={css["Category"]}>
                <div className={css["data-wrap"]}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">General</Typography>

                            <List dense={false}>
                                <ListItem>
                                    <ListItemText primary={"Name"} secondary={category?.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={"Parent"}
                                        secondary={category?.parent ? `#${category?.parent}` : "-"}
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6">SEO</Typography>

                            <List dense={false}>
                                <ListItem>
                                    <ListItemText primary={"Slug"} secondary={category?.slug} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </div>

                <Card className={css["translation-card"]}>
                    <CardContent>
                        <header className={css["card-header"]}>
                            <Typography variant="h6">Translations</Typography>

                            <Button
                                onClick={() => {
                                    navigate(`/categories/${categoryId}/translations/create`);
                                }}
                                variant="outlined"
                                color="success"
                            >
                                Create Translation
                            </Button>
                        </header>

                        {!!translations?.length && (
                            <>
                                <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                                    {translations?.map(elem => (
                                        <Tab label={elem.locale} />
                                    ))}
                                </Tabs>

                                {translations?.map((elem, index) => (
                                    <TabPanel value={tab} index={index} key={index}>
                                        <List dense={false}>
                                            <ListItem>
                                                <ListItemText primary={"Name"} secondary={elem.name} />
                                            </ListItem>
                                        </List>

                                        <Button
                                            onClick={() => {
                                                navigate(`/categories/${categoryId}/translations/${elem.locale}/edit`);
                                            }}
                                            variant="outlined"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    categoryActions.removeCategoryTranslation({
                                                        categoryId: Number(categoryId),
                                                        locale: elem.locale
                                                    })
                                                )
                                            }
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
                    </CardContent>
                </Card>
            </Container>
        </PageWrap>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default memo(Category);
