import { MyOwnExpress } from "../index.js";

const app = new MyOwnExpress();

app.use("/", (req, res, next) => {
  res.send("hey");
  console.log("next", next);
  console.log("hey");
  next();
});

app.use("/", (req, res, next) => {
  console.log("hello");
  res.send("hello");
});

app.listen(8000);
