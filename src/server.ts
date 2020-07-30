import * as http from "http";
import * as fs from "fs";

function notFound(req: http.IncomingMessage, res: http.ServerResponse): void {
  if (!process.argv.includes("hide-not-found-warnings")) {
    console.warn("Not found", req.method, req.url);
  }
  res.writeHead(404);
  res.write("Not found");
  res.end();
}

function serveApp(res: http.ServerResponse): void {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(fs.readFileSync("index.html"));
  res.end();
}

function serveAsset(req: http.IncomingMessage, res: http.ServerResponse): void {
  if (req.url === undefined) throw new Error("Empty url");
  if (req.url === "/main.js") {
    res.setHeader("Content-Type", "text/javascript");
    res.write(fs.readFileSync("dist/main.js"));
  }
  res.end();
}

function requestHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): void {
  console.log(`${req.url} ${req.method}`);
  if (req.url === undefined) {
    notFound(req, res);
    return;
  }
  if (req.method === "PUT") {
    notFound(req, res);
  } else if (req.method === "POST") {
    notFound(req, res);
  } else if (req.method === "GET") {
    if (req.url === "/") {
      serveApp(res);
    } else if (
      req.url.startsWith("/assets/")
      || req.url === "/main.js"
    ) {
      serveAsset(req, res);
    }
  }
}

const server: http.Server = http.createServer(requestHandler);
console.log(`Starting server on port ${process.env.PORT || 9854}`);
server.listen(process.env.PORT || 9854);
