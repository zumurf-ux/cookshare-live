import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));
const port = Number(process.env.PORT || 4174);
const host = process.env.HOST || "127.0.0.1";
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

const oauthStates = new Map();
const oauthTickets = new Map();
const providerSettings = {
  kakao: {
    name: "카카오",
    clientId: process.env.KAKAO_CLIENT_ID || "",
    clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    authorizeUrl: "https://kauth.kakao.com/oauth/authorize",
    tokenUrl: "https://kauth.kakao.com/oauth/token"
  },
  naver: {
    name: "네이버",
    clientId: process.env.NAVER_CLIENT_ID || "",
    clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    authorizeUrl: "https://nid.naver.com/oauth2.0/authorize",
    tokenUrl: "https://nid.naver.com/oauth2.0/token"
  }
};
const allowedReturnOrigins = new Set([
  "https://zumurf-ux.github.io",
  ...String(process.env.AUTH_ALLOWED_ORIGINS || "").split(",").map(value => value.trim()).filter(Boolean)
]);

function originFor(request) {
  return process.env.AUTH_PUBLIC_ORIGIN || `http://${request.headers.host || `127.0.0.1:${port}`}`;
}

function providerEnabled(provider) {
  const settings = providerSettings[provider];
  return Boolean(settings?.clientId && settings?.clientSecret);
}

function sendJson(response, status, payload, origin = "") {
  const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  response.writeHead(status, headers);
  response.end(JSON.stringify(payload));
}

function safeReturnUrl(value, request) {
  const fallback = new URL("/app", originFor(request));
  try {
    const target = new URL(value || fallback);
    const requestOrigin = new URL(originFor(request)).origin;
    if (target.origin !== requestOrigin && !allowedReturnOrigins.has(target.origin)) return fallback;
    return target;
  } catch {
    return fallback;
  }
}

function callbackUrl(provider, request) {
  return new URL(`/api/auth/${provider}/callback`, originFor(request)).toString();
}

function redirectWithResult(response, returnTo, params) {
  const destination = new URL(returnTo);
  Object.entries(params).forEach(([key, value]) => destination.searchParams.set(key, value));
  response.writeHead(302, { Location: destination.toString(), "Cache-Control": "no-store" });
  response.end();
}

