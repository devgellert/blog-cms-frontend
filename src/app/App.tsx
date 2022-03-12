import React, { useEffect } from "react";
import { FC, memo } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//
import store from "../redux/store";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Categories/Categories";
import Category from "./pages/Category/Category";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import { authActions } from "../redux/auth/slice";

type Props = {};

const App: FC<Props> = ({}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.refreshJwt());
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthGuard element={<Dashboard />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/categories">
                    <Route index element={<AuthGuard element={<Categories />} />} />
                    <Route path=":categoryId" element={<AuthGuard element={<Category />} />} />
                </Route>
            </Routes>
        </Router>
    );
};

const AppWithProvider = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default memo(AppWithProvider);
