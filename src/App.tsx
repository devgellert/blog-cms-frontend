import React from "react";
import { FC, memo } from "react";

type Props = {};

const App: FC<Props> = ({}) => {
 return <div>{process.env.REACT_APP_API}</div>;
}

export default memo(App);
