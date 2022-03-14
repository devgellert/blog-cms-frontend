import { takeLeading } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import initializeCategoryCreatePageSaga from "./initializeCategoryCreatePageSaga";

function* categorySaga() {
    yield takeLeading(categoryActions.initializeCategoryCreatePage, initializeCategoryCreatePageSaga);
}

export default categorySaga;
