import { LocalStorageKeys } from "../../../types/localStorage";
import api from "../../../api";
import { put } from "redux-saga/effects";
import { uiActions } from "../../ui/slice";

function* logoutSaga() {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);

    delete api.defaults.headers.common["Authorization"];

    yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully logged out." }));
}

export default logoutSaga;
