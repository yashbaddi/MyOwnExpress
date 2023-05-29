import { Middleware } from "../Middleware/middleware.js";
import { CreateRoute as SubRoute } from "./SubRoute.js";

export class Route {
  constructor() {
    this.routes = new SubRoute("/");
  }
  setRouteMiddleware(handler, path = "/", method = undefined) {
    const pathArray = path.split("/");
    pathArray.shift();

    const lastRoute = pathArray.reduce((parentRoute, nextSection) => {
      if (!nextSection.startsWith(":")) {
        if (parentRoute.childRoutes[nextSection] === undefined) {
          parentRoute.childRoutes[nextSection] = new Route(nextSection);
        }

        parentRoute.childRoutes[nextSection].path = nextSection;
        return parentRoute.childRoutes[nextSection];
      }
      parentRoute.hasQuery = true;
      parentRoute.queryChild = new SubRoute(nextSection);
      return parentRoute.queryChild;
    }, this.routes);

    lastRoute.middlewares.push(new Middleware(handler, method));
  }
  getRouteMiddlewares(path) {
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
    return lastRoute.middlewares;
  }
}
