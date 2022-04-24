import { call, put } from "redux-saga/effects";
//
import { postActions } from "../slice";
import api from "../../../api";
import { uiActions } from "../../ui/slice";

function* removePostTranslationSaga(action: ReturnType<typeof postActions.removePostTranslationRequest>) {
    const { postId, locale, flow } = action.payload;

    try {
        yield call(api.delete, `/posts/${postId}/translations/${locale}`);

        if (flow === "post-details-page") {
            yield put(postActions.fetchAndSetPostAndTranslations({ postId }));
        }

        yield put(postActions.removePostTranslationSuccess({ flow }));

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully removed translation." }));
    } catch (e) {
        yield put(postActions.removePostTranslationError({ flow }));

        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to remove translation." }));
    }
}

export default removePostTranslationSaga;
