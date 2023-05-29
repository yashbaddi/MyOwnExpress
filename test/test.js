import { MyOwnExpress } from "../index.js";

const app = new MyOwnExpress();

app.use("/", (req, res, next) => {
  console.log("hey");
  console.log(next);
  next();
});

app.use("/", (req, res, next) => {
  console.log("hello");
  res.send("hey");
});

app.listen(8000);
