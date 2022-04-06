import { categoryActions } from "../slice";
import { unset } from "lodash";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import api from "../../../api";
import { uiActions } from "../../ui/slice";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
import getAxiosError from "../../../lib/getAxiosError";
import isSlugError from "../../../lib/isSlugError";
import { ApiCategory } from "../../../types/api";
import prefixRoute from "../../../lib/prefixRoute";

function* editCategorySaga(action: ReturnType<typeof categoryActions.editCategoryRequest>) {
    const {
        categoryId,
        slug,
        parent,
        name,
        enabled,
        cb: { setNameError, setParentError, setSlugError, navigate }
    } = action.payload;

    setNameError("");
    setParentError("");
    setSlugError("");

    try {
        const body = {
            name,
            slug,
            parent: !parent ? null : parent,
            enabled
        };

        if (body.parent === null) {
            unset(body, "parent");
        }

        const response: AxiosResponse<ApiCategory> = yield call(api.put, `/categories/${categoryId}`, body);

        yield put(categoryActions.editCategorySuccess());

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited category." }));

        navigate(prefixRoute(`/categories/${response.data.id}`));
    } catch (e) {
        setNameError(getAxiosFieldError(e, "name"));
        setSlugError(getAxiosFieldError(e, "slug"));
        setParentError(getAxiosFieldError(e, "parent"));

        const axiosError = getAxiosError(e);
        if (isSlugError(axiosError)) {
            setSlugError(axiosError);
        }

        yield put(categoryActions.editCategoryError());

        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to edit category." }));
    }
}

export default editCategorySaga;
