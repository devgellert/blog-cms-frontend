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

function* editPostSaga(action: ReturnType<typeof postActions.editPostRequest>) {
    const {
        postId,
        slug,
        author,
        category,
        cb: { setCategoryError, setSlugError, navigate }
    } = action.payload;

    setCategoryError("");
    setSlugError("");

    try {
        const body = {
            slug: slugify(slug),
            category,
            author
        };

        if (body.category === null) {
            unset(body, "category");
        }

        const response: AxiosResponse<ApiPost> = yield call(api.put, `/posts/${postId}`, body);

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited post." }));

        yield put(postActions.editPostSuccess());

        navigate(`/posts/${response.data.id}`);
    } catch (e) {
        setSlugError(getAxiosFieldError(e, "slug"));
        setCategoryError(getAxiosFieldError(e, "category"));

        const axiosError = getAxiosError(e);
        if (isSlugError(axiosError)) {
            setSlugError(axiosError);
        }

        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to edit post." }));

        yield put(postActions.editPostError());
    }
}

export default editPostSaga;
