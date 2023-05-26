import { ownExpress } from "../Depreciated/index.js";
import { createStaticServer } from "../static.js";

// const app = createStaticServer("public");
const app = ownExpress();

// app.get("/", (req, res) => {
//   res.send("hey");
// });

app.listen(8000);
