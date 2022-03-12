export type GridState = {
    rows: any[];
    isLoading: boolean;
    pagination: {
        max: number;
    } | null;
};
