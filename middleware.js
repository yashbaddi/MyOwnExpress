export class Middleware {
  constructor(route, method) {
    this.handlers = route.middlewares;
    this.middlewarePos = 0;
    this.method = method;
  }
  next() {
    while (true) {
      let middlewareHandler = this.handlers[this.middlewarePos];
      if (
        middlewareHandler.method === this.method ||
        middlewareHandler.method === undefined
      ) {
        break;
      }
      this.middlewarePos++;
    }
    if (middlewareHandler.handler === undefined) {
      return "Error 404";
    } else {
      return this.middlewareHandler.handler;
    }
  }
}
