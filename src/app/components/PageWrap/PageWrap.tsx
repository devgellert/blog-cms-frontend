import { FC, memo, ReactElement } from "react";
import { AppBar, Button, CircularProgress, Toolbar, Typography } from "@mui/material";
import cn from "classnames";
//
import css from "./PageWrap.module.scss";

type Props = {
    title: string;
    children: ReactElement;
    buttons: {
        text: string;
        onClick: () => void;
        color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
        variant?: "text" | "outlined" | "contained";
    }[];
    isLoading?: boolean;
    hasTopPadding?: boolean;
};

const PageWrap: FC<Props> = ({ children, title, buttons, isLoading = false, hasTopPadding }) => {
    return (
        <div className={css["PageWrap"]}>
            <AppBar position="relative" className={cn(css["app-bar"], { [css["has-margin-bottom"]]: hasTopPadding })}>
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

            {!!isLoading && (
                <div className={css["loader-wrap"]}>
                    <CircularProgress color="success" />
                </div>
            )}

            {!isLoading && children}
        </div>
    );
};

export default memo(PageWrap);
