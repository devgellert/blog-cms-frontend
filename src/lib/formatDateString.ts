const formatDateString = (value: string, omitTime?: boolean) => {
    const date = new Date(value);

    if (omitTime) {
        return date.toLocaleDateString("hu");
    }

    return date.toLocaleString("hu");
};

export default formatDateString;
