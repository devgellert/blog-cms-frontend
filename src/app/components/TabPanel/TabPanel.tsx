import React from "react";
import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";

type Props = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

const TabPanel: FC<Props> = ({ children, value, index, ...other }) => {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export default memo(TabPanel);
