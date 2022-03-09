import React from "react";
import { FC, memo } from "react";

type Props = {};

const App: FC<Props> = ({}) => {
 return <div>
  <h1>{process.env.REACT_APP_API}</h1>
 </div>;
}

export default memo(App);
