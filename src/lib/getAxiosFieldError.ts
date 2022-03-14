import { get } from "lodash";

const getAxiosFieldError = (e: any, fieldName: string) => {
    return get(e, `response.data.errors.children[${fieldName}].errors[0]`, "");
};

export default getAxiosFieldError;
