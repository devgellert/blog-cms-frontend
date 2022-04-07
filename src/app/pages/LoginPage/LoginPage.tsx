import React, { FC, memo, useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//
import { authActions } from "../../../redux/auth/slice";
import AuthSelectors from "../../../redux/auth/selector";
import { LoginState } from "../../../redux/auth/types";
import prefixRoute from "../../../lib/prefixRoute";
//
import css from "./LoginPage.module.scss";

type Props = {};

const LoginPage: FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginState = useSelector(AuthSelectors.getLoginState);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (loginState === LoginState.LOGGED_IN) {
            navigate(prefixRoute("/"));
        }
    }, [loginState]);

    if (loginState === LoginState.IN_PROGRESS) {
        return (
            <div className={css["LoginPage"]}>
                <CircularProgress color="success" />
            </div>
        );
    }

    return (
        <div className={css["LoginPage"]}>
            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault();

                        dispatch(authActions.login({ username, password }));
                    }}
                >
                    <TextField
                        label="Username"
                        variant="filled"
                        className={css["field"]}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <br />

                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        className={css["field"]}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <br />

                    <Button className={css["field"]} type="submit">
                        Log in
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default memo(LoginPage);
