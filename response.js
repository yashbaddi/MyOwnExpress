export function response(res) {
  function send(data) {
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(200);
    res.write(data);
    res.end();
  }
  function render(data) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write(data);
    res.end();
  }
  function json(data) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.write(JSON.stringify(data));
    res.end();
  }
  function status(code) {
    res.writeHead(code);
  }

  return { send: send, render: render, json: json, status: status };
}
