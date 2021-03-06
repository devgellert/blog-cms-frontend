import { ApiStatisticsError } from "../../types/api";

export type DashboardState = {
    isLoading: boolean;
    statistics: {
        numbers: {
            post: number | null;
            category: number | null;
            categoryTranslation: number | null;
            postTranslation: number | null;
        };
        errors: ApiStatisticsError[];
    };
};
