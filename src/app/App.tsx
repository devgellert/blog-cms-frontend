import React from "react";
import { FC, memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//
import store from "../redux/store";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Categories/Categories";
import Category from "./pages/Category/Category";

type Props = {};

const App: FC<Props> = ({}) => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/categories">
                        <Route index element={<Categories />} />
                        <Route path=":categoryId" element={<Category />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
};

export default memo(App);
