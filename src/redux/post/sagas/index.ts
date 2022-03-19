import { takeLeading } from "redux-saga/effects";
//
import { postActions } from "../slice";
import fetchAndSetPostAndTranslationsSaga from "./fetchAndSetPostAndTranslationsSaga";
import removePostTranslationSaga from "./removePostTranslationSaga";

function* postSaga() {
    yield takeLeading(postActions.fetchAndSetPostAndTranslations, fetchAndSetPostAndTranslationsSaga);
    yield takeLeading(postActions.removePostTranslationRequest, removePostTranslationSaga);
}

export default postSaga;
