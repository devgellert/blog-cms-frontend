import { FC, memo, useEffect } from "react";
import { Container } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import { useDispatch, useSelector } from "react-redux";
//
import PageWrap from "../../components/PageWrap/PageWrap";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import DashboardSelectors from "../../../redux/dashboard/selector";
import { dashboardActions } from "../../../redux/dashboard/slice";
import TwoColumnGrid from "../../components/TwoColumnGrid/TwoColumnGrid";
//
import css from "../post/Post/Post.module.scss";

type Props = {};

const Dashboard: FC<Props> = ({}) => {
    const dispatch = useDispatch();

    const numbers = useSelector(DashboardSelectors.getNumbers);
    const isLoading = useSelector(DashboardSelectors.isLoading);

    useEffect(() => {
        dispatch(dashboardActions.initDashboardRequest());
    }, []);

    return (
        <PageWrap title="Dashboard" buttons={[]} hasTopPadding isLoading={isLoading}>
            <Container maxWidth="lg" className={css["Dashboard"]}>
                <TwoColumnGrid>
                    <SimpleCard>
                        <header className={css["card-header"]}>
                            <h2>Posts</h2>
                            <ArticleIcon />
                        </header>
                        <div className={css["number"]}>{numbers.post}</div>
                    </SimpleCard>
                    <SimpleCard>
                        <header className={css["card-header"]}>
                            <h2>Categories</h2>
                            <CategoryIcon />
                        </header>

                        <div className={css["number"]}>{numbers.category}</div>
                    </SimpleCard>

                    <SimpleCard>
                        <header className={css["card-header"]}>
                            <h2>Post Translations</h2>
                            <ArticleIcon color="primary" />
                        </header>
                        <div className={css["number"]}>{numbers.postTranslation}</div>
                    </SimpleCard>
                    <SimpleCard>
                        <header className={css["card-header"]}>
                            <h2>Category Translations</h2>
                            <CategoryIcon color="primary" />
                        </header>

                        <div className={css["number"]}>{numbers.categoryTranslation}</div>
                    </SimpleCard>
                </TwoColumnGrid>
            </Container>
        </PageWrap>
    );
};

export default memo(Dashboard);
