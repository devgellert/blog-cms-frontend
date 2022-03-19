import { takeLeading } from "redux-saga/effects";
//
import { postActions } from "../slice";
import fetchAndSetPostAndTranslationsSaga from "./fetchAndSetPostAndTranslationsSaga";
import removePostTranslationSaga from "./removePostTranslationSaga";
import createPostSaga from "./createPostSaga";

function* postSaga() {
    yield takeLeading(postActions.fetchAndSetPostAndTranslations, fetchAndSetPostAndTranslationsSaga);
    yield takeLeading(postActions.removePostTranslationRequest, removePostTranslationSaga);
    yield takeLeading(postActions.createPostRequest, createPostSaga);
}

export default postSaga;
