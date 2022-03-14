import React from "react";
import { FC, memo } from "react";
import cn from "classnames";
//
import { TextField } from "@mui/material";
//
import css from "./Input.module.scss";

type Props = {
    label: string;
    value: string;
    setValue: (value: string) => void;
    errorText: string;
    //
    className?: string;
    hasMarginBottom?: boolean;
};

const Input: FC<Props> = ({ value, setValue, label, className, hasMarginBottom = false, errorText }) => {
    return (
        <TextField
            error={!!errorText}
            helperText={errorText}
            label={label}
            variant="filled"
            className={cn(css["Input"], className, { [css["margin-bottom"]]: hasMarginBottom })}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    );
};

export default memo(Input);