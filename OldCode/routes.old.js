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

  lastRoute.middlewares.push(createMiddleware(handler, method));
}

function Route(path) {
  this.path = path;
  this.hasQuery = false;
  this.childRoutes = {};
  this.middlewares = [];
}

function createMiddleware(handler, method) {
  return { method: method, handler: handler };
}

export function getRouteHandlers(path, method = undefined) {
  const route = getRoute(path);
  let i = 0;

  route.middlewares;

  // return route.methods[method].pop();
}

// {
//   method:"Get",
//   handler:function(){},

// }
