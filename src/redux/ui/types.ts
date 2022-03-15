import { AlertColor } from "@mui/material/Alert/Alert";

export type UIState = {
    snackbarConfig: SnackbarConfig;
};

export type SnackbarConfig = {
    type: AlertColor;
    text: string;
    isOpen: boolean;
};
