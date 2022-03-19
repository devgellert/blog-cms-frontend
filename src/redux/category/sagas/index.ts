import { takeLeading } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import initCategoryOptionsSaga from "./initCategoryOptionsSaga";
import initializeCategoryDetailsPageSaga from "./initializeCategoryDetailsPageSaga";
import removeCategoryTranslationSaga from "./removeCategoryTranslationSaga";

function* categorySaga() {
    yield takeLeading(categoryActions.initCategoryOptionsRequest, initCategoryOptionsSaga);
    yield takeLeading(categoryActions.initializeCategoryDetailsPage, initializeCategoryDetailsPageSaga);
    yield takeLeading(categoryActions.removeCategoryTranslation, removeCategoryTranslationSaga);
}

export default categorySaga;
