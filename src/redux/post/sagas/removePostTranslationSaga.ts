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

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully removed translation." }));

        yield put(postActions.removePostTranslationSuccess({ flow }));
    } catch (e) {
        yield put(uiActions.displaySnackbar({ type: "error", text: "Failed to remove translation." }));

        yield put(postActions.removePostTranslationError({ flow }));
    }
}

export default removePostTranslationSaga;
