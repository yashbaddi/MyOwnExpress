import request from "supertest";
import { MyOwnExpress } from "../index.js";

describe("MyOwnExpress Routing", () => {
  let app;
  let server;

  beforeEach(() => {
    app = new MyOwnExpress();
  });

  afterEach((done) => {
    if (app.server.listening) {
      app.server.close(done);
    } else {
      done();
    }
  });

  test("GET / should return 200 and text", async () => {
    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    const response = await request(app.server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
    expect(response.header["content-type"]).toContain("text/plain");
  });

  test("POST /data should return 200 and JSON", async () => {
    app.post("/data", (req, res) => {
      res.json({ success: true, message: "Received" });
    });

    const response = await request(app.server).post("/data");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, message: "Received" });
    expect(response.header["content-type"]).toContain("application/json");
  });

  test("app.use() middleware should be executed in order", async () => {
    const stack = [];
    app.use((req, res, next) => {
      stack.push(1);
      next();
    });
    app.use((req, res, next) => {
      stack.push(2);
      res.send("Done");
    });

    await request(app.server).get("/");
    expect(stack).toEqual([1, 2]);
  });

  test("Route-specific middleware should execute", async () => {
    let middlewareCalled = false;
    app.get(
      "/special",
      (req, res, next) => {
        middlewareCalled = true;
        next();
      },
      (req, res) => {
        res.send("Special Page");
      },
    );

    const response = await request(app.server).get("/special");
    expect(middlewareCalled).toBe(true);
    expect(response.text).toBe("Special Page");
  });

  test("Different methods on same path should trigger correct handlers", async () => {
    app.get("/method", (req, res) => res.send("GET"));
    app.post("/method", (req, res) => res.send("POST"));

    const resGet = await request(app.server).get("/method");
    expect(resGet.text).toBe("GET");

    const resPost = await request(app.server).post("/method");
    expect(resPost.text).toBe("POST");
  });

  test("Nested routes matching", async () => {
    app.get("/api/v1/users", (req, res) => {
      res.json([{ id: 1 }]);
    });

    const response = await request(app.server).get("/api/v1/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1 }]);
  });
});

describe("MyOwnExpress Response Methods", () => {
  let app;

  beforeEach(() => {
    app = new MyOwnExpress();
  });

  test("res.render should send HTML", async () => {
    app.get("/html", (req, res) => {
      res.render("<h1>Hello</h1>");
    });

    const response = await request(app.server).get("/html");
    expect(response.header["content-type"]).toContain("text/html");
    expect(response.text).toBe("<h1>Hello</h1>");
  });

  test("res.sendStatus should set correct status code", async () => {
    app.get("/error", (req, res) => {
      res.sendStatus(404);
      res.res.end(); // Direct end since sendStatus in current impl only writes head
    });

    const response = await request(app.server).get("/error");
    expect(response.status).toBe(404);
  });
});
