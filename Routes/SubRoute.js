export class SubRoute {
  constructor(path) {
    this.path = path;
    this.hasQuery = false;
    this.childRoutes = {};
    this.middlewares = [];
  }
}
