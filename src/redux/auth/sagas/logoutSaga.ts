import { LocalStorageKeys } from "../../../types/localStorage";
import api from "../../../api";

function* logoutSaga() {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
    delete api.defaults.headers.common["Authorization"];
}

export default logoutSaga;
