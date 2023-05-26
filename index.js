import http from "http";
import { setRouteHandler } from "./middlewares.js";
import { request } from "./request.js";
import { response } from "./response.js";
import Url from "url";
import next from "./middlewares.js";
import getRouteHandlers from "./middlewares.js";

class MyOwnExpress {
  constructor() {
    this.server = http.createServer(function (req, res) {
      const url = new Url(req.url);
      this.pathname = url.pathname;
      this.request = request(req);
      this.response = response(res);
      getRouteHandlers(pathname, this.request.method)(
        this.request,
        this.response,
        this.#next
      );
    });
    return this;
  }

  #next() {
    getRouteHandlers(this.pathname, this.request.method)(
      this.request,
      this.response,
      this.#next
    );
  }

  use(...args) {
    if (args.length === 1) {
      setRouteHandler(args[0]);
    } else if (args.length === 2) {
      setRouteHandler(args[1], args[0]);
    }
  }

  lsiten(port) {
    this.server.listen(port);
  }
}
