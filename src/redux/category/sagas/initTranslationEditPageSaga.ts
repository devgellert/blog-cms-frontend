import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import { ApiCategoryTranslation } from "../../../types/api";
import api from "../../../api";

function* initTranslationEditPageSaga(action: ReturnType<typeof categoryActions.initTranslationEditPageRequest>) {
    const {
        categoryId,
        locale,
        cb: { setName, setEnabled }
    } = action.payload;

    try {
        const { data: translation }: AxiosResponse<ApiCategoryTranslation> = yield call(
            api.get,
            `/categories/${categoryId}/translations/${locale}`
        );

        setName(translation.name);
        setEnabled(translation.enabled);

        yield put(categoryActions.initTranslationEditPageSuccess({ translation }));
    } catch (e) {
        console.log(e);
    }
}

export default initTranslationEditPageSaga;
