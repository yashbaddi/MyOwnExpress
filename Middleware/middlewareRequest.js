export class MiddlewareRequest {
  constructor(middlewareArray, method) {
    this.handlers = middlewareArray.middlewares;
    this.middlewarePos = 0;
    this.method = method;
  }
  next() {
    while (true) {
      this.middlewarePos++;
      if (
        this.handlers[this.middlewarePos].method === this.method ||
        this.handlers[this.middlewarePos].method === undefined
      ) {
        break;
      }
    }

    if (this.handlers[this.middlewarePos].handler === undefined) {
      return "Error 404";
    } else {
      return this.handlers[this.middlewarePos].handler;
    }
  }
}
