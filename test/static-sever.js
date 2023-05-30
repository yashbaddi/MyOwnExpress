import { MyOwnExpress } from "../index.js";

const app = new MyOwnExpress();

app.use(MyOwnExpress.static("Public"));

app.listen(8000);
