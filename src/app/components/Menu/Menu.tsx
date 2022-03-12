import { FC, memo } from "react";
//
import css from "./style.module.scss";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

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
    const drawerWidth = 240;

    return (
        <div>
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
                <Toolbar />
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
            </Drawer>
        </div>
    );
};

export default memo(Menu);
