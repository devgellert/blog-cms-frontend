import { useState } from "react";
//
import transformFieldError from "../transformFieldError";

const useInput = ({ initialValue = "" }: { initialValue?: any }) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState("");

    return {
        value,
        errorText: error,
        hasError: !!error,
        setValue,
        setError: (error: string) => setError(transformFieldError(error))
    };
};

export default useInput;
