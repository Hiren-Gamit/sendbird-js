class Router {

    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

    _getCurrentURL() {
        return window.location.pathname;
    }

    _matchUrlToRoute(urlSegments) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            if (routePathSegments.length !== urlSegments.length) {
                return false;
            }
            return routePathSegments
                .every((routePathSegment, i) => routePathSegment === urlSegments[i]);
        });
        return matchedRoute;
    }

    _loadInitialRoute() {
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
        this.loadRoute(...pathSegments);
    }
    

    loadRoute(...urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs);
        if (!matchedRoute) {
            throw new Error('Route not found');
        }
        matchedRoute.callback();
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this.loadRoute(path);
    }
    navigateBack() {
        window.history.back();
    }
}

export default Router;