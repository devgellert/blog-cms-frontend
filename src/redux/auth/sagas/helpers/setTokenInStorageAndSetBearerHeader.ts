import { LocalStorageKeys } from "../../../../types/localStorage";
import api from "../../../../api";

const setTokenInStorageAndSetBearerHeader = (token: string) => {
    localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default setTokenInStorageAndSetBearerHeader;
