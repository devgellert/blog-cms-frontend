import React, { useEffect } from "react";
import { FC, memo } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//
import store from "../redux/store";
import { authActions } from "../redux/auth/slice";
import Menu from "./components/Menu/Menu";
import Posts from "./pages/post/Posts/Posts";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import Categories from "./pages/category/Categories/Categories";
import Category from "./pages/category/Category/Category";
import CategoryCreate from "./pages/category/CategoryCreate/CategoryCreate";
import CategoryLocaleEdit from "./pages/category/CategoryTranslationEdit/CategoryTranslationEdit";
import CategoryLocaleCreate from "./pages/category/CategoryTranslationCreate/CategoryTranslationCreate";
import CategoryEdit from "./pages/category/CategoryEdit/CategoryEdit";
import Snackbar from "./components/Snackbar/Snackbar";
//
import css from "./App.module.scss";

type Props = {};

const App: FC<Props> = ({}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.refreshJwt());
    }, []);

    return (
        <div className={css["App"]}>
            <Router>
                <Menu />

                <Snackbar />

                <main className={css["main"]}>
                    <Routes>
                        <Route path="/" element={<AuthGuard element={<Dashboard />} />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/categories">
                            <Route index element={<AuthGuard element={<Categories />} />} />
                            <Route path="create" element={<AuthGuard element={<CategoryCreate />} />} />
                            <Route path=":categoryId" element={<AuthGuard element={<Category />} />} />
                            <Route path=":categoryId/edit" element={<AuthGuard element={<CategoryEdit />} />} />
                            <Route
                                path=":categoryId/translations/create"
                                element={<AuthGuard element={<CategoryLocaleCreate />} />}
                            />
                            <Route
                                path=":categoryId/translations/:locale/edit"
                                element={<AuthGuard element={<CategoryLocaleEdit />} />}
                            />
                        </Route>
                        <Route path="/posts">
                            <Route index element={<AuthGuard element={<Posts />} />} />
                        </Route>
                    </Routes>
                </main>
            </Router>
        </div>
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
