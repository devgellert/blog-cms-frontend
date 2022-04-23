import sagaHelper from "redux-saga-testing";
import { AxiosResponse } from "axios";
import { DeepPartial } from "redux";
//
import fetchRowsSaga from "../fetchRowsSaga";
import { call, put, select } from "redux-saga/effects";
import { gridActions } from "../../slice";
import GridSelectors from "../../selector";
import api from "../../../../api";
import { ApiGetCategoriesResponse } from "../../../../types/api";

const API_ENDPOINT = "test-api/endpoint";

describe("fetchRowsSaga", () => {
    const TRANSFORMER = (object: any) => {
        return object;
    };

    const it = sagaHelper(
        fetchRowsSaga(
            gridActions.fetchRows({
                apiEndpoint: API_ENDPOINT,
                transformer: TRANSFORMER,
                setPaginationToInitial: false
            })
        ) as any
    );

    it("should select pagination state", result => {
        expect(result).toEqual(select(GridSelectors.getPagination));

        return { page: 0, limit: 10 };
    });

    let response: DeepPartial<AxiosResponse<ApiGetCategoriesResponse>> | null = null;

    it("should call api", result => {
        expect(result).toEqual(call(api.get, `${API_ENDPOINT}?page=${1}&limit=${10}`));

        response = { data: { items: [], pagination: { max: 0 } } };

        return response;
    });

    it("should dispatch success action", result => {
        const transformedRows = response?.data?.items?.map(TRANSFORMER) as any[];

        expect(result).toEqual(put(gridActions.fetchRowsSuccess({ rows: transformedRows, pagination: { max: 0 } })));
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: failed to fetch rows", () => {
    const TRANSFORMER = (object: any) => {
        return object;
    };

    const it = sagaHelper(
        fetchRowsSaga(
            gridActions.fetchRows({
                apiEndpoint: API_ENDPOINT,
                transformer: TRANSFORMER,
                setPaginationToInitial: false
            })
        ) as any
    );

    it("should select pagination state", result => {
        expect(result).toEqual(select(GridSelectors.getPagination));

        return { page: 0, limit: 10 };
    });

    it("should call api", result => {
        expect(result).toEqual(call(api.get, `${API_ENDPOINT}?page=${1}&limit=${10}`));

        return new Error();
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});
