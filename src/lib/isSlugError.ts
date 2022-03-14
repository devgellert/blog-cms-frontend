const isSlugError = (errorText: string) => {
    return errorText.includes("slug");
};

export default isSlugError;
