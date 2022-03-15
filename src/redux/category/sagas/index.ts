import { takeLeading } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import initializeCategoryCreatePageSaga from "./initializeCategoryCreatePageSaga";
import initializeCategoryDetailsPageSaga from "./initializeCategoryDetailsPageSaga";
import removeCategoryTranslationSaga from "./removeCategoryTranslationSaga";

function* categorySaga() {
    yield takeLeading(categoryActions.initializeCategoryCreatePage, initializeCategoryCreatePageSaga);
    yield takeLeading(categoryActions.initializeCategoryDetailsPage, initializeCategoryDetailsPageSaga);
    yield takeLeading(categoryActions.removeCategoryTranslation, removeCategoryTranslationSaga);
}

export default categorySaga;
