const prefixRoute = (route: string) => {
    if (!process.env.REACT_APP_ROUTE_PREFIX) {
        return route;
    }

    return `/${process.env.REACT_APP_ROUTE_PREFIX}${route}`;
};

export default prefixRoute;
