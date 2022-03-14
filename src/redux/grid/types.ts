export type GridState = {
    rows: any[];
    isLoading: boolean;
    pagination: {
        max: number | null;
        page: number;
        limit: number;
    };
};
