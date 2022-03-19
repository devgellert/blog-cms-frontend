import { call, put } from "redux-saga/effects";
//
import { categoryActions } from "../slice";
import api from "../../../api";
import { uiActions } from "../../ui/slice";
import getAxiosFieldError from "../../../lib/getAxiosFieldError";
import getAxiosError from "../../../lib/getAxiosError";

function* createTranslationSaga(action: ReturnType<typeof categoryActions.createTranslationRequest>) {
    const {
        categoryId,
        name,
        locale,
        cb: { setNameError, setLocaleError, navigate }
    } = action.payload;

    setNameError("");
    setLocaleError("");

    try {
        yield call(api.post, `/categories/${categoryId}/translations`, {
            locale,
            name
        });

        yield put(categoryActions.createTranslationSuccess());

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully created translation." }));

        navigate(`/categories/${categoryId}`);
    } catch (e) {
        setNameError(getAxiosFieldError(e, "name"));
        setLocaleError(getAxiosFieldError(e, "locale"));

        const error = getAxiosError(e);
        if (error.includes("already exists")) {
            setLocaleError(`Locale already exists for this category.`);
        }

        yield put(categoryActions.createTranslationError());

        yield put(
            uiActions.displaySnackbar({
                type: "error",
                text: "Failed to create translation."
            })
        );
    }
}

export default createTranslationSaga;
