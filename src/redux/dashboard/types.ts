export type DashboardState = {
    isLoading: boolean;
    statistics: {
        numbers: {
            category: number | null;
            post: number | null;
        };
    };
};
