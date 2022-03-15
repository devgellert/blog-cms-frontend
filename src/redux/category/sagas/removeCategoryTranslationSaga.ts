import { call, put } from "redux-saga/effects";
//
import api from "../../../api";
import { categoryActions } from "../slice";

function* removeCategoryTranslationSaga({
    payload: { categoryId, locale }
}: ReturnType<typeof categoryActions.removeCategoryTranslation>) {
    try {
        yield call(api.delete, `/categories/${categoryId}/translations/${locale}`);

        yield put(categoryActions.initializeCategoryDetailsPage({ id: categoryId }));
    } catch (e) {
        console.log(e);
    }
}

export default removeCategoryTranslationSaga;
