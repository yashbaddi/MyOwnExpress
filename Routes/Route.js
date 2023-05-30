import { Middleware } from "../Middleware/middleware.js";
import { SubRoute } from "./SubRoute.js";
import path from "path";

export class Route {
  constructor() {
    this.routes = new SubRoute("/");
  }
  setRouteMiddleware(handlers, method = undefined, pathName = "/") {
    let pathArray = pathName.split("/");
    pathArray = pathArray.filter((section) => section.length > 0);
    const lastRoute = pathArray.reduce((parentRoute, nextSection) => {
      if (!nextSection.startsWith(":")) {
        if (parentRoute.childRoutes[nextSection] === undefined) {
          parentRoute.childRoutes[nextSection] = new SubRoute(nextSection);
        }

        parentRoute.childRoutes[nextSection].path = nextSection;
        return parentRoute.childRoutes[nextSection];
      }
      parentRoute.hasQuery = true;
      parentRoute.queryChild = new SubRoute(nextSection);
      return parentRoute.queryChild;
    }, this.routes);
    console.log(lastRoute.middlewares);

    handlers.forEach((handler) => {
      lastRoute.middlewares.push(new Middleware(handler, method));
    });
  }
  getRouteMiddlewares(pathName) {
    let pathArray = pathName.split("/");
    pathArray = pathArray.filter((section) => section.length > 0);

    if (path.extname(pathName).length !== 0) {
      pathArray.pop();
    }

    const lastRoute = pathArray.reduce((finalRoute, childRoute) => {
      if (finalRoute.childRoutes[childRoute] !== undefined) {
        return finalRoute.childRoutes[childRoute];
      }
      if (finalRoute.hasQuery) {
        return finalRoute.queryChild;
      }
      return finalRoute;
    }, this.routes);
    return lastRoute.middlewares;
  }
}
