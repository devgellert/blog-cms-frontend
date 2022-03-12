import * as React from "react";
import Grid from "../../../../components/Grid/Grid";
import GridConfig from "../../../../components/Grid/types/GridConfig";
import { ApiCategory } from "../../../../../types/api";

type Data = {
    id: number;
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

const config: GridConfig<Data, ApiCategory> = {
    columns: [
        { id: "id", label: "Id", minWidth: 170 },
        { id: "name", label: "Name", minWidth: 100 },
        {
            id: "slug",
            label: "slug",
            minWidth: 170,
            align: "right",
            format: (value: number) => value.toLocaleString("en-US")
        }
    ],
    transformer: object => {
        return {
            id: object.id,
            slug: object.slug,
            name: object.name
        };
    },
    apiEndpoint: "/categories"
};

export default function CategoryGrid() {
    return <Grid config={config} />;
}
