import React, { FC, memo, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//
import AuthSelectors from "../../../redux/auth/selector";

type Props = {
    element: ReactElement;
};

const AuthGuard: FC<Props> = ({ element }) => {
    const navigate = useNavigate();

    const isLoginInProgress = useSelector(AuthSelectors.isLoginInProgress);
    const user = useSelector(AuthSelectors.getUser);

    useEffect(() => {
        if (isLoginInProgress === false && !user) {
            navigate("/login");
        }
    }, [isLoginInProgress]);

    if (isLoginInProgress) {
        return <div>Loading...</div>;
    }

    return element;
};

export default memo(AuthGuard);
