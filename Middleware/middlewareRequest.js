export class MiddlewareRequest {
  constructor(middlewareArray, request, response) {
    this.handlers = middlewareArray;
    this.request = request;
    this.response = response;
    this.middlewarePos = -1;
  }
  next() {
    console.log("this is next");
    while (true) {
      this.middlewarePos++;
      if (
        this.handlers[this.middlewarePos].method === this.request.method ||
        this.handlers[this.middlewarePos].method === undefined
      ) {
        break;
      }
    }

    if (this.handlers[this.middlewarePos].handler === undefined) {
      return "Error 404";
    } else {
      return this.handlers[this.middlewarePos].handler(
        this.request,
        this.response,
        this.next.bind(this)
      );
    }
  }
}
