import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Divider, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
//
import AuthSelectors from "../../../redux/auth/selector";
//
import css from "./Menu.module.scss";
import { authActions } from "../../../redux/auth/slice";

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
