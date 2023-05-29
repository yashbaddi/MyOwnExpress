import http from "http";
import { setRouteHandler } from "./routes.js";
import { Request } from "./request.js";
import { Response } from "./response.js";
import url from "node:url";
import { getRouteHandlers } from "./routes.js";

export class MyOwnExpress {
  constructor() {
    this.server = http.createServer(function (req, res) {
      const parsedUrl = url.parse(req.url);
      this.pathname = parsedUrl.pathname;
      this.request = new Request(req);
      this.response = new Response(res);
      getRouteHandlers(this.pathname, this.request.method)(
        this.request,
        this.response,
        this.next
      );
    });
    // return this;
  }

  next() {
    getRouteHandlers(this.pathname, this.request.method)(
      this.request,
      this.response,
      this.next
    );
  }

  use(...args) {
    if (args.length === 1) {
      setRouteHandler(args[0]);
    }
    if (args.length === 2) {
      setRouteHandler(args[1], args[0]);
    }
  }

  listen(port) {
    this.server.listen(port);
  }
}
