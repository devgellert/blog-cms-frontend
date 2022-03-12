import { ApiResource } from "./common";

export type ApiUser = { username: string } & ApiResource;

export type ApiLoginResponse = { token: string };

export type ApiRefreshResponse = { token: string };

export type ApiCategory = { name: string; slug: string } & ApiResource;

export type ApiResponsePaginationType = {
    pagination: {
        max: number;
    };
};

export type ApiGetCategoriesResponse = { items: ApiCategory[] } & ApiResponsePaginationType;
