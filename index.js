import http from "http";
import { Request } from "./Request/request.js";
import { Response } from "./Response/response.js";
import url from "node:url";
import staticMiddleware from "./Middleware/static.js";
import { Router } from "./Routes/Router.js";
import { MiddlewareIterator } from "./Middleware/middlewareIterator.js";
import { httpCreateServerHandler } from "./utils.js";

export class MyOwnExpress {
  constructor() {
    this.router = new Router();
    this.server = http.createServer(httpCreateServerHandler(this.router));
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
      this.router.setRouteMiddleware(args, method);
    }
    if (args.length >= 2) {
      const path = args.shift();
      this.router.setRouteMiddleware(args, method, path);
    }
  }

  static static(dirPath) {
    return staticMiddleware(dirPath);
  }

  listen(port) {
    this.server.listen(port);
  }
}
