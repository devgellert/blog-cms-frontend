import { ApiCategory, ApiCategoryTranslation } from "../../types/api";

export type CategoryState = {
    categoryOptions: CategoryOption[];
    category: null | ApiCategory;
    categoryTranslation: null | ApiCategoryTranslation;
    translations: null | ApiCategoryTranslation[];
    //
    isCategoryDetailsLoading: boolean;
    isCategoryCreatePageLoading: boolean;
    isCategoryEditPageLoading: boolean;
    //
    isCategoryTranslationCreatePageLoading: boolean;
    isCategoryTranslationEditPageLoading: boolean;
};

export type CategoryOption = { value: number; text: string };

export type CreateNewCategoryPayload = { name: string; slug: string; parent: number | null };
