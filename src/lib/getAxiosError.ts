import { get } from "lodash";

const getAxiosError = (e: any) => {
    return get(e, `response.data.message`, "");
};

export default getAxiosError;
