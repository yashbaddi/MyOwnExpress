import { getRouteHandlers, setRouteHandler } from "../middlewares.js";

function hey() {
  console.log("hey");
}
function hello() {
  console.log("hey");
}
// setRouteHandler(hello, "/users/4");

setRouteHandler(hey, "/users", "GET");

console.log(getRouteHandlers("/users", "GET"));

setRouteHandler(hey, "/users/:id/name");

console.log(getRouteHandlers("/users/4/name"));
