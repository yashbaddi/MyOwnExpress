import { getRoutes, setRoutes } from "../routes.old.js";

function hey() {
  console.log("hey");
}

setRoutes("/users", hey);

getRoutes("/users")();
