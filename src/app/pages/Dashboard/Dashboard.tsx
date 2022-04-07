import { FC, memo, useEffect } from "react";
import { Container, ListItemButton, ListItemText, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
//
import PageWrap from "../../components/PageWrap/PageWrap";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import DashboardSelectors from "../../../redux/dashboard/selector";
import { dashboardActions } from "../../../redux/dashboard/slice";
import TwoColumnGrid from "../../components/TwoColumnGrid/TwoColumnGrid";
import { ApiStatisticsErrorEnum } from "../../../types/api";
//
import css from "./Dashboard.module.scss";
import prefixRoute from "../../../lib/prefixRoute";
import formatId from "../../../lib/formatId";

type Props = {};

const Dashboard: FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const numbers = useSelector(DashboardSelectors.getNumbers);
    const isLoading = useSelector(DashboardSelectors.isLoading);
    const errors = useSelector(DashboardSelectors.getErrors);

    useEffect(() => {
        dispatch(dashboardActions.initDashboardRequest());
    }, []);

    return (
        <PageWrap title="Dashboard" buttons={[]} hasTopPadding isLoading={isLoading}>
            <Container maxWidth="lg" className={css["Dashboard"]}>
                <div className={css["grid"]}>
                    <div>
                        <TwoColumnGrid className={css["numbers-wrap"]}>
                            <SimpleCard className={css["number-card"]}>
                                <header className={css["card-header"]}>
                                    <h2>Posts</h2>
                                    <ArticleIcon />
                                </header>
                                <div className={css["number"]}>{numbers.post}</div>
                            </SimpleCard>
                            <SimpleCard className={css["number-card"]}>
                                <header className={css["card-header"]}>
                                    <h2>Categories</h2>
                                    <CategoryIcon />
                                </header>

                                <div className={css["number"]}>{numbers.category}</div>
                            </SimpleCard>

                            <SimpleCard className={css["number-card"]}>
                                <header className={css["card-header"]}>
                                    <h2>Post Translations</h2>
                                    <ArticleIcon color="primary" />
                                </header>
                                <div className={css["number"]}>{numbers.postTranslation}</div>
                            </SimpleCard>
                            <SimpleCard className={css["number-card"]}>
                                <header className={css["card-header"]}>
                                    <h2>Category Translations</h2>
                                    <CategoryIcon color="primary" />
                                </header>

                                <div className={css["number"]}>{numbers.categoryTranslation}</div>
                            </SimpleCard>
                        </TwoColumnGrid>
                    </div>
                    <SimpleCard className={css["todo-wrap"]}>
                        <header className={css["card-header"]}>
                            <h2>Todos</h2>
                            <FormatListBulletedIcon />
                        </header>

                        {!errors?.length && (
                            <Typography variant="body1" title="asd">
                                Your todo list is empty.
                            </Typography>
                        )}

                        {!!errors?.length && (
                            <div className={css["todos-body"]}>
                                <List>
                                    {errors.map(error => {
                                        if (error.type === ApiStatisticsErrorEnum.CATEGORY_TRANSLATION_MISSING) {
                                            return (
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(
                                                            prefixRoute(
                                                                `/categories/${error.meta.category}/translations/create?locale=${error.meta.locale}`
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <ErrorOutlineIcon className={css["error-icon"]} color="warning" />
                                                    <ListItemText
                                                        secondary="Click here to create translation."
                                                        primary={`Locale ${
                                                            error.meta.locale
                                                        } exists for post ${formatId(error.meta.post, "P")}, but
                                            absent for category ${formatId(error.meta.category, "C")}.`}
                                                    />
                                                </ListItemButton>
                                            );
                                        }

                                        if (error.type === ApiStatisticsErrorEnum.CATEGORY_TRANSLATION_NOT_ENABLED) {
                                            return (
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(
                                                            prefixRoute(
                                                                `/categories/${error.meta.category}/translations/${error.meta.locale}/edit`
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <ErrorOutlineIcon className={css["error-icon"]} color="warning" />
                                                    <ListItemText
                                                        secondary={`Click here to edit category translation (${error.meta.locale}).`}
                                                        primary={`Locale ${
                                                            error.meta.locale
                                                        } is enabled for post ${formatId(error.meta.post, "P")}, but
                                            disabled for category ${formatId(error.meta.category, "C")}.`}
                                                    />
                                                </ListItemButton>
                                            );
                                        }

                                        return (
                                            <ListItemButton>
                                                <ListItemText primary="Trash" />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </div>
                        )}
                    </SimpleCard>
                </div>
            </Container>
        </PageWrap>
    );
};

export default memo(Dashboard);
