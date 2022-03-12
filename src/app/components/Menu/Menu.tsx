import { FC, memo } from "react";
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
//
import AuthSelectors from "../../../redux/auth/selector";
//
import css from "./Menu.module.scss";
import { authActions } from "../../../redux/auth/slice";
import { LoginState } from "../../../redux/auth/types";

const menuConfig: {
    items: { text: string; link: string }[];
} = {
    items: [
        {
            text: "Dashboard",
            link: "/"
        },
        {
            text: "Categories",
            link: "/categories"
        }
    ]
};

type Props = {};

const Menu: FC<Props> = ({}) => {
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
                {location.pathname !== "/login" && (
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
                            {menuConfig.items.map(({ text, link }) => (
                                <Link to={link}>
                                    <ListItem button key={text}>
                                        <ListItemText primary={text} />
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
