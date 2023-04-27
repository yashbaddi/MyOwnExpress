import { ownExpress } from "./index.js";

const app = ownExpress();

app.get("/", (req, res) => {
  console.log("logger", req);
  res.send("hey");
});

app.listen(2222);
