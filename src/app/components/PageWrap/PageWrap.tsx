import { FC, memo, ReactElement } from "react";
//
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

type Props = {
    title: string;
    children: ReactElement;
    buttons: {
        text: string;
        onClick: () => void;
        color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
        variant?: "text" | "outlined" | "contained";
    }[];
};

const PageWrap: FC<Props> = ({ children, title, buttons }) => {
    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                    {buttons.map(({ text, onClick, color = "inherit", variant = "contained" }) => {
                        return (
                            <Button color={color} onClick={onClick} variant={variant}>
                                {text}
                            </Button>
                        );
                    })}
                </Toolbar>
            </AppBar>

            {children}
        </div>
    );
};

export default memo(PageWrap);
