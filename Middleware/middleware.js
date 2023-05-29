export class Middleware {
  constructor(handler, method) {
    this.handler = handler;
    this.method = method;
  }
}
