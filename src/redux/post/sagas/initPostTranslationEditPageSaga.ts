import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import { postActions } from "../slice";
import { ApiPostTranslation } from "../../../types/api";
import api from "../../../api";

function* initPostTranslationEditPageSaga(action: ReturnType<typeof postActions.initTranslationEditPageRequest>) {
    const {
        postId,
        locale,
        cb: { setMDesc, setOgDesc, setMTitle, setOgTitle, setTitle, setContent }
    } = action.payload;

    try {
        const { data: translation }: AxiosResponse<ApiPostTranslation> = yield call(
            api.get,
            `/posts/${postId}/translations/${locale}`
        );

        setTitle(translation.title);
        setMTitle(translation.metaTitle);
        setMDesc(translation.metaDescription);
        setOgTitle(translation.ogTitle);
        setOgDesc(translation.ogDescription);
        setContent(translation.content);

        yield put(postActions.initTranslationEditPageSuccess({ translation }));
    } catch (e) {
        console.log(e);

        yield put(postActions.initTranslationEditPageError());
    }
}

export default initPostTranslationEditPageSaga;
