import React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { isFunction } from "lodash";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;

type Props = {
    actions: { text: string; onClick?: () => void; link?: string }[];
};

const ActionsMenu: FC<Props> = ({ actions }) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isOpen = !!anchorEl;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={isOpen ? "long-menu" : undefined}
                aria-expanded={isOpen ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button"
                }}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch"
                    }
                }}
            >
                {actions.map(action => (
                    <MenuItem
                        key={action.text}
                        onClick={() => {
                            if (isFunction(action.onClick)) {
                                action.onClick();
                            }

                            if (typeof action.link === "string") {
                                navigate(action.link);
                            }

                            handleClose();
                        }}
                    >
                        {action.text}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ActionsMenu;
