let routes = {};

export function getRoutes(path) {
  const pathArray = path.split("/");

  const routePos = pathArray.reduce((parentRoute, childRoute, index) => {
    if (childRoute.length == 0 && index !== 0) return parentRoute;
    return parentRoute.childRoutes[childRoute];
  }, routes);

  return routePos;
}

export function setRoutes(path, handler) {
  const pathArray = path.split("/");

  routes = pathArray.reduce((AppendedRoutes, subPath, index) => {
    if (subPath.length === 0 && index !== 0) return AppendedRoutes;
    if (!AppendedRoutes.path) {
      AppendedRoutes.path = subPath;
      AppendedRoutes.childRoutes = {};
    }
    return AppendedRoutes.childRoutes;
  }, routes);

  const routePos = pathArray.reduce((parentRoute, childRoute, index) => {
    if (childRoute.length == 0 && index !== 0) return parentRoute;
    return parentRoute.childRoutes[childRoute];
  }, routes[method]);
  routePos.handler = handler;
}
