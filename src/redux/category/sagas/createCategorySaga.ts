import { call, put } from "redux-saga/effects";
import { unset } from "lodash";
import { AxiosResponse } from "axios";
//
import { categoryActions } from "../slice";
import { ApiCategory } from "../../../types/api";
import api from "../../../api";
import { uiActions } from "../../ui/slice";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
import getAxiosError from "../../../lib/getAxiosError";
import isSlugError from "../../../lib/isSlugError";
import prefixRoute from "../../../lib/prefixRoute";

function* createCategorySaga(action: ReturnType<typeof categoryActions.createCategoryRequest>) {
    const {
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
            parent,
            enabled
        };

        if (body.parent === null) {
            unset(body, "parent");
        }

        const response: AxiosResponse<ApiCategory> = yield call(api.post, "/categories", body);

        yield put(categoryActions.createCategorySuccess());

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully created category." }));

        navigate(prefixRoute(`/categories/${response.data.id}`));
    } catch (e) {
        setNameError(getAxiosFieldError(e, "name"));
        setSlugError(getAxiosFieldError(e, "slug"));
        setParentError(getAxiosFieldError(e, "parent"));

        const axiosError = getAxiosError(e);
        if (isSlugError(axiosError)) {
            setSlugError(axiosError);
        }

        yield put(categoryActions.createCategoryError());

        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to create category." }));
    }
}

export default createCategorySaga;
