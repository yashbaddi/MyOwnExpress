import { getRoutes, setRoutes } from "../routes.js";

function hey() {
  console.log("hey");
}

setRoutes(hey, "/users/:id/name");

// getRoutes("/users")();
