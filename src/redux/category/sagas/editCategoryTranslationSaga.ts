import { call, put } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import api from "../../../api";
import { uiActions } from "../../ui/slice";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
import prefixRoute from "../../../lib/prefixRoute";

function* editCategoryTranslationSaga(action: ReturnType<typeof categoryActions.editTranslationRequest>) {
    const {
        categoryId,
        name,
        locale,
        enabled,
        cb: { setNameError, navigate }
    } = action.payload;

    setNameError("");

    try {
        yield call(api.put, `/categories/${categoryId}/translations/${locale}`, {
            name,
            enabled
        });

        yield put(categoryActions.editTranslationSuccess());

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited translation." }));

        navigate(prefixRoute(`/categories/${categoryId}`));
    } catch (e) {
        const nameError = getAxiosFieldError(e, "name");
        setNameError(nameError);

        yield put(categoryActions.editTranslationError());

        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to edit translation." }));
    }
}

export default editCategoryTranslationSaga;
