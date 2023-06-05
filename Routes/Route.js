export class Route {
  constructor(path) {
    this.path = path;
    this.hasQuery = false;
    this.childRoutes = {};
    this.middlewares = [];
  }
}
