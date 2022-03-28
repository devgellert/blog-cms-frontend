import { call, put } from "redux-saga/effects";
//
import { postActions } from "../slice";
import api from "../../../api";
import { uiActions } from "../../ui/slice";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
import getAxiosError from "../../../lib/getAxiosError";
import prefixRoute from "../../../lib/prefixRoute";

function* createPostTranslationSaga(action: ReturnType<typeof postActions.createTranslationRequest>) {
    const {
        postId,
        locale,
        content,
        metaDescription,
        ogDescription,
        metaTitle,
        ogTitle,
        title,
        enabled,
        cb: { setLocaleError, setMDescError, setOgDescError, setMTitleError, setTitleError, setOgTitleError, navigate }
    } = action.payload;

    setTitleError("");
    setLocaleError("");
    setMTitleError("");
    setMDescError("");
    setOgTitleError("");
    setOgDescError("");

    try {
        yield call(api.post, `/posts/${postId}/translations`, {
            locale,
            title,
            metaTitle,
            metaDescription,
            ogTitle,
            ogDescription,
            content,
            enabled
        });

        yield put(postActions.createTranslationSuccess());

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully created translation." }));

        navigate(prefixRoute(`/posts/${postId}`));
    } catch (e) {
        setLocaleError(getAxiosFieldError(e, "locale"));
        setTitleError(getAxiosFieldError(e, "title"));
        setMTitleError(getAxiosFieldError(e, "metaTitle"));
        setMDescError(getAxiosFieldError(e, "metaDescription"));
        setOgTitleError(getAxiosFieldError(e, "ogTitle"));
        setOgDescError(getAxiosFieldError(e, "ogDescription"));

        const error = getAxiosError(e);
        if (error.includes("already exists")) {
            setLocaleError(`Locale already exists for this post.`);
        }

        yield put(postActions.createTranslationError());

        yield put(
            uiActions.displaySnackbar({
                type: "error",
                text: "Failed to create translation."
            })
        );
    }
}

export default createPostTranslationSaga;
