import React from "react";
import { FC, memo } from "react";
import cn from "classnames";
//
import css from "./TwoColumnGrid.module.scss";

type Props = {
    children: any;
    //
    className?: string;
};

const TwoColumnGrid: FC<Props> = ({ className, children }) => {
    return <div className={cn(css["TwoColumnGrid"], className)}>{children}</div>;
};

export default memo(TwoColumnGrid);
