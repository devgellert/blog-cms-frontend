import { GridColumn } from "../../../pages/Categories/components/CategoryGrid/CategoryGrid";

type GridConfig<T, ApiResponseItem> = {
    columns: GridColumn[];
    transformer: (object: ApiResponseItem) => T;
    apiEndpoint: string;
};

export default GridConfig;
