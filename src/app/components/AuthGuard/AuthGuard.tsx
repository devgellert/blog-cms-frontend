import React, { FC, memo, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
//
import AuthSelectors from "../../../redux/auth/selector";
import { LoginState } from "../../../redux/auth/types";
//
import css from "./AuthGuard.module.scss";

type Props = {
    element: ReactElement;
};

const AuthGuard: FC<Props> = ({ element }) => {
    const navigate = useNavigate();

    const loginState = useSelector(AuthSelectors.getLoginState);

    useEffect(() => {
        if (loginState === LoginState.LOGGED_OUT) {
            navigate("/login");
        }
    }, [loginState]);

    if ([LoginState.REFRESHING, LoginState.IN_PROGRESS].includes(loginState)) {
        return (
            <div className={css["AuthGuard"]}>
                <CircularProgress color="success" />
            </div>
        );
    }

    return element;
};

export default memo(AuthGuard);
