import React from "react";
import { FC, memo } from "react";
import {Button} from "@mui/material";

type Props = {};

const App: FC<Props> = ({}) => {
 return <div>
  <h1>{process.env.REACT_APP_API}</h1>

  <Button variant="text">Text</Button>
  <Button variant="outlined">Outlined</Button>


 </div>;
}

export default memo(App);
