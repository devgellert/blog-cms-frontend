import { call, put } from "redux-saga/effects";
import { map } from "lodash";
import { AxiosResponse } from "axios";
//
import { categoryActions } from "../slice";
import { ApiCategory } from "../../../types/api";
import api from "../../../api";
import { CategoryOption } from "../types";
import { uiActions } from "../../ui/slice";

function* initPostEditPageSaga(action: ReturnType<typeof categoryActions.initCategoryEditPageRequest>) {
    const {
        categoryId,
        cb: { setSlug, setName, setParent }
    } = action.payload;

    try {
        const { data: category }: AxiosResponse<ApiCategory> = yield call(api.get, `/categories/${categoryId}`);
        setName(category.name);
        setSlug(category.slug);
        setParent(category.parent || null);

        const {
            data: { items: allCategories }
        }: AxiosResponse<{ items: ApiCategory[] }> = yield call(api.get, "/categories?page=1&limit=1000");

        const categoryOptions: CategoryOption[] = map([{ id: 0, name: "-" }, ...allCategories], elem => ({
            value: elem.id,
            text: elem.name
        }));

        yield put(categoryActions.initCategoryEditPageSuccess({ categoryOptions, category }));
    } catch (e) {
        yield put(categoryActions.initCategoryEditPageError());

        yield put(
            uiActions.displaySnackbar({
                type: "error",
                text: "Something went wrong while initiating this page. Please try again."
            })
        );
    }
}

export default initPostEditPageSaga;
