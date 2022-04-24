import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import initPostEditPageSaga from "../initPostEditPageSaga";
import mockPost from "../../../../mock/mockPost";
import { postActions } from "../../slice";
import api from "../../../../api";
import { ApiCategory, ApiPost } from "../../../../types/api";

describe("Scenario 1: init post edit page successfully", () => {
    const it = sagaHelper(
        initPostEditPageSaga(
            postActions.initPostEditPageRequest({
                postId: 1,
                cb: {
                    setSlug: url => {},
                    setEnabled: url => {},
                    setCategory: url => {},
                    setOgImage: url => {},
                    setAuthor: url => {}
                }
            })
        ) as any
    );

    it("should get category successfully", result => {
        expect(result).toEqual(call(api.get, `/posts/${1}`));

        return {
            data: mockPost
        } as AxiosResponse<ApiPost>;
    });

    it("should get category options successfully", result => {
        expect(result).toEqual(call(api.get, "/categories?page=1&limit=1000"));

        return {
            data: {
                items: [
                    {
                        id: 1,
                        name: "name",
                        createdAt: "",
                        updatedAt: "",
                        slug: "slug",
                        enabled: false
                    }
                ]
            }
        } as AxiosResponse<{ items: ApiCategory[] }>;
    });

    it("should dispatch success action", result => {
        expect(result).toEqual(
            put(
                postActions.initPostEditPageSuccess({
                    categoryOptions: [
                        { value: 0, text: "-" },
                        { value: 1, text: "name" }
                    ]
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to init category edit page", () => {
    const it = sagaHelper(
        initPostEditPageSaga(
            postActions.initPostEditPageRequest({
                postId: 1,
                cb: {
                    setSlug: url => {},
                    setEnabled: url => {},
                    setCategory: url => {},
                    setOgImage: url => {},
                    setAuthor: url => {}
                }
            })
        ) as any
    );

    it("should fail to get category successfully", result => {
        expect(result).toEqual(call(api.get, `/posts/${1}`));

        return new Error();
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
