import { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
//
import AuthSelectors from "../../../redux/auth/selector";
import { authActions } from "../../../redux/auth/slice";
import { LoginState } from "../../../redux/auth/types";
import prefixRoute from "../../../lib/prefixRoute";
//
import css from "./Menu.module.scss";
import ArticleIcon from "@mui/icons-material/Article";

const menuConfig: {
    items: { text: string; link: string; icon: ReactElement }[];
} = {
    items: [
        {
            text: "Dashboard",
            link: prefixRoute("/"),
            icon: <DashboardIcon />
        },
        {
            text: "Categories",
            link: prefixRoute("/categories"),
            icon: <CategoryIcon />
        },
        {
            text: "Posts",
            link: prefixRoute("/posts"),
            icon: <ArticleIcon />
        }
    ]
};

type Props = {};

const Menu: FC<Props> = () => {
    const dispatch = useDispatch();

    const location = useLocation();

    const drawerWidth = 240;

    const user = useSelector(AuthSelectors.getUser);
    const loginState = useSelector(AuthSelectors.getLoginState);

    return (
        <div className={css["Menu"]}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                {location.pathname !== prefixRoute("/login") && (
                    <>
                        {loginState === LoginState.LOGGED_IN ? (
                            <>
                                <Avatar className={css["avatar"]} />

                                <Typography className={css["username"]}>{user?.username}</Typography>

                                <Button
                                    onClick={() => dispatch(authActions.logout())}
                                    color="error"
                                    variant="contained"
                                    className={css["logout-btn"]}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <div className={css["loader"]}>
                                <CircularProgress color="success" />
                            </div>
                        )}

                        <Divider />

                        <List>
                            {menuConfig.items.map(({ text, link, icon }) => (
                                <Link to={link} key={text}>
                                    <ListItem button key={text}>
                                        {icon}
                                        <ListItemText primary={text} style={{ marginLeft: 10 }} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </>
                )}
            </Drawer>
        </div>
    );
};

export default memo(Menu);
