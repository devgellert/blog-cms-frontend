import { call, put } from "redux-saga/effects";
import { map } from "lodash";
import { AxiosResponse } from "axios";
//
import { postActions } from "../slice";
import { ApiCategory, ApiPost } from "../../../types/api";
import api from "../../../api";
import { CategoryOption } from "../../category/types";

function* initPostEditPageSaga(action: ReturnType<typeof postActions.initPostEditPageRequest>) {
    const {
        postId,
        cb: { setSlug, setCategory, setAuthor, setEnabled }
    } = action.payload;

    try {
        const { data: post }: AxiosResponse<ApiPost> = yield call(api.get, `/posts/${postId}`);

        setSlug(post.slug);
        setCategory(post.category?.id ?? 0);
        setAuthor(post.author.id);
        setEnabled(post.enabled);

        const {
            data: { items: categories }
        }: AxiosResponse<{ items: ApiCategory[] }> = yield call(api.get, "/categories?page=1&limit=1000");

        const categoryOptions: CategoryOption[] = map([{ id: 0, name: "-" }, ...categories], elem => ({
            value: elem.id,
            text: elem.name
        }));

        yield put(postActions.initPostEditPageSuccess({ categoryOptions }));
    } catch (e) {
        console.log(e);
    }
}

export default initPostEditPageSaga;
