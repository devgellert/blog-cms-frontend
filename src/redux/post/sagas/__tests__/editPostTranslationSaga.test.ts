import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import editPostTranslationSaga from "../editPostTranslationSaga";
import { postActions } from "../../slice";
import api from "../../../../api";
import { ApiPostTranslation } from "../../../../types/api";
import { uiActions } from "../../../ui/slice";

describe("Scenario 1: edit post translation successfully", () => {
    const it = sagaHelper(
        editPostTranslationSaga(
            postActions.editTranslationRequest({
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
                    setMTitleError: url => {},
                    setMDescError: url => {},
                    setOgTitleError: url => {},
                    setOgDescError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should edit post translation successfully", result => {
        expect(result).toEqual(
            call(api.put, `/posts/${1}/translations/en`, {
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

    it("should dispatch post translation edit success action", result => {
        expect(result).toEqual(put(postActions.editTranslationSuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited translation." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: edit post translation fail", () => {
    const it = sagaHelper(
        editPostTranslationSaga(
            postActions.editTranslationRequest({
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
                    setMTitleError: url => {},
                    setMDescError: url => {},
                    setOgTitleError: url => {},
                    setOgDescError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should fail to edit post translation", result => {
        expect(result).toEqual(
            call(api.put, `/posts/${1}/translations/${"en"}`, {
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

    it("should dispatch post translation edit error", result => {
        expect(result).toEqual(put(postActions.editTranslationError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(
            put(
                uiActions.displaySnackbar({
                    type: "error",
                    text: "Failed to edit translation."
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
