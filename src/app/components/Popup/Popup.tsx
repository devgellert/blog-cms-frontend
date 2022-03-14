import React from "react";
import { FC, memo } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { isFunction } from "lodash";
//
// import css from "./Popup.module.scss";

type Props = {
    title: string;
    body?: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onNoClick?: () => void;
    onYesClick: () => void;
};

const Popup: FC<Props> = ({ isOpen, onNoClick, onYesClick, setIsOpen, body, title }) => {
    const close = () => {
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            {!!body && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button
                    onClick={() => {
                        if (isFunction(onNoClick)) {
                            onNoClick();
                        }
                        close();
                    }}
                >
                    No
                </Button>
                <Button
                    onClick={() => {
                        onYesClick();
                        close();
                    }}
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default memo(Popup);
