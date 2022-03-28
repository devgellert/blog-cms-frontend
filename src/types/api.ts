import { ApiResource } from "./common";
import { AxiosResponse } from "axios";

export type ApiUser = { username: string } & ApiResource;

export type ApiLoginResponse = { token: string };

export type ApiRefreshResponse = { token: string };

export type ApiCategory = { name: string; slug: string; parent?: { id: number; name: string } } & ApiResource;

export type ApiResponsePaginationType = {
    pagination: {
        max: number;
    };
};

export type ApiGetCategoriesResponse = { items: ApiCategory[] } & ApiResponsePaginationType;

export type ApiPost = {
    author: { id: number; username: string };
    id: number;
    category?: { id: number; name: string };
    slug: string;
} & ApiResource;

export type ApiGetPostsResponse = {
    items: ApiPost[];
} & ApiResponsePaginationType;

export type ApiCategoryTranslation = {
    category: number;
    id: number;
    locale: string;
    name: string;
};

export type ApiPostTranslation = {
    content: string;
    enabled: boolean;
    locale: string;
    metaDescription: string;
    metaTitle: string;
    ogDescription: string;
    ogTitle: string;
    parent: number;
    title: string;
} & ApiResource;

export type ApiStatistics = {
    numbers: {
        post: number;
        category: number;
        postTranslation: number;
        categoryTranslation: number;
    };
    errors: ApiStatisticsError[];
};

export type ApiStatisticsError = {
    type: ApiStatisticsErrorEnum;
    meta: any;
};

export enum ApiStatisticsErrorEnum {
    CATEGORY_TRANSLATION_MISSING = "category-translation-missing"
}

export type ApiStatisticsResponse = AxiosResponse<ApiStatistics>;
