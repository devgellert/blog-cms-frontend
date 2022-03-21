import React, { memo } from "react";
import { FC } from "react";
import { useState } from "react";
import { isFunction } from "lodash";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//
import css from "./ActionsMenu.module.scss";
import prefixRoute from "../../../../../lib/prefixRoute";

type Props = {
    actions: {
        text: string;
        onClick?: () => void;
        link?: string;
    }[];
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
        <div className={css["ActionsMenu"]}>
            <IconButton onClick={handleClick} className={css["icon"]}>
                <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
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

export default memo(ActionsMenu);
