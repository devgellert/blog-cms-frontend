import { takeLeading } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import initCategoryOptionsSaga from "./initCategoryOptionsSaga";
import initializeCategoryDetailsPageSaga from "./initializeCategoryDetailsPageSaga";
import removeCategoryTranslationSaga from "./removeCategoryTranslationSaga";
import initCategoryEditPageSaga from "./initCategoryEditPageSaga";
import editCategorySaga from "./editCategorySaga";

function* categorySaga() {
    yield takeLeading(categoryActions.initCategoryOptionsRequest, initCategoryOptionsSaga);
    yield takeLeading(categoryActions.initializeCategoryDetailsPage, initializeCategoryDetailsPageSaga);
    yield takeLeading(categoryActions.removeCategoryTranslation, removeCategoryTranslationSaga);
    yield takeLeading(categoryActions.initCategoryEditPageRequest, initCategoryEditPageSaga);
    yield takeLeading(categoryActions.editCategoryRequest, editCategorySaga);
}

export default categorySaga;
