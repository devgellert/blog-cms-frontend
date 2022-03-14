import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
//
import Grid from "../../../../components/Grid/Grid";
import GridConfig from "../../../../components/Grid/types/GridConfig";
import { ApiCategory } from "../../../../../types/api";
import Popup from "../../../../components/Popup/Popup";
import api from "../../../../../api";
import { gridActions } from "../../../../../redux/grid/slice";

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

export default function CategoryGrid() {
    const dispatch = useDispatch();

    const [removeId, setRemoveId] = useState<null | number>(null);

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
        apiEndpoint: "/categories",
        actions: [
            {
                text: "Details",
                createLink: row => {
                    return `/categories/${row.id}`;
                }
            },
            {
                text: "Edit",
                createLink: row => {
                    return `/categories/${row.id}/edit`;
                }
            },
            {
                text: "Delete",
                onClick: row => {
                    setRemoveId(row.id);
                }
            }
        ]
    };

    const removeCategory = async () => {
        try {
            await api.delete(`/categories/${removeId}`);

            dispatch(
                gridActions.fetchRows({ transformer: config.transformer as any, apiEndpoint: config.apiEndpoint })
            );
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Grid config={config} />

            <Popup
                title={`Do you want to remove category with id: #${removeId}`}
                isOpen={removeId !== null}
                onYesClick={removeCategory}
                setIsOpen={() => setRemoveId(null)}
            />
        </>
    );
}
