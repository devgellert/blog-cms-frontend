import { takeLeading } from "redux-saga/effects";
//
import { postActions } from "../slice";
import fetchAndSetPostAndTranslationsSaga from "./fetchAndSetPostAndTranslationsSaga";
import removePostTranslationSaga from "./removePostTranslationSaga";
import createPostSaga from "./createPostSaga";
import initPostEditPageSaga from "./initPostEditPageSaga";
import editPostSaga from "./editPostSaga";
import createPostTranslationSaga from "./createPostTranslationSaga";
import initPostTranslationEditPageSaga from "./initPostTranslationEditPageSaga";

function* postSaga() {
    yield takeLeading(postActions.fetchAndSetPostAndTranslations, fetchAndSetPostAndTranslationsSaga);
    yield takeLeading(postActions.removePostTranslationRequest, removePostTranslationSaga);
    yield takeLeading(postActions.createPostRequest, createPostSaga);
    yield takeLeading(postActions.initPostEditPageRequest, initPostEditPageSaga);
    yield takeLeading(postActions.editPostRequest, editPostSaga);
    //
    yield takeLeading(postActions.createTranslationRequest, createPostTranslationSaga);
    yield takeLeading(postActions.initTranslationEditPageRequest, initPostTranslationEditPageSaga);
}

export default postSaga;
