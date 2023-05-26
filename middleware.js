import { getRoutes } from "./routes.old";

import url from "url";

const middleware = {};

function use(path, func) {
  const req = new Request();
  const res = new Response();
  func(req, res);
}

function executeMiddileWare(url) {
  const urlObj = url;
}

export function paramUrl(path) {
  const pathArray = path.split("/");
}

// const eachMiddleware={
//     path:"/",
//     childRoutes:{Object.create(eachMiddleware)}
// }
