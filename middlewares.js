import path from "path";

let middleware = new Route("/");

export function getRoute(path) {
  const pathArray = path.split("/");
  pathArray.shift();

  const lastRoute = pathArray.reduce((finalRoute, childRoute) => {
    if (finalRoute.childRoutes[childRoute] !== undefined) {
      return finalRoute.childRoutes[childRoute];
    }
    if (finalRoute.hasQuery) {
      return finalRoute.queryChild;
    }
  }, middleware);
  return lastRoute;
}

export function setRouteHandler(handler, path = "/", method = undefined) {
  const pathArray = path.split("/");
  pathArray.shift();

  const lastRoute = pathArray.reduce((mainRoute, childRoute) => {
    if (!childRoute.startsWith(":")) {
      if (mainRoute.childRoutes[childRoute] === undefined) {
        mainRoute.childRoutes[childRoute] = new Route(childRoute);
      }

      mainRoute.childRoutes[childRoute].path = childRoute;
      return mainRoute.childRoutes[childRoute];
    }
    mainRoute.hasQuery = true;
    mainRoute.queryChild = new Route(childRoute);
    return mainRoute.queryChild;
  }, middleware);

  method === undefined
    ? lastRoute.stack.push(handler)
    : lastRoute.methods[method].push(handler);
  console.log(middleware);
}

function Route(path) {
  this.path = path;
  this.hasQuery = false;
  this.childRoutes = {};
  this.stack = [];
  this.methods = {};
}

// export function firstRouteFunction(path, method = undefined) {
//   const func = getRouteHandlers(path, method).pop();
//   return func;
// }

export function next() {}
export function getRouteHandlers(path, method = undefined) {
  const route = getRoute(path);
  if (method === undefined) {
    return route.stack.pop();
  }
  return route.methods[method].pop();
}
