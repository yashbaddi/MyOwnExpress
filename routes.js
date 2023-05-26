let routes = createRoute("/");

export function getRoutes(path) {}

export function setRoutes(handler, path = "/", method = undefined) {
  const pathArray = path.split("/");
  pathArray.pop();

  const lastRoute = pathArray.reduce((mainRoute, childRoute) => {
    if (!childRoute.startsWith(":")) {
      mainRoute.childRoutes[childRoute] = createRoute(childRoute);
      mainRoute.childRoutes[childRoute].path = childRoute;
      return mainRoute.childRoutes[childRoute];
    }
    mainRoute.hasQuery = true;
    mainRoute.query;
  }, routes);

  method === undefined
    ? lastRoute.stack.push(handler)
    : lastRoute.methods[method].push(handler);
}

function createRoute(path) {
  this.path = path;
  this.hasQuery = false;
  this.query = {};
  this.stack = [];
  this.methods = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
  };
  return this;
}