async function exchangeKakao(settings, code, redirectUri) {
  const body = new URLSearchParams({ grant_type: "authorization_code", client_id: settings.clientId, client_secret: settings.clientSecret, redirect_uri: redirectUri, code });
  const tokenResponse = await fetch(settings.tokenUrl, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8", Accept: "application/json" }, body });
  if (!tokenResponse.ok) throw new Error("카카오 토큰 발급에 실패했습니다.");
  const token = await tokenResponse.json();
  const profileResponse = await fetch("https://kapi.kakao.com/v2/user/me", { headers: { Authorization: `Bearer ${token.access_token}`, Accept: "application/json" } });
  if (!profileResponse.ok) throw new Error("카카오 회원정보를 확인할 수 없습니다.");
  const profile = await profileResponse.json();
  return { provider: "kakao", id: String(profile.id), name: profile.kakao_account?.profile?.nickname || profile.properties?.nickname || "카카오 회원", email: profile.kakao_account?.email || "", phone: profile.kakao_account?.phone_number || "", avatar: profile.kakao_account?.profile?.profile_image_url || "" };
}

async function exchangeNaver(settings, code, state) {
  const tokenUrl = new URL(settings.tokenUrl);
  tokenUrl.search = new URLSearchParams({ grant_type: "authorization_code", client_id: settings.clientId, client_secret: settings.clientSecret, code, state }).toString();
  const tokenResponse = await fetch(tokenUrl, { headers: { Accept: "application/json" } });
  if (!tokenResponse.ok) throw new Error("네이버 토큰 발급에 실패했습니다.");
  const token = await tokenResponse.json();
  if (!token.access_token) throw new Error("네이버 인증 정보가 올바르지 않습니다.");
  const profileResponse = await fetch("https://openapi.naver.com/v1/nid/me", { headers: { Authorization: `Bearer ${token.access_token}`, Accept: "application/json" } });
  if (!profileResponse.ok) throw new Error("네이버 회원정보를 확인할 수 없습니다.");
  const payload = await profileResponse.json();
  const profile = payload.response || {};
  return { provider: "naver", id: String(profile.id), name: profile.name || profile.nickname || "네이버 회원", email: profile.email || "", phone: profile.mobile || "", avatar: profile.profile_image || "" };
}

function purgeExpiredAuthData() {
  const now = Date.now();
  for (const [key, value] of oauthStates) if (now - value.createdAt > 10 * 60 * 1000) oauthStates.delete(key);
  for (const [key, value] of oauthTickets) if (now - value.createdAt > 2 * 60 * 1000) oauthTickets.delete(key);
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "127.0.0.1"}`);
    purgeExpiredAuthData();

    if (url.pathname === "/api/auth/config") {
      const requestOrigin = request.headers.origin || "";
      const corsOrigin = allowedReturnOrigins.has(requestOrigin) || requestOrigin === new URL(originFor(request)).origin ? requestOrigin : "";
      return sendJson(response, 200, { providers: { kakao: providerEnabled("kakao"), naver: providerEnabled("naver") } }, corsOrigin);
    }

    if (url.pathname === "/api/auth/exchange") {
      const ticket = url.searchParams.get("ticket") || "";
      const payload = oauthTickets.get(ticket);
      const requestOrigin = request.headers.origin || "";
      const corsOrigin = allowedReturnOrigins.has(requestOrigin) || requestOrigin === new URL(originFor(request)).origin ? requestOrigin : "";
      if (!payload) return sendJson(response, 400, { error: "만료되었거나 유효하지 않은 로그인 요청입니다." }, corsOrigin);
      oauthTickets.delete(ticket);
      return sendJson(response, 200, payload.profile, corsOrigin);
    }

    const startMatch = url.pathname.match(/^\/api\/auth\/(kakao|naver)\/start$/);
    if (startMatch) {
      const provider = startMatch[1];
      const settings = providerSettings[provider];
      if (!providerEnabled(provider)) return sendJson(response, 503, { error: `${settings.name} 개발자 앱 키가 설정되지 않았습니다.` });
      const state = randomBytes(24).toString("hex");
      const returnTo = safeReturnUrl(url.searchParams.get("returnTo"), request).toString();
      oauthStates.set(state, { provider, returnTo, createdAt: Date.now() });
      const authorizeUrl = new URL(settings.authorizeUrl);
      authorizeUrl.searchParams.set("response_type", "code");
      authorizeUrl.searchParams.set("client_id", settings.clientId);
      authorizeUrl.searchParams.set("redirect_uri", callbackUrl(provider, request));
      authorizeUrl.searchParams.set("state", state);
      response.writeHead(302, { Location: authorizeUrl.toString(), "Cache-Control": "no-store" });
      return response.end();
    }

    const callbackMatch = url.pathname.match(/^\/api\/auth\/(kakao|naver)\/callback$/);
    if (callbackMatch) {
      const provider = callbackMatch[1];
      const state = url.searchParams.get("state") || "";
      const pending = oauthStates.get(state);
      if (!pending || pending.provider !== provider) return sendJson(response, 400, { error: "로그인 요청 상태가 올바르지 않습니다." });
      oauthStates.delete(state);
      if (url.searchParams.get("error")) return redirectWithResult(response, pending.returnTo, { social_provider: provider, social_error: "간편 로그인이 취소되었습니다." });
      const code = url.searchParams.get("code") || "";
      if (!code) return redirectWithResult(response, pending.returnTo, { social_provider: provider, social_error: "로그인 인가 코드를 받지 못했습니다." });
      try {
        const settings = providerSettings[provider];
        const profile = provider === "kakao" ? await exchangeKakao(settings, code, callbackUrl(provider, request)) : await exchangeNaver(settings, code, state);
        const ticket = randomBytes(32).toString("hex");
        oauthTickets.set(ticket, { profile, createdAt: Date.now() });
        return redirectWithResult(response, pending.returnTo, { social_provider: provider, social_ticket: ticket });
      } catch (error) {
        return redirectWithResult(response, pending.returnTo, { social_provider: provider, social_error: error.message || "간편 로그인 처리에 실패했습니다." });
      }
    }

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
}).listen(port, host, () => {
  console.log(`오늘한입 사용자 앱: http://127.0.0.1:${port}/app`);
  console.log(`오늘한입 운영자 콘솔: http://127.0.0.1:${port}/admin`);
});
