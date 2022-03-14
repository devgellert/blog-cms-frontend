import { useState } from "react";

const useInput = ({ initialValue = "" }: { initialValue?: any }) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState("");

    return {
        value,
        errorText: error,
        hasError: !!error,
        setValue,
        setError
    };
};

export default useInput;
