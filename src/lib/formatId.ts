const formatId = (id: number, prefix: string, maxChars: number = 6): string => {
    const paddedId = String(id).padStart(maxChars, "0");

    return `${prefix}#${paddedId}`;
};

export default formatId;
