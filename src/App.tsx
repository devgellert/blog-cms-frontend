import React from "react";
import { FC, memo } from "react";
import {Button} from "@mui/material";
import Table from "./Table";

type Props = {};

const App: FC<Props> = ({}) => {
 return <div>
  <h1>{process.env.REACT_APP_API}</h1>

  <Button variant="text">Text</Button>
  <Button variant="outlined">Outlined</Button>

  <Table/>

 </div>;
}

export default memo(App);
