import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import createPostTranslationSaga from "../sagas/createPostTranslationSaga";
import { postActions } from "../slice";
import api from "../../../api";
import { ApiPostTranslation } from "../../../types/api";
import { uiActions } from "../../ui/slice";

describe("Scenario 1: create post translation successfully", () => {
    const it = sagaHelper(
        createPostTranslationSaga(
            postActions.createTranslationRequest({
                postId: 1,
                locale: "en",
                title: "string",
                metaTitle: "metaTitle",
                metaDescription: "metaDescription",
                ogTitle: "ogTitle",
                ogDescription: "ogDescription",
                content: "content",
                enabled: false,
                cb: {
                    setTitleError: url => {},
                    setLocaleError: url => {},
                    setMTitleError: url => {},
                    setMDescError: url => {},
                    setOgTitleError: url => {},
                    setOgDescError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should create post translation successfully", result => {
        expect(result).toEqual(
            call(api.post, `/posts/${1}/translations`, {
                locale: "en",
                title: "string",
                metaTitle: "metaTitle",
                metaDescription: "metaDescription",
                ogTitle: "ogTitle",
                ogDescription: "ogDescription",
                content: "content",
                enabled: false
            })
        );

        return {
            data: {
                id: 1,
                createdAt: "",
                updatedAt: "",
                locale: "en",
                title: "string",
                metaTitle: "metaTitle",
                metaDescription: "metaDescription",
                ogTitle: "ogTitle",
                ogDescription: "ogDescription",
                content: "content",
                enabled: false
            }
        } as AxiosResponse<ApiPostTranslation>;
    });

    it("should dispatch post translation create success action", result => {
        expect(result).toEqual(put(postActions.createTranslationSuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "success", text: "Successfully created translation." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: create post translation fail", () => {
    const it = sagaHelper(
        createPostTranslationSaga(
            postActions.createTranslationRequest({
                postId: 1,
                locale: "en",
                title: "string",
                metaTitle: "metaTitle",
                metaDescription: "metaDescription",
                ogTitle: "ogTitle",
                ogDescription: "ogDescription",
                content: "content",
                enabled: false,
                cb: {
                    setTitleError: url => {},
                    setLocaleError: url => {},
                    setMTitleError: url => {},
                    setMDescError: url => {},
                    setOgTitleError: url => {},
                    setOgDescError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should fail to create post translation", result => {
        expect(result).toEqual(
            call(api.post, `/posts/${1}/translations`, {
                locale: "en",
                title: "string",
                metaTitle: "metaTitle",
                metaDescription: "metaDescription",
                ogTitle: "ogTitle",
                ogDescription: "ogDescription",
                content: "content",
                enabled: false
            })
        );

        return new Error();
    });

    it("should dispatch post translation create error", result => {
        expect(result).toEqual(put(postActions.createTranslationError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(
            put(
                uiActions.displaySnackbar({
                    type: "error",
                    text: "Failed to create translation."
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
