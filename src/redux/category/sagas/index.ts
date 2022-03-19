import { takeLeading } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import initCategoryOptionsSaga from "./initCategoryOptionsSaga";
import initializeCategoryDetailsPageSaga from "./initializeCategoryDetailsPageSaga";
import removeCategoryTranslationSaga from "./removeCategoryTranslationSaga";
import initCategoryEditPageSaga from "./initCategoryEditPageSaga";

function* categorySaga() {
    yield takeLeading(categoryActions.initCategoryOptionsRequest, initCategoryOptionsSaga);
    yield takeLeading(categoryActions.initializeCategoryDetailsPage, initializeCategoryDetailsPageSaga);
    yield takeLeading(categoryActions.removeCategoryTranslation, removeCategoryTranslationSaga);
    yield takeLeading(categoryActions.initCategoryEditPageRequest, initCategoryEditPageSaga);
}

export default categorySaga;
