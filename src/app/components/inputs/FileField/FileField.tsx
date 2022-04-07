import React, { ChangeEvent } from "react";
import { FC, memo } from "react";
//
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
    display: "none"
});

type Props = {
    id: string;
    onChange: (event: ChangeEvent<any>) => void;
    text: string;
};

const FileField: FC<Props> = ({ id, onChange, text }) => {
    return (
        <label htmlFor={id}>
            <Input accept="image/*" id={id} type="file" onChange={onChange} />

            <Button variant="contained" component="span">
                {text}
            </Button>
        </label>
    );
};

export default memo(FileField);
