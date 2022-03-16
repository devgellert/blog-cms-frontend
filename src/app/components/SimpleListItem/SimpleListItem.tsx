import React from "react";
import { FC, memo } from "react";
import { ListItem, ListItemText } from "@mui/material";

type Props = {
    title: string;
    text: string;
};

const SimpleListItem: FC<Props> = ({ text, title }) => {
    return (
        <ListItem>
            <ListItemText primary={title} secondary={text} />
        </ListItem>
    );
};

export default memo(SimpleListItem);
