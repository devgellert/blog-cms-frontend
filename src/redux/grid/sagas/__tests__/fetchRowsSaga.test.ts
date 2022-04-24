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

describe("Scenario 1: fetch rows successfully", () => {
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

describe("Scenario 3: more complicated transformer", () => {
    const TRANSFORMER = (object: any) => {
        return {
            name: `${object.firstName} ${object.lastName}`,
            age: object.age
        };
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

    it("should select pagination state", () => {
        return { page: 0, limit: 10 };
    });

    let response: any | null = null;

    it("should call api", () => {
        response = {
            data: {
                items: [
                    { firstName: "John", lastName: "Doe", age: 18 },
                    { firstName: "Jade", lastName: "Smith", age: 21 }
                ],
                pagination: { max: 0 }
            }
        };

        return response;
    });

    it("should correctly transform rows", result => {
        const transformedRows = response?.data?.items?.map(TRANSFORMER) as any[];

        expect(transformedRows[0]).toEqual({ name: "John Doe", age: 18 });
        expect(transformedRows[1]).toEqual({ name: "Jade Smith", age: 21 });
    });
});
