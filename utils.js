import url from "node:url";
import { Request } from "./Request/request.js";
import { Response } from "./Response/response.js";
import { MiddlewareIterator } from "./Middleware/middlewareIterator.js";

export function httpCreateServerHandler(route) {
  function handler(req, res) {
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    const request = new Request(req);
    const response = new Response(res);
    const middlewareArray = route.getRouteMiddlewares(pathname);
    console.log("middle Array", middlewareArray);
    const middleware = new MiddlewareIterator(
      middlewareArray,
      request,
      response,
    );
    middleware.next();
  }
  return handler;
}
