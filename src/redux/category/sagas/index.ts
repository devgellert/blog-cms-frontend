import { takeLeading } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import initCategoryOptionsSaga from "./initCategoryOptionsSaga";
import initializeCategoryDetailsPageSaga from "./initializeCategoryDetailsPageSaga";
import removeCategoryTranslationSaga from "./removeCategoryTranslationSaga";
import initCategoryEditPageSaga from "./initCategoryEditPageSaga";
import editCategorySaga from "./editCategorySaga";
import createCategorySaga from "./createCategorySaga";
import createTranslationSaga from "./createTranslationSaga";
import initTranslationEditPageSaga from "./initTranslationEditPageSaga";
import editCategoryTranslationSaga from "./editCategoryTranslationSaga";

function* categorySaga() {
    yield takeLeading(categoryActions.initCategoryOptionsRequest, initCategoryOptionsSaga);
    yield takeLeading(categoryActions.initializeCategoryDetailsPage, initializeCategoryDetailsPageSaga);
    yield takeLeading(categoryActions.removeCategoryTranslation, removeCategoryTranslationSaga);
    yield takeLeading(categoryActions.initCategoryEditPageRequest, initCategoryEditPageSaga);
    yield takeLeading(categoryActions.editCategoryRequest, editCategorySaga);
    yield takeLeading(categoryActions.createCategoryRequest, createCategorySaga);
    yield takeLeading(categoryActions.createTranslationRequest, createTranslationSaga);
    //
    yield takeLeading(categoryActions.initTranslationEditPageRequest, initTranslationEditPageSaga);
    yield takeLeading(categoryActions.editTranslationRequest, editCategoryTranslationSaga);
}

export default categorySaga;
