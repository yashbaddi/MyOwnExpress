import fs from "fs";
import path from "path";
import http from "http";

export function createStaticServer(dirName) {
  const cwd = path.resolve();
  const server = http.createServer((req, res) => {
    console.log(cwd);
    const filePath = path.join(cwd, dirName, req.pathname);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
  return server;
}
