import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
//
import Grid from "../../../../../components/Grid/Grid";
import GridConfig from "../../../../../components/Grid/types/GridConfig";
import { ApiCategory } from "../../../../../../types/api";
import Popup from "../../../../../components/Popup/Popup";
import api from "../../../../../../api";
import { gridActions } from "../../../../../../redux/grid/slice";
import { uiActions } from "../../../../../../redux/ui/slice";

type Data = {
    id: number;
    name: string;
    slug: string;
};

export default function CategoryGrid() {
    const dispatch = useDispatch();

    const [removeId, setRemoveId] = useState<null | number>(null);

    const config: GridConfig<Data, ApiCategory> = {
        columns: [
            { id: "id", label: "", format: (value: number) => `#${value}` },
            { id: "name", label: "Name", align: "right" },
            {
                id: "slug",
                label: "slug",
                align: "right"
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

            dispatch(
                uiActions.displaySnackbar({ type: "success", text: `Successfully removed category #${removeId}` })
            );
        } catch (e) {
            dispatch(uiActions.displaySnackbar({ type: "error", text: `Failed to remove category #${removeId}` }));
        } finally {
            setRemoveId(null);
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
