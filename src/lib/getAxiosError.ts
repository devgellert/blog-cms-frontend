import { get } from "lodash";

const getAxiosError = (e: any) => {
    return get(e, `response.data.error`, "");
};

export default getAxiosError;
