import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));
const port = Number(process.env.PORT || 4174);
const routes = {
  "/": "cookshare-android-user-app.html",
  "/app": "cookshare-android-user-app.html",
  "/admin": "cookshare-operator-admin-web.html"
};
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "127.0.0.1"}`);
    const requested = routes[url.pathname] || decodeURIComponent(url.pathname).replace(/^\/+/, "");
    const safe = normalize(requested).replace(/^(\.\.[\\/])+/, "");
    const file = join(root, safe);
    const info = await stat(file);
    if (!info.isFile() || !file.startsWith(root)) throw new Error("Not found");
    const body = await readFile(file);
    response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("페이지를 찾을 수 없습니다.");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`오늘한입 사용자 앱: http://127.0.0.1:${port}/app`);
  console.log(`오늘한입 운영자 콘솔: http://127.0.0.1:${port}/admin`);
});
