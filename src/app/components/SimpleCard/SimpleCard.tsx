import React from "react";
import { FC, memo } from "react";
import { Card, CardContent } from "@mui/material";
import cn from "classnames";
//

type Props = {
    children: any;
    //
    className?: string;
};

const SimpleCard: FC<Props> = ({ children, className }) => {
    return (
        <Card className={cn(className)}>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default memo(SimpleCard);
