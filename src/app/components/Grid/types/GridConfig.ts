type GridConfig<T, ApiResponseItem> = {
    columns: GridColumn[];
    transformer: (object: ApiResponseItem) => T;
    apiEndpoint: string;
    actions?: {
        text: string;
        onClick?: (row: T) => void;
        createLink?: (row: T) => string;
    }[];
};

export type GridColumn = {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
};

export default GridConfig;
