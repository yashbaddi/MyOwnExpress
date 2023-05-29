import http from "http";
import { Request } from "./request.js";
import { Response } from "./response.js";
import url from "node:url";
import { Route } from "./Routes/Route.js";
import { MiddlewareRequest } from "./Middleware/middlewareRequest.js";

export class MyOwnExpress {
  constructor() {
    this.route = new Route();
    const route = this.route;
    this.server = http.createServer(function (req, res) {
      const parsedUrl = url.parse(req.url);
      const pathname = parsedUrl.pathname;
      const request = new Request(req);
      const response = new Response(res);
      const middlewareArray = route.getRouteMiddlewares(pathname);
      console.log("middle Array", middlewareArray);
      const middleware = new MiddlewareRequest(
        middlewareArray,
        request,
        response
      );
      middleware.next();
    });
    return this;
  }

  use(...args) {
    if (args.length === 1) {
      this.route.getRouteMiddlewares;
      this.route.setRouteMiddleware(args[0]);
    }
    if (args.length === 2) {
      this.route.setRouteMiddleware(args[1], args[0]);
    }
  }

  listen(port) {
    this.server.listen(port);
  }
}
