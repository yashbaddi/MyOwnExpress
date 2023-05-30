import url from "node:url";

export class Request {
  constructor(request) {
    this.body = request.body;
    this.method = request.method;
    this.protocol = request.protocol;
    this.host = request.host;
    const urlobj = url.parse(request.url);
    Object.assign(this, urlobj);

    return this;
  }
}
