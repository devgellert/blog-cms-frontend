import { takeLeading } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import initializeCategoryCreatePageSaga from "./initializeCategoryCreatePageSaga";
import initializeCategoryDetailsPageSaga from "./initializeCategoryDetailsPageSaga";

function* categorySaga() {
    yield takeLeading(categoryActions.initializeCategoryCreatePage, initializeCategoryCreatePageSaga);
    yield takeLeading(categoryActions.initializeCategoryDetailsPage, initializeCategoryDetailsPageSaga);
}

export default categorySaga;
