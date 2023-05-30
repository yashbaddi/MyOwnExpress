import http from "http";
import { Request } from "./Request/request.js";
import { Response } from "./Response/response.js";
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
    this.#setMiddlewares(args);
  }

  get(...args) {
    this.#setMiddlewares(args, "GET");
  }
  post(...args) {
    this.#setMiddlewares(args, "POST");
  }
  put(...args) {
    this.#setMiddlewares(args, "PUT");
  }
  delete(...args) {
    this.#setMiddlewares(args, "DELETE");
  }

  #setMiddlewares(args, method = undefined) {
    if (args.length === 1) {
      this.route.setRouteMiddleware(args, method);
    }
    if (args.length >= 2) {
      const path = args.shift();
      this.route.setRouteMiddleware(args, method, path);
    }
  }
  static static(path) {}

  listen(port) {
    this.server.listen(port);
  }
}
