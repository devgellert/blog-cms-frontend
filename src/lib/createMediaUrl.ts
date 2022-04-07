const createMediaUrl = (fileName: string) => {
    return `${process.env.REACT_APP_MEDIA_URL}/${fileName}`;
};

export default createMediaUrl;
