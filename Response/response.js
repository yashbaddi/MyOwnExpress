export class Response {
  constructor(httpResponse) {
    this.res = httpResponse;
    // return this.res;
  }
  send(data) {
    this.res.setHeader("Content-Type", "text/plain");
    this.res.writeHead(200);
    this.res.write(data);
    this.res.end();
  }
  render(data) {
    this.res.setHeader("Content-Type", "text/html");
    this.res.writeHead(200);
    this.res.write(data);
    this.res.end();
  }
  json(data) {
    this.res.setHeader("Content-Type", "application/json");
    this.res.writeHead(200);
    this.res.write(JSON.stringify(data));
    this.res.end();
  }
  sendStatus(code) {
    this.res.writeHead(code);
  }
}
