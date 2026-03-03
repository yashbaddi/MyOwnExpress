# MyOwnExpress 🚀

A lightweight, minimal, and fast web framework for Node.js, built from the ground up to mirror the functionality of Express.js. This project was developed to understand the inner workings of middleware patterns, routing algorithms, and HTTP request/response handling in Node.js.

## ✨ Features

- **Express-like API**: Familiar methods like `app.use()`, `app.get()`, `app.post()`, and `app.listen()`.
- **Middleware Engine**: Sequential execution of handlers using the `next()` pattern.
- **Hierarchical Routing**: Support for nested routes and path-based middleware.
- **Static File Serving**: Built-in middleware to serve assets effortlessly.
- **Refined Req/Res**: Simplified wrappers for Node's native HTTP objects with helper methods like `.json()`, `.send()`, and `.render()`.
- **ES Modules**: Modern codebase using ESM for better performance and maintainability.

---

## 🚀 Quick Start

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yashbaddi/MyOwnExpress.git
cd MyOwnExpress
npm install
```

### 2. Create your first server

Create a file named `server.js`:

```javascript
import { MyOwnExpress } from "./index.js";

const app = new MyOwnExpress();

// Middleware example
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to MyOwnExpress!");
});

// JSON API route
app.get("/api/user", (req, res) => {
  res.json({ id: 1, name: "John Doe" });
});

// Start the server
app.listen(8000);
console.log("Server running on http://localhost:8000");
```

---

## 📖 API Documentation

### `app.use([path], ...handlers)`

Registers middleware. If path is omitted, it defaults to `/`. Handlers receive `(req, res, next)`.

### `app.get()`, `app.post()`, `app.put()`, `app.delete()`

Registers route-specific handlers for specific HTTP methods.

### `res.send(data)`

Sends a plain text response.

### `res.json(object)`

Sends a JSON response with the correct `Content-Type`.

### `res.render(html)`

Sends an HTML response.

### `MyOwnExpress.static(dirPath)`

Serves static files from the specified directory.

---

## 🛠 Project Structure

```text
MyOwnExpress/
├── Middleware/          # Middleware engine and static file logic
├── Request/             # HTTP Request wrapper
├── Response/            # HTTP Response wrapper
├── Routes/              # Routing logic and tree-based path matching
├── test/                # Test suites for routes and middleware
├── index.js             # Main entry point (MyOwnExpress class)
└── utils.js             # Shared utilities and server handlers
```

---

## 🧪 Running Tests

The project includes basic tests to verify routing and middleware functionality.

```bash
npm test
```

---

## 📝 Roadmap

- [ ] Cleanup Legacy Code
- [ ] Support for Route Parameters (e.g., `/user/:id`)
- [ ] Body Parsing Middleware (JSON/URL-encoded)
- [ ] Support for Routers (Modular routing)
- [ ] Error Handling Middleware

## ⚖️ License

Distributed under the ISC License. See `LICENSE` for more information.

---

Developed with ❤️ by [Yash Baddi](https://github.com/yashbaddi)
