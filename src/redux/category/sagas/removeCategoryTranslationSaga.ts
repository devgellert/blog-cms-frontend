import { call, put } from "redux-saga/effects";
//
import api from "../../../api";
import { categoryActions } from "../slice";
import { uiActions } from "../../ui/slice";

function* removeCategoryTranslationSaga({
    payload: { categoryId, locale }
}: ReturnType<typeof categoryActions.removeCategoryTranslation>) {
    try {
        yield call(api.delete, `/categories/${categoryId}/translations/${locale}`);

        yield put(categoryActions.initializeCategoryDetailsPage({ id: categoryId }));

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully removed translation." }));
    } catch (e) {
        console.log(e);
        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to remove translation." }));
    }
}

export default removeCategoryTranslationSaga;
