import * as React from "react";
import Grid from "../../../../components/Grid/Grid";
import { useDispatch } from "react-redux";
import GridConfig from "../../../../components/Grid/types/GridConfig";

type Data = {
    id: string;
    name: string;
    slug: string;
};

export type GridColumn = {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
};

const config: GridConfig<Data> = {
    columns: [
        { id: "id", label: "Id", minWidth: 170 },
        { id: "name", label: "Name", minWidth: 100 },
        {
            id: "population",
            label: "population",
            minWidth: 170,
            align: "right",
            format: (value: number) => value.toLocaleString("en-US")
        }
    ]
};

export default function CategoryGrid() {
    const dispatch = useDispatch();

    return (
        <Grid
            rows={[{ id: "1", name: "name", slug: "slg" }]}
            config={config}
            changeHandler={(page, limit) => {
                console.log(page, limit);
            }}
        />
    );
}
