import url from "node:url";

export class Request {
  constructor(httpRequest) {
    this.body = httpRequest.body;
    this.method = httpRequest.method;
    this.protocol = httpRequest.protocol;
    this.host = httpRequest.host;
    const urlobj = url.parse(httpRequest.url);
    Object.assign(this, urlobj);

    return this;
  }
}
