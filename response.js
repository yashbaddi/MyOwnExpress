export function response(res) {
  function send(data) {
    res.writeHead(200, { "Content-Type": "plain/text" });
    res.write(data);
    res.end();
  }
  function render(data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
  }

  return { send: send, render: render };
}
