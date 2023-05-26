import { getRoutes } from "./routes.old";
import {
  getRouteHandlers,
  setRouteHandler,
  firstRouteFunction,
} from "./middlewares.js";

import url from "url";

const middleware = {};

function use(...args) {}

function next() {
  firstRouteFunction();
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
