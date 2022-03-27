import { ReactElement } from "react";

type GridConfig<T, ApiResponseItem> = {
    columns: GridColumn<T>[];
    transformer: (object: ApiResponseItem) => T;
    apiEndpoint: string;
    actions?: {
        text: string;
        onClick?: (row: T) => void;
        createLink?: (row: T) => string;
        icon?: ReactElement;
    }[];
};

export type GridColumn<T> = {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: any) => string;
    onClick?: (row: T) => void;
    isClickDisabled?: (row: T) => boolean;
};

export default GridConfig;
