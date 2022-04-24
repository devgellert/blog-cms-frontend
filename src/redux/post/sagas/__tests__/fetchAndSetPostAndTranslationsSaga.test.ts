import sagaHelper from "redux-saga-testing";
import removePostTranslationSaga from "../removePostTranslationSaga";
import { postActions } from "../../slice";
import { call, put } from "redux-saga/effects";
import api from "../../../../api";
import { uiActions } from "../../../ui/slice";
import fetchAndSetPostAndTranslationsSaga from "../fetchAndSetPostAndTranslationsSaga";
import { AxiosResponse } from "axios";
import { ApiPost, ApiPostTranslation } from "../../../../types/api";
import mockPost from "../../../../mock/mockPost";
import mockPostTranslation from "../../../../mock/mockPostTranslation";

describe("Scenario 1: fetch and set post translations successfully", () => {
    const it = sagaHelper(
        fetchAndSetPostAndTranslationsSaga(
            postActions.fetchAndSetPostAndTranslations({
                postId: 1
            })
        ) as any
    );

    it("should call api successfully", function (result) {
        expect(result).toEqual(call(api.get, `/posts/${1}`));

        return { data: mockPost } as AxiosResponse<ApiPost>;
    });

    it("should call translations api successfully", function (result) {
        expect(result).toEqual(call(api.get, `/posts/${1}/translations`));

        return {
            data: {
                items: [mockPostTranslation]
            }
        } as AxiosResponse<{ items: ApiPostTranslation[] }>;
    });

    it("should dispatch success action", function (result) {
        expect(result).toEqual(
            put(
                postActions.fetchAndSetPostAndTranslationsSuccess({
                    postTranslations: [mockPostTranslation],
                    post: mockPost
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to fetch and set post translations", () => {
    const it = sagaHelper(
        fetchAndSetPostAndTranslationsSaga(
            postActions.fetchAndSetPostAndTranslations({
                postId: 1
            })
        ) as any
    );

    it("should fail to call api", function (result) {
        expect(result).toEqual(call(api.get, `/posts/${1}`));

        return new Error();
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
