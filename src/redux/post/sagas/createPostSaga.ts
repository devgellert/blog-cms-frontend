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

function* createPostSaga(action: ReturnType<typeof postActions.createPostRequest>) {
    const {
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

        const response: AxiosResponse<ApiPost> = yield call(api.post, "/posts", body);

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully created post." }));

        yield put(postActions.createPostSuccess());

        navigate(prefixRoute(`/posts/${response.data.id}`));
    } catch (e) {
        setSlugError(getAxiosFieldError(e, "slug"));
        setCategoryError(getAxiosFieldError(e, "category"));

        const axiosError = getAxiosError(e);
        if (isSlugError(axiosError)) {
            setSlugError(axiosError);
        }

        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to create post." }));

        yield put(postActions.createPostError());
    }
}

export default createPostSaga;
