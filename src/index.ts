import "dotenv/config";
import express from "express";
import path from "node:path";
import http from "node:http";
import { router } from "./router";

const app = express();
const server = http.createServer(app);
const port = 5001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(express.json());
app.use(router);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
