export type DashboardState = {
    isLoading: boolean;
    statistics: {
        numbers: {
            post: number | null;
            category: number | null;
            categoryTranslation: number | null;
            postTranslation: number | null;
        };
    };
};
