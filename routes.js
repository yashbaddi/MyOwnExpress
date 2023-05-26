let routes = new Route("/");
export function getRouteHandlers(path, method = undefined) {
  const pathArray = path.split("/");
  pathArray.shift();

  pathArray.forEach((pathroute) => {});
}

export function setRouteHandler(handler, path = "/", method = undefined) {
  const pathArray = path.split("/");
  pathArray.shift();

  const lastRoute = pathArray.reduce((mainRoute, childRoute) => {
    if (!childRoute.startsWith(":")) {
      mainRoute.childRoutes[childRoute] = new Route(childRoute);
      mainRoute.childRoutes[childRoute].path = childRoute;
      return mainRoute.childRoutes[childRoute];
    }
    mainRoute.hasQuery = true;
    mainRoute.queryChild = new Route(childRoute);
    return mainRoute.queryChild;
  }, routes);

  method === undefined
    ? lastRoute.stack.push(handler)
    : lastRoute.methods[method].push(handler);
  console.log(routes);
}

function Route(path) {
  this.path = path;
  this.hasQuery = false;
  this.childRoutes = {};
  this.stack = [];
  this.methods = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
  };
}
