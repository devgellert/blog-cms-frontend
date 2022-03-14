import { GridColumn } from "../../../pages/Categories/components/CategoryGrid/CategoryGrid";

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

export default GridConfig;
