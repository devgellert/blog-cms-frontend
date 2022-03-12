import { ApiResource } from "./common";

export type ApiUser = {} & ApiResource;

export type ApiLoginResponse = { token: string };
