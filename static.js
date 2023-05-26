import fs from "fs";
import path from "path";
import http from "http";

export function createStaticServer(dirName) {
  const __dirname = path.resolve();
  const server = http.createServer((req, res) => {
    console.log(__dirname);
    const filePath = path.join(__dirname, dirName, req.url);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
  return server;
}
