import { ApiResource } from "./common";

export type ApiUser = { username: string } & ApiResource;

export type ApiLoginResponse = { token: string };

export type ApiRefreshResponse = { token: string };
