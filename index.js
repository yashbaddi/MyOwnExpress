import http from "http";
import { request } from "./request.js";
import { response } from "./response.js";
import { routes } from "./routes.js";

export function ownExpress() {
  const server = http.createServer((req, res) => {
    req = request(req);
    res = response(res);
    console.log(req);
    routes[req.method][req.url](req, res);
  });
  function get(path, callback) {
    routes["GET"][path] = callback;
  }
  function post(path, callback) {
    routes["POST"][path] = callback;
  }
  function put(path, callback) {
    routes["PUT"][path] = callback;
  }
  function del(path, callback) {
    routes["DELETE"][path] = callback;
  }
  function listen(port) {
    server.listen(port);
  }

  return {
    get: get,
    post: post,
    put: put,
    del: del,
    listen: listen,
  };
}
