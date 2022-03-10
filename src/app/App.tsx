import React from "react";
import { FC, memo } from "react";
import { Provider } from "react-redux";
//
import store from "../redux/store";
import css from "./App.module.scss";

type Props = {};

const App: FC<Props> = ({}) => {
    return (
        <Provider store={store}>
            <div className={css["App"]}>Hello world</div>
        </Provider>
    );
};

export default memo(App);
