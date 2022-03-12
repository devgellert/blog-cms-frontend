import React, { useState } from "react";
import { FC, memo } from "react";
import { Button, Container, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../redux/auth/slice";
//
import css from "./LoginPage.module.scss";

type Props = {};

const LoginPage: FC<Props> = ({}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={css["LoginPage"]}>
            <Container maxWidth="sm">
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
                <Button
                    onClick={() => dispatch(authActions.login({ username, password }))}
                    className={css["field"]}
                    type="button"
                >
                    Log in
                </Button>
            </Container>
        </div>
    );
};

export default memo(LoginPage);
