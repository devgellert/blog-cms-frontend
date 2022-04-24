import { postActions } from "../slice";
import slugify from "slugify";
import { unset } from "lodash";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import api from "../../../api";
import { uiActions } from "../../ui/slice";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
import getAxiosError from "../../../lib/getAxiosError";
import isSlugError from "../../../lib/isSlugError";
import { ApiPost } from "../../../types/api";
import prefixRoute from "../../../lib/prefixRoute";

function* editPostSaga(action: ReturnType<typeof postActions.editPostRequest>) {
    const {
        postId,
        slug,
        author,
        category,
        enabled,
        ogImage,
        cb: { setCategoryError, setSlugError, navigate }
    } = action.payload;

    setCategoryError("");
    setSlugError("");

    try {
        const body = {
            slug: slugify(slug),
            category: !category ? null : category,
            author,
            enabled,
            ogImage: ogImage?.id
        };

        if (body.category === null) {
            unset(body, "category");
        }

        if (!body.ogImage) {
            unset(body, "ogImage");
        }

        const response: AxiosResponse<ApiPost> = yield call(api.put, `/posts/${postId}`, body);

        yield put(postActions.editPostSuccess());

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited post." }));

        navigate(prefixRoute(`/posts/${response.data.id}`));
    } catch (e) {
        setSlugError(getAxiosFieldError(e, "slug"));
        setCategoryError(getAxiosFieldError(e, "category"));

        const axiosError = getAxiosError(e);
        if (isSlugError(axiosError)) {
            setSlugError(axiosError);
        }

        yield put(postActions.editPostError());

        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to edit post." }));
    }
}

export default editPostSaga;
