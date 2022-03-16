const transformFieldError = (error: string) => {
    switch (error) {
        case "This value should not be null.":
            return "This value is required.";
        default:
            return error;
    }
};

export default transformFieldError;
