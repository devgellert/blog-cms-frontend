import { call, put } from "redux-saga/effects";
//
import { postActions } from "../slice";
import api from "../../../api";
import { uiActions } from "../../ui/slice";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";

function* editTranslationRequest(action: ReturnType<typeof postActions.editTranslationRequest>) {
    const {
        postId,
        locale,
        content,
        metaDescription,
        ogDescription,
        metaTitle,
        ogTitle,
        title,
        cb: { setMDescError, setOgDescError, setMTitleError, setTitleError, setOgTitleError, navigate }
    } = action.payload;

    setTitleError("");
    setMTitleError("");
    setMDescError("");
    setOgTitleError("");
    setOgDescError("");

    try {
        yield call(api.put, `/posts/${postId}/translations/${locale}`, {
            title,
            metaTitle,
            metaDescription,
            ogTitle,
            ogDescription,
            content
        });

        yield put(postActions.editTranslationSuccess());

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited translation." }));

        navigate(`/posts/${postId}`);
    } catch (e) {
        setTitleError(getAxiosFieldError(e, "title"));
        setMTitleError(getAxiosFieldError(e, "metaTitle"));
        setMDescError(getAxiosFieldError(e, "metaDescription"));
        setOgTitleError(getAxiosFieldError(e, "ogTitle"));
        setOgDescError(getAxiosFieldError(e, "ogDescription"));

        yield put(postActions.editTranslationError());

        yield put(
            uiActions.displaySnackbar({
                type: "error",
                text: "Failed to edit translation."
            })
        );
    }
}

export default editTranslationRequest;
