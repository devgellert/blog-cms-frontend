import React from "react";
import { FC, memo } from "react";
//
// import css from "./SimpleImage.module.scss";

type Props = {
    src: string;

    width?: number;
    height?: number;
};

const SimpleImage: FC<Props> = ({ src, width, height }) => {
    return <img src={src} width={width} height={height} />;
};

export default memo(SimpleImage);
