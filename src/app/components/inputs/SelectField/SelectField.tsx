import React from "react";
import { FC, memo } from "react";
import { map } from "lodash";
//
// import css from "./Select.module.scss";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type Props = {
    labelId: string;
    label: string;
    errorText: string;
    onChange: (event: SelectChangeEvent) => void;
    value: any;
    choices: { value: any; text: string }[];
};

const SelectField: FC<Props> = ({ errorText, value, onChange, label, choices, labelId }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>

            <Select
                error={!!errorText}
                variant="filled"
                labelId={labelId}
                value={value}
                label={label}
                onChange={onChange}
            >
                {map(choices, choice => (
                    <MenuItem value={choice.value}>{choice.text}</MenuItem>
                ))}
            </Select>
            {!!errorText && <FormHelperText error={true}>{errorText}</FormHelperText>}
        </FormControl>
    );
};

export default memo(SelectField);
