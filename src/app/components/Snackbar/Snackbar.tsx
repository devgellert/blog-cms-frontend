import React from "react";
import { FC, memo } from "react";
import { Alert, Snackbar as MaterialSnackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//
import { uiActions } from "../../../redux/ui/slice";
import UISelectors from "../../../redux/ui/selector";

type Props = {};

const Snackbar: FC<Props> = () => {
    const dispatch = useDispatch();

    const snackbarConfig = useSelector(UISelectors.getSnackbarConfig);

    const closeSnackbar = () => dispatch(uiActions.hideSnackbar());

    return (
        <MaterialSnackbar
            open={snackbarConfig.isOpen}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={closeSnackbar}
        >
            <Alert onClose={closeSnackbar} severity={snackbarConfig.type} sx={{ width: "100%" }}>
                {snackbarConfig.text}
            </Alert>
        </MaterialSnackbar>
    );
};

export default memo(Snackbar);
