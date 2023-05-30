import fs from "fs";
import path from "path";

export default function staticMiddleware(dirPath) {
  return function (request, response, next) {
    const cwd = path.resolve();
    console.log(cwd);
    const filePath = path.join(cwd, dirPath, request.pathname);
    const stream = fs.createReadStream(filePath);
    stream.pipe(response);
  };
}
