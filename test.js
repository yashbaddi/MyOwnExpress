import { ownExpress } from "./index.js";
import { createStaticServer } from "./static.js";

const app = createStaticServer("public");

// app.get("/", (req, res) => {
//   res.send("hey");
// });

app.listen(8000);
