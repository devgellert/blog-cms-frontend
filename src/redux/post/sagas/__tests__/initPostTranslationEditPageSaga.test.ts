import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { postActions } from "../../slice";
import api from "../../../../api";
import { ApiPostTranslation } from "../../../../types/api";
import initPostTranslationEditPageSaga from "../initPostTranslationEditPageSaga";
import mockPostTranslation from "../../../../mock/mockPostTranslation";

describe("Scenario 1: init post translation edit page successfully", () => {
    const it = sagaHelper(
        initPostTranslationEditPageSaga(
            postActions.initTranslationEditPageRequest({
                postId: 1,
                locale: "en",
                cb: {
                    setMTitle: url => {},
                    setMDesc: url => {},
                    setOgTitle: url => {},
                    setOgDesc: url => {},
                    setEnabled: url => {},
                    setTitle: url => {},
                    setContent: url => {}
                }
            })
        ) as any
    );

    it("should get translation successfully", result => {
        expect(result).toEqual(call(api.get, `/posts/${1}/translations/en`));

        return {
            data: mockPostTranslation
        } as AxiosResponse<ApiPostTranslation>;
    });

    it("should dispatch success action", result => {
        expect(result).toEqual(put(postActions.initTranslationEditPageSuccess({ translation: mockPostTranslation })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to init post translation edit page", () => {
    const it = sagaHelper(
        initPostTranslationEditPageSaga(
            postActions.initTranslationEditPageRequest({
                postId: 1,
                locale: "en",
                cb: {
                    setMTitle: url => {},
                    setMDesc: url => {},
                    setOgTitle: url => {},
                    setOgDesc: url => {},
                    setEnabled: url => {},
                    setTitle: url => {},
                    setContent: url => {}
                }
            })
        ) as any
    );

    it("should fail to get translation", result => {
        expect(result).toEqual(call(api.get, `/posts/${1}/translations/en`));

        return new Error();
    });

    it("should dispatch error action", result => {
        expect(result).toEqual(put(postActions.initTranslationEditPageError()));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
