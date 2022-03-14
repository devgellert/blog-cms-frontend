import { ApiCategory } from "../../types/api";

export type CategoryState = {
    isCategoryCreatePageLoading: boolean;
    parentCategories: null | ApiCategory[];
};

export type CreateNewCategoryPayload = { name: string; slug: string; parent: number | null };
