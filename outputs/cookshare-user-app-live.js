(() => {
  "use strict";

  const STORAGE_KEY = "cookshare.live.state.v3";
  const ADMIN_KEY = "cookshare.admin.state.v1";
  const REPORT_KEY = "cookshare.reports.v1";
  const ACCOUNTS_KEY = "cookshare.accounts.v1";
  const SESSION_KEY = "cookshare.session.v1";
  const ACCOUNT_STATE_PREFIX = "cookshare.live.account.v1.";
  const iconPaths = {
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    user: '<path d="M19 21a7 7 0 0 0-14 0"/><circle cx="12" cy="7" r="4"/>',
    chef: '<path d="M8 9a4 4 0 1 1 7.7-1.5A3.5 3.5 0 0 1 17 14H7a3.5 3.5 0 0 1 1-6.8"/><path d="M8 14v5h8v-5"/>',
    lunch: '<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M8 7V5h8v2M4 12h16M12 12v7"/>',
    leaf: '<path d="M19 4C11 4 6 8 6 14c0 3 2 5 5 5 6 0 8-7 8-15Z"/><path d="M5 20c2-5 6-9 11-12"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    cart: '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6"/>',
    heart: '<path d="M20.8 5.7a5.4 5.4 0 0 0-7.6 0L12 6.9l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 22l8.8-8.7a5.4 5.4 0 0 0 0-7.6Z"/>',
    comment: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4Z"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    book: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2Z"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    camera: '<path d="M4 7h4l2-3h4l2 3h4v13H4Z"/><circle cx="12" cy="13" r="4"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    archive: '<path d="M4 7h16v14H4Z"/><path d="M3 3h18v4H3ZM9 11h6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    box: '<path d="m4 7 8-4 8 4-8 4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>',
    point: '<circle cx="12" cy="12" r="9"/><path d="M9 8h4a3 3 0 0 1 0 6H9V8Zm0 6v3M9 11h5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/>',
    fire: '<path d="M12 22c4 0 7-3 7-7 0-5-4-7-4-12-4 3-8 7-8 12 0 4 2 7 5 7Z"/><path d="M10 19c-1-3 1-5 3-7 0 3 2 4 1 7"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7M10 11v6M14 11v6"/>'
  };

  const recipes = [
    { id: "r1", title: "들깨 두유 크림 파스타", author: "민지의 집밥", category: "면", cuisine: "양식", time: "15분", likes: 128, icon: "leaf", image: "assets/recipe-tomato-pasta.jpg" },
    { id: "r2", title: "제철 무 들기름 솥밥", author: "주말식탁", category: "밥", cuisine: "한식", time: "35분", likes: 94, icon: "lunch", image: "assets/recipe-ricotta-salad.jpg" },
    { id: "r3", title: "애호박 명란 덮밥", author: "도시락 연구소", category: "밥", cuisine: "일식", time: "20분", likes: 1220, icon: "chef", image: "assets/recipe-shrimp-taco.jpg" },
    { id: "r4", title: "매콤 두부 강정", author: "15분 요리", category: "반찬", cuisine: "중식", time: "25분", likes: 986, icon: "fire", image: "assets/recipe-cheese-burger.jpg" },
    { id: "r5", title: "봄동 된장국", author: "제철 한 끼", category: "탕·찌개", cuisine: "한식", time: "30분", likes: 734, icon: "leaf", image: "assets/recipe-onion-soup.jpg" },
    { id: "r6", title: "바나나 오트밀 쿠키", author: "민지의 집밥", category: "간식", cuisine: "기타", time: "40분", likes: 612, icon: "clock", image: "assets/recipe-oat-cookie.jpg" }
  ];

  const products = [
    { id: "p1", name: "강원도 제철 쌈채소 600g", price: 12900, category: "채소", detail: "새벽 수확 후 산지에서 바로 보내는 친환경 모둠 쌈채소", icon: "leaf", image: "assets/recipe-ricotta-salad.jpg" },
    { id: "p2", name: "자유방목 유정란 20구", price: 10800, category: "신선", detail: "생산 이력을 확인할 수 있는 난각번호 1번 유정란", icon: "lunch", image: "assets/recipe-egg-toast.jpg" },
    { id: "p3", name: "국산콩 무첨가 두유 12팩", price: 18500, category: "가공", detail: "국산콩과 물만 사용한 담백한 무첨가 두유", icon: "point", image: "assets/recipe-oat-cookie.jpg" },
    { id: "p4", name: "통영산 손질 굴 500g", price: 16900, category: "수산", detail: "세척과 손질을 마쳐 바로 요리에 사용할 수 있는 굴", icon: "shield", image: "assets/recipe-onion-soup.jpg" }
  ];

  const initialState = {
    profile: { accountId: "", name: "한끼연구소", handle: "one_meal_lab", location: "서울 마포구", points: 12450 },
    liked: {}, saved: {}, hidden: {}, following: { "민지의 집밥": true, "주말식탁": true }, joinedChallenge: false, cart: {}, orders: [], posts: [], drafts: [],
    pointHistory: [{ id: "PT-240801", type: "적립", amount: 100, reason: "출석 참여", date: "2026. 8. 9. 09:00" }],
    comments: { r1: [{ id: "c1", author: "소소한밥상", body: "들깨가루 양을 조금 늘려도 맛있어요.", time: "오전 10:24" }] },
    notifications: [
      { id: "n1", title: "챌린지 마감 안내", body: "두부 한 끼 챌린지가 6일 후 마감됩니다.", read: false },
      { id: "n2", title: "댓글 알림", body: "저장한 파스타 레시피에 새 댓글이 등록되었습니다.", read: false },
      { id: "n3", title: "포인트 적립", body: "출석 참여로 100포인트가 적립되었습니다.", read: false }
    ],
    settings: { notifications: true, marketing: false, privateProfile: false }
  };

  const challengeBannerRules = [
    { keywords: ["두부", "콩"], image: "assets/challenge-tofu-pexels-5848480.jpg", position: "50% 38%" },
    { keywords: ["파스타", "면", "국수"], image: "assets/recipe-tomato-pasta.jpg", position: "50% 52%" },
    { keywords: ["밥", "덮밥", "솥밥", "볶음밥"], image: "assets/recipe-shrimp-taco.jpg", position: "50% 55%" },
    { keywords: ["국", "수프", "찌개", "탕"], image: "assets/recipe-onion-soup.jpg", position: "50% 50%" },
    { keywords: ["채소", "샐러드", "건강", "다이어트"], image: "assets/recipe-ricotta-salad.jpg", position: "50% 52%" },
    { keywords: ["빵", "토스트", "브런치", "샌드위치"], image: "assets/recipe-egg-toast.jpg", position: "50% 48%" },
    { keywords: ["쿠키", "디저트", "간식", "베이킹"], image: "assets/recipe-oat-cookie.jpg", position: "50% 55%" },
    { keywords: ["새우", "타코", "해산물"], image: "assets/recipe-shrimp-taco.jpg", position: "50% 52%" },
    { keywords: ["버거", "고기", "치즈"], image: "assets/recipe-cheese-burger.jpg", position: "50% 52%" }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const money = value => `${Number(value).toLocaleString("ko-KR")}원`;
  const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true" viewBox="0 0 24 24">${iconPaths[name] || iconPaths.image}</svg>`;
  const recipeTypes = ["밥", "면", "반찬", "탕·찌개", "간식"];
  const cuisineTypes = ["양식", "일식", "한식", "중식", "기타"];
  const normalizeRecipeType = value => ({ 밥요리: "밥", 면요리: "면", 국물: "탕·찌개" })[value] || value || "기타";
  const normalizeCuisine = value => cuisineTypes.includes(value) ? value : "기타";
  const defaultSystemSettings = { registration: true, posting: true, market: true, maintenance: false };
  const defaultAdminUsers = [
    { id: "u1", name: "한끼연구소", handle: "one_meal_lab", location: "서울 마포구", status: "정상" },
    { id: "u2", name: "민지의 집밥", handle: "minji_table", location: "경기 성남시", status: "정상" },
    { id: "u3", name: "주말식탁", handle: "weekend_table", location: "서울 송파구", status: "정상" }
  ];

  function normalizeState(saved) {
    if (!saved) return structuredClone(initialState);
    return {
      ...structuredClone(initialState),
      ...saved,
      profile: { ...initialState.profile, ...(saved.profile || {}) },
      liked: { ...initialState.liked, ...(saved.liked || {}) },
      saved: { ...initialState.saved, ...(saved.saved || {}) },
      hidden: { ...initialState.hidden, ...(saved.hidden || {}) },
      following: { ...initialState.following, ...(saved.following || {}) },
      cart: saved.cart && typeof saved.cart === "object" ? saved.cart : {},
      orders: Array.isArray(saved.orders) ? saved.orders : [],
      posts: Array.isArray(saved.posts) ? saved.posts : [],
      drafts: Array.isArray(saved.drafts) ? saved.drafts : [],
      notifications: Array.isArray(saved.notifications) ? saved.notifications : structuredClone(initialState.notifications),
      comments: { ...structuredClone(initialState.comments), ...(saved.comments || {}) },
      settings: { ...initialState.settings, ...(saved.settings || {}) },
      pointHistory: Array.isArray(saved.pointHistory) ? saved.pointHistory : structuredClone(initialState.pointHistory)
    };
  }

  function loadState(key = STORAGE_KEY) {
    try {
      return normalizeState(JSON.parse(localStorage.getItem(key)));
    } catch { return structuredClone(initialState); }
  }

  function loadAdminState() {
    try {
      const saved = JSON.parse(localStorage.getItem(ADMIN_KEY)) || {};
      return { settings: { ...defaultSystemSettings, ...(saved.settings || {}) }, users: Array.isArray(saved.users) ? saved.users : structuredClone(defaultAdminUsers) };
    } catch { return { settings: { ...defaultSystemSettings }, users: structuredClone(defaultAdminUsers) }; }
  }

  function loadAccounts() {
    try { const saved = JSON.parse(localStorage.getItem(ACCOUNTS_KEY)); return Array.isArray(saved) ? saved : []; }
    catch { return []; }
  }

  function saveAccounts() { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); }
  function accountStateKey(id) { return `${ACCOUNT_STATE_PREFIX}${id}`; }
  function currentAccount() { const id = localStorage.getItem(SESSION_KEY); return accounts.find(account => account.id === id) || null; }
  function normalizeHandle(value) { return String(value || "").trim().replace(/^@/, "").toLowerCase(); }
  function normalizePhone(value) { const digits = String(value || "").replace(/\D/g, ""); return digits.startsWith("82") ? `0${digits.slice(2)}` : digits; }
  async function hashPin(value) { const bytes = new TextEncoder().encode(`today-one-bite:${value}`); const digest = await crypto.subtle.digest("SHA-256", bytes); return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join(""); }

  const hadLegacyState = localStorage.getItem(STORAGE_KEY) !== null;
  let accounts = loadAccounts();
  let state = loadState();
  let adminState = loadAdminState();
  let currentScreen = "home";
  let currentRecipeFilter = "전체";
  let currentCuisineFilter = "전체";
  let currentFeedFilter = "recommended";
  let currentAuthMode = "login";
  let toastTimer;
  let challengeBannerObserver;
  const socialProviderNames = { kakao: "카카오", naver: "네이버" };

  function authApiBase() {
    return String(window.COOKSHARE_AUTH_CONFIG?.apiBase || "").replace(/\/$/, "");
  }

  function cleanSocialParams() {
    const url = new URL(location.href);
    ["social_ticket", "social_provider", "social_error"].forEach(key => url.searchParams.delete(key));
    history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  async function startSocialAuth(provider) {
    const providerName = socialProviderNames[provider];
    const apiBase = authApiBase();
    if (!providerName) return;
    if (!apiBase) return setAuthStatus(`${providerName} 로그인을 사용하려면 운영 서버의 OAuth 연동 설정이 필요합니다.`);
    try {
      const response = await fetch(`${apiBase}/api/auth/config`, { headers: { Accept: "application/json" } });
      const config = response.ok ? await response.json() : null;
      if (!config?.providers?.[provider]) return setAuthStatus(`${providerName} 개발자 앱 키가 아직 설정되지 않았습니다.`);
      const returnUrl = new URL(location.href);
      ["social_ticket", "social_provider", "social_error"].forEach(key => returnUrl.searchParams.delete(key));
      location.assign(`${apiBase}/api/auth/${provider}/start?returnTo=${encodeURIComponent(returnUrl.toString())}`);
    } catch {
      setAuthStatus("간편 로그인 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  function uniqueSocialHandle(provider, providerId) {
    const stem = `${provider}_${String(providerId).replace(/[^a-z0-9]/gi, "").toLowerCase().slice(-12) || Math.random().toString(36).slice(2, 10)}`;
    let handle = stem.slice(0, 24);
    let index = 1;
    while (accounts.some(account => account.handle === handle)) handle = `${stem.slice(0, 20)}_${index++}`;
    return handle;
  }

  async function consumeSocialCallback() {
    const params = new URLSearchParams(location.search);
    const socialError = params.get("social_error");
    const ticket = params.get("social_ticket");
    if (!socialError && !ticket) return false;
    if (socialError) {
      cleanSocialParams();
      renderAuth("login");
      setAuthStatus(socialError);
      return true;
    }
    const apiBase = authApiBase();
    if (!apiBase) {
      cleanSocialParams();
      renderAuth("login");
      setAuthStatus("간편 로그인 서버 설정을 확인해 주세요.");
      return true;
    }
    try {
      const response = await fetch(`${apiBase}/api/auth/exchange?ticket=${encodeURIComponent(ticket)}`, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("exchange_failed");
      const profile = await response.json();
      let account = accounts.find(item => item.provider === profile.provider && item.providerId === String(profile.id));
      const isNew = !account;
      if (isNew && !adminState.settings.registration) throw new Error("registration_closed");
      if (!account) {
        account = { id: uid(`account-${profile.provider}`), provider: profile.provider, providerId: String(profile.id), name: profile.name || `${socialProviderNames[profile.provider]} 회원`, handle: uniqueSocialHandle(profile.provider, profile.id), phone: normalizePhone(profile.phone), email: profile.email || "", avatar: profile.avatar || "", pinHash: "", needsPin: false, location: "지역 미설정", createdAt: new Date().toISOString() };
        accounts.push(account);
      } else {
        account.name = profile.name || account.name;
        account.phone = normalizePhone(profile.phone) || account.phone;
        account.email = profile.email || account.email;
        account.avatar = profile.avatar || account.avatar;
      }
      saveAccounts();
      let nextState = localStorage.getItem(accountStateKey(account.id)) ? loadState(accountStateKey(account.id)) : structuredClone(initialState);
      if (isNew) {
        nextState.profile = { ...nextState.profile, accountId: account.id, name: account.name, handle: account.handle, location: account.location, points: 500 };
        nextState.pointHistory = [{ id: uid("PT"), type: "적립", amount: 500, reason: `${socialProviderNames[profile.provider]} 간편가입 웰컴 포인트`, date: new Date().toLocaleString("ko-KR") }];
        nextState.notifications = [{ id: uid("notification"), title: "오늘한입 가입 완료", body: `${socialProviderNames[profile.provider]} 계정으로 간편가입이 완료되었습니다.`, read: false }];
      }
      cleanSocialParams();
      activateAccount(account, nextState);
      toast(isNew ? `${socialProviderNames[profile.provider]} 간편가입이 완료되었습니다.` : `${socialProviderNames[profile.provider]} 계정으로 로그인했습니다.`);
      return true;
    } catch (error) {
      cleanSocialParams();
      renderAuth("login");
      setAuthStatus(error.message === "registration_closed" ? "현재 신규 회원가입이 일시 중지되었습니다." : "간편 로그인 확인에 실패했습니다. 다시 시도해 주세요.");
      return true;
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const account = currentAccount();
    if (account) localStorage.setItem(accountStateKey(account.id), JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("cookshare-state-changed"));
    renderCounts();
  }

  function registerAdminUser(account) {
    let stored;
    try { stored = JSON.parse(localStorage.getItem(ADMIN_KEY)) || {}; } catch { stored = {}; }
    const users = Array.isArray(stored.users) ? stored.users : structuredClone(defaultAdminUsers);
    const index = users.findIndex(user => user.id === account.id || user.handle === account.handle);
    const user = { id: account.id, name: account.name, handle: account.handle, location: account.location || "지역 미설정", status: index >= 0 ? users[index].status || "정상" : "정상" };
    if (index >= 0) users[index] = { ...users[index], ...user }; else users.unshift(user);
    stored.users = users;
    stored.settings = { ...defaultSystemSettings, ...(stored.settings || {}) };
    localStorage.setItem(ADMIN_KEY, JSON.stringify(stored));
    adminState = loadAdminState();
  }

  function setAuthStatus(message = "") {
    const node = $("[data-auth-status]");
    if (node) node.textContent = message;
  }

  function renderAuth(mode = currentAuthMode) {
    const root = $("[data-auth-root]");
    const signupAllowed = adminState.settings.registration;
    if (mode === "signup" && !signupAllowed) mode = "login";
    currentAuthMode = mode;
    root.hidden = false;
    document.body.classList.add("auth-required");
    $$('[data-auth-mode]').forEach(button => {
      const active = button.dataset.authMode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
      if (button.dataset.authMode === "signup") button.disabled = !signupAllowed;
    });
    $("[data-auth-body]").innerHTML = mode === "signup" ? `<form class="auth-form" data-signup-form><div class="field"><label for="signup-name">닉네임</label><input id="signup-name" name="name" maxlength="20" required autocomplete="name" placeholder="오늘한입에서 사용할 이름"></div><div class="field"><label for="signup-handle">사용자 ID</label><input id="signup-handle" name="handle" minlength="3" maxlength="24" required pattern="[a-z0-9_]+" autocapitalize="none" autocomplete="username" placeholder="영문 소문자, 숫자, 밑줄"></div><div class="field"><label for="signup-phone">휴대폰 번호</label><input id="signup-phone" name="phone" type="tel" inputmode="numeric" required autocomplete="tel" placeholder="01012345678"></div><div class="field"><label for="signup-pin">로그인 PIN</label><input id="signup-pin" name="pin" type="password" inputmode="numeric" minlength="4" maxlength="4" required pattern="[0-9]{4}" autocomplete="new-password" placeholder="숫자 4자리"></div><label class="auth-check"><input name="terms" type="checkbox" required>서비스 이용약관과 개인정보 처리 안내에 동의합니다.</label><button class="primary-button full-button" type="submit">간편 회원가입</button></form><p class="auth-help">가입 후 이 기기에서는 로그인 상태가 유지됩니다.</p>` : `<form class="auth-form" data-login-form><div class="field"><label for="login-id">사용자 ID 또는 휴대폰</label><input id="login-id" name="identifier" required autocomplete="username" placeholder="사용자 ID 또는 휴대폰 번호"></div><div class="field"><label for="login-pin">로그인 PIN</label><input id="login-pin" name="pin" type="password" inputmode="numeric" minlength="4" maxlength="4" required pattern="[0-9]{4}" autocomplete="current-password" placeholder="숫자 4자리"></div><button class="primary-button full-button" type="submit">로그인</button></form><p class="auth-help">PIN을 잊었다면 운영자에게 계정 확인을 요청해 주세요.</p>`;
    const authBody = $("[data-auth-body]");
    const localAuthMarkup = authBody.innerHTML;
    const intro = mode === "signup" ? `<div class="auth-intro"><strong>간편하게 시작하세요</strong><p>카카오 또는 네이버 계정으로 별도 비밀번호 없이 가입합니다.</p></div>` : `<div class="auth-intro"><strong>간편 로그인</strong><p>가입할 때 사용한 계정으로 안전하게 로그인하세요.</p></div>`;
    authBody.innerHTML = `${intro}<div class="social-auth"><button class="social-button kakao" type="button" data-social-auth="kakao"><span class="social-mark" aria-hidden="true">K</span><strong>카카오로 시작하기</strong></button><button class="social-button naver" type="button" data-social-auth="naver"><span class="social-mark" aria-hidden="true">N</span><strong>네이버로 시작하기</strong></button></div><p class="social-terms">계속하면 오늘한입 이용약관과 개인정보 처리 안내에 동의한 것으로 봅니다.</p><div class="auth-divider"><span>또는</span></div><details class="local-auth"><summary>${mode === "signup" ? "ID로 직접 가입" : "기존 ID로 로그인"}</summary><div class="local-auth-body">${localAuthMarkup}</div></details>`;
    setAuthStatus(!signupAllowed ? "현재 신규 회원가입이 일시 중지되었습니다." : "");
    $("[data-auth-body] input")?.focus();
  }

  function hideAuth() {
    $("[data-auth-root]").hidden = true;
    document.body.classList.remove("auth-required");
    setAuthStatus();
  }

  function activateAccount(account, nextState) {
    localStorage.setItem(SESSION_KEY, account.id);
    state = nextState || loadState(accountStateKey(account.id));
    state.profile = { ...state.profile, accountId: account.id, name: account.name, handle: account.handle, location: account.location || state.profile.location };
    registerAdminUser(account);
    saveState();
    hideAuth();
    renderAll();
    navigate("home");
  }

  function initializeAuth() {
    let account = currentAccount();
    if (!account && !accounts.length && hadLegacyState) {
      account = { id: uid("account"), name: state.profile.name, handle: state.profile.handle, phone: "", pinHash: "", needsPin: true, location: state.profile.location, createdAt: new Date().toISOString() };
      accounts.push(account);
      saveAccounts();
      localStorage.setItem(SESSION_KEY, account.id);
      state.profile.accountId = account.id;
      localStorage.setItem(accountStateKey(account.id), JSON.stringify(state));
      registerAdminUser(account);
    }
    if (account) {
      const accountState = localStorage.getItem(accountStateKey(account.id)) ? loadState(accountStateKey(account.id)) : state;
      state = accountState;
      state.profile = { ...state.profile, accountId: account.id, name: account.name, handle: account.handle, location: account.location || state.profile.location };
      saveState();
      hideAuth();
      return;
    }
    renderAuth(accounts.length ? "login" : "signup");
  }

  function addPointHistory(type, amount, reason) {
    const safeAmount = Math.max(0, Number(amount) || 0);
    if (!safeAmount) return;
    state.pointHistory ||= [];
    state.pointHistory.unshift({ id: uid("PT"), type, amount: safeAmount, reason, date: new Date().toLocaleString("ko-KR") });
    state.profile.points = Math.max(0, Number(state.profile.points || 0) + (type === "적립" ? safeAmount : -safeAmount));
  }

  function accountStatus() {
    return adminState.users.find(user => user.handle === state.profile.handle)?.status || "정상";
  }

  function serviceBlocked(feature) {
    if (adminState.settings.maintenance) { toast("현재 서비스 점검 중입니다."); return true; }
    if (accountStatus() !== "정상") { toast("계정 이용이 제한되어 있습니다."); return true; }
    if (feature === "posting" && !adminState.settings.posting) { toast("콘텐츠 등록이 일시 중지되었습니다."); return true; }
    if (feature === "market" && !adminState.settings.market) { toast("마켓 주문이 일시 중지되었습니다."); return true; }
    return false;
  }

  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach(node => { if (!node.querySelector("svg")) node.innerHTML = icon(node.dataset.icon); });
  }

  function applyChallengeBannerImage() {
    const banner = $("[data-challenge-banner]");
    if (!banner) return;
    const copy = [banner.querySelector(".eyebrow"), banner.querySelector("h2"), banner.querySelector("p:not(.eyebrow)")]
      .map(node => node?.textContent || "")
      .join(" ");
    const rule = challengeBannerRules.find(item => item.keywords.some(keyword => copy.includes(keyword))) || challengeBannerRules[0];
    const imageUrl = new URL(rule.image, document.baseURI).href;
    banner.style.setProperty("--challenge-image", `url("${imageUrl}")`);
    banner.style.setProperty("--challenge-position", rule.position);
  }

  function toast(message) {
    const node = $("[data-toast]");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 2200);
  }

  function navigate(screen) {
    if (adminState.settings.maintenance && screen !== "profile") { toast("서비스 점검 중에는 내 정보만 확인할 수 있습니다."); screen = "profile"; }
    currentScreen = screen;
    $$(".screen").forEach(node => node.classList.toggle("active", node.dataset.screen === screen));
    $$(".nav-button").forEach(node => node.classList.toggle("active", node.dataset.nav === screen));
    $(".app-main").scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => window.scrollTo(0, 0));
    if (screen === "recipes") renderRecipes();
    if (screen === "market") renderProducts();
    if (screen === "profile") renderCounts();
  }

  function openSheet(title, content) {
    $("[data-sheet-title]").textContent = title;
    $("[data-sheet-body]").innerHTML = content;
    const root = $("[data-sheet-root]");
    root.classList.add("active");
    root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    hydrateIcons(root);
    root.querySelector("button")?.focus();
  }

  function closeSheet() {
    const root = $("[data-sheet-root]");
    root.classList.remove("active");
    root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function allPosts() {
    const base = [
      { ...recipes[0], author: "민지의 집밥", handle: "@minji_table", title: "버터 없이도 고소한 들깨 두유 크림 파스타", body: "두유와 들깨가루로 완성한 15분 파스타입니다. 불을 약하게 줄인 뒤 소스를 섞으면 더 부드럽습니다.", likes: 128, createdAt: "2026-08-14T11:20:00+09:00" },
      { ...recipes[1], author: "주말식탁", handle: "@weekend_table", title: "무 하나로 끝내는 들기름 솥밥", body: "제철 무를 굵게 채 썰고 들기름을 둘러 은근하게 익혔어요. 양념장은 간장과 쪽파만 넣었습니다.", likes: 94, createdAt: "2026-08-13T18:40:00+09:00" }
    ];
    return [...state.posts, ...base].filter(post => !state.hidden[post.id]);
  }

  function allRecipes() {
    return [...state.posts, ...recipes].filter(recipe => !state.hidden[recipe.id]);
  }

  function renderFeed() {
    const feed = $("[data-feed]");
    let posts = allPosts();
    if (currentFeedFilter === "following") posts = posts.filter(post => post.author === state.profile.name || state.following[post.author]);
    if (currentFeedFilter === "latest") posts = [...posts].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    if (currentFeedFilter === "recommended") posts = [...posts].sort((a, b) => (Number(b.likes) + (state.liked[b.id] ? 1 : 0)) - (Number(a.likes) + (state.liked[a.id] ? 1 : 0)));
    $$('[data-feed-filter]').forEach(node => {
      const active = node.dataset.feedFilter === currentFeedFilter;
      node.classList.toggle("active", active);
      node.setAttribute("aria-selected", String(active));
    });
    feed.innerHTML = posts.length ? posts.map(post => {
      const liked = Boolean(state.liked[post.id]);
      const saved = Boolean(state.saved[post.id]);
      const commentCount = (state.comments[post.id] || []).length;
      return `<article class="card post" data-post-id="${esc(post.id)}">
        <header class="post-head"><div class="avatar">${esc(post.author.slice(0, 2))}</div><div class="post-author"><strong>${esc(post.author)}</strong><span>${esc(post.handle || "@one_meal")}</span></div><button class="icon-button" type="button" data-action="post-menu" data-id="${esc(post.id)}" aria-label="게시물 메뉴">${icon("more")}</button></header>
        <button class="post-media" type="button" data-action="recipe-detail" data-id="${esc(post.id)}" aria-label="${esc(post.title)} 상세 보기">${post.image ? `<img src="${esc(post.image)}" alt="${esc(post.title)}">` : icon(post.icon || "image", "icon icon-lg")}</button>
        <div class="post-actions"><button class="icon-button ${liked ? "liked" : ""}" type="button" data-action="like" data-id="${esc(post.id)}" aria-label="좋아요">${icon("heart")}</button><button class="icon-button" type="button" data-action="comments" data-id="${esc(post.id)}" aria-label="댓글 ${commentCount}개">${icon("comment")}</button><button class="icon-button save ${saved ? "saved" : ""}" type="button" data-action="save" data-id="${esc(post.id)}" aria-label="저장">${icon("bookmark")}</button></div>
        <div class="post-copy"><p class="likes">좋아요 ${(post.likes + (liked ? 1 : 0)).toLocaleString("ko-KR")}개</p><p><strong>${esc(post.title)}</strong><br>${esc(post.body)}</p><button type="button" data-action="comments" data-id="${esc(post.id)}">댓글 ${commentCount ? `${commentCount}개 모두 보기` : "작성하기"}</button></div>
      </article>`;
    }).join("") : `<div class="card empty"><strong>${currentFeedFilter === "following" ? "팔로우한 크리에이터의 새 글이 없습니다" : "표시할 게시물이 없습니다"}</strong>${currentFeedFilter === "following" ? "크리에이터 스토리에서 팔로우를 추가해 보세요." : "숨긴 게시물은 설정에서 다시 표시할 수 있습니다."}</div>`;
  }

  function recipeMeta(recipe) {
    return `<span>${icon("chef")} ${esc(recipe.difficulty || "초보")}</span><span>${icon("clock")} ${esc(recipe.time)}</span><span>${icon("heart")} ${Number(recipe.likes).toLocaleString("ko-KR")}</span>`;
  }


  function renderRecipeCategories() {
    const typeOptions = ["전체", ...recipeTypes];
    const cuisineOptions = ["전체", ...cuisineTypes];
    $("[data-recipe-categories]").innerHTML = `<div class="recipe-filter-group"><strong>요리 종류</strong><div>${typeOptions.map(category => `<button class="chip ${category === currentRecipeFilter ? "active" : ""}" type="button" data-recipe-category="${esc(category)}">${esc(category)}</button>`).join("")}</div></div><div class="recipe-filter-group"><strong>카테고리</strong><div>${cuisineOptions.map(cuisine => `<button class="chip ${cuisine === currentCuisineFilter ? "active" : ""}" type="button" data-recipe-cuisine="${esc(cuisine)}">${esc(cuisine)}</button>`).join("")}</div></div>`;
  }

  function renderRecipes() {
    const query = ($("[data-recipe-search]")?.value || "").trim().toLowerCase();
    const filtered = allRecipes().filter(recipe => (currentRecipeFilter === "전체" || normalizeRecipeType(recipe.category) === currentRecipeFilter) && (currentCuisineFilter === "전체" || normalizeCuisine(recipe.cuisine) === currentCuisineFilter) && `${recipe.title} ${recipe.author} ${normalizeRecipeType(recipe.category)} ${normalizeCuisine(recipe.cuisine)}`.toLowerCase().includes(query));
    $("[data-recipe-grid]").innerHTML = filtered.length ? filtered.map(recipe => `<button class="recipe-card" type="button" data-action="recipe-detail" data-id="${recipe.id}"><span class="recipe-thumb"><img src="${esc(recipe.image)}" alt="" loading="lazy"></span><span class="recipe-copy"><strong>${esc(recipe.title)}</strong><span>${esc(normalizeCuisine(recipe.cuisine))} · ${esc(normalizeRecipeType(recipe.category))} · ${esc(recipe.time)}</span></span></button>`).join("") : '<div class="card empty" style="grid-column:1/-1"><strong>검색 결과가 없습니다</strong>다른 요리 종류나 카테고리를 선택해 보세요.</div>';
  }

  function renderProducts() {
    const query = ($("[data-product-search]")?.value || "").trim().toLowerCase();
    const filtered = products.filter(product => `${product.name} ${product.category}`.toLowerCase().includes(query));
    $("[data-product-grid]").innerHTML = filtered.length ? filtered.map(product => `<button class="product-card" type="button" data-action="product-detail" data-id="${product.id}"><span class="product-thumb"><img src="${esc(product.image)}" alt="" loading="lazy"></span><span class="product-copy"><strong>${esc(product.name)}</strong><span>${esc(product.category)} · 무료배송</span><b>${money(product.price)}</b></span></button>`).join("") : '<div class="card empty" style="grid-column:1/-1"><strong>검색 결과가 없습니다</strong>상품 이름을 다시 확인해 주세요.</div>';
  }

  function renderCounts() {
    const cartCount = Object.values(state.cart).reduce((sum, count) => sum + count, 0);
    const unread = state.notifications.filter(item => !item.read).length;
    $$('[data-cart-count]').forEach(node => { node.textContent = cartCount; node.hidden = cartCount === 0; });
    $$('[data-notification-count]').forEach(node => { node.textContent = unread; node.hidden = unread === 0; });
    $$('[data-post-count]').forEach(node => node.textContent = state.posts.length);
    $$('[data-saved-count]').forEach(node => node.textContent = Object.keys(state.saved).length);
    $$('[data-point-count]').forEach(node => node.textContent = state.profile.points.toLocaleString("ko-KR"));
    $$('[data-profile-name]').forEach(node => node.textContent = state.profile.name);
    $$('[data-profile-handle]').forEach(node => node.textContent = `@${state.profile.handle} · ${state.profile.location}`);
    const account = currentAccount();
    $$('[data-account-handle]').forEach(node => node.textContent = account ? `@${account.handle}` : "로그인이 필요합니다");
    $$('[data-account-phone]').forEach(node => node.textContent = account?.phone ? `${account.phone.slice(0, 3)}-****-${account.phone.slice(-4)}` : "휴대폰 번호 미등록");
    $$('[data-account-status]').forEach(node => { node.textContent = account?.needsPin ? "PIN 설정 필요" : account ? "로그인 중" : "로그아웃"; node.dataset.state = account?.needsPin ? "warning" : account ? "active" : "inactive"; });
    const providerName = socialProviderNames[account?.provider];
    $$('[data-account-method]').forEach(node => node.textContent = providerName ? `${providerName} 간편 로그인` : "사용자 ID 또는 휴대폰 + PIN");
    $$('[data-account-security-label]').forEach(node => node.textContent = providerName ? `${providerName} 연결 확인` : account?.needsPin ? "PIN 설정" : "PIN 변경");
  }

  function recipeById(id) {
    const custom = state.posts.find(post => post.id === id);
    if (custom) return { ...custom, time: "사용자 등록", author: custom.author };
    return recipes.find(recipe => recipe.id === id) || null;
  }

  function showRecipe(id) {
    const recipe = recipeById(id);
    if (!recipe) { toast("삭제되었거나 찾을 수 없는 레시피입니다."); return; }
    const saved = Boolean(state.saved[id]);
    const ownPost = state.posts.some(post => post.id === id);
    openSheet("레시피 상세", `<div class="recipe-detail-photo">${recipe.image ? `<img src="${esc(recipe.image)}" alt="${esc(recipe.title)}">` : icon("image", "icon icon-lg")}</div><article class="hero-card"><p class="eyebrow">${esc(normalizeCuisine(recipe.cuisine))} · ${esc(normalizeRecipeType(recipe.category))}</p><h2>${esc(recipe.title)}</h2><p>${esc(recipe.body || `${recipe.author}의 실제 조리 기록입니다. 재료 준비부터 완성까지 순서대로 확인하세요.`)}</p><div class="recipe-meta">${recipeMeta(recipe)}</div></article><div class="section-head"><h2>조리 정보</h2></div><div class="sheet-list"><div class="sheet-row"><span>${icon("clock")}</span><div class="sheet-row-copy"><strong>예상 조리 시간</strong><small>${esc(recipe.time || "20분")}</small></div></div><div class="sheet-row"><span>${icon("user")}</span><div class="sheet-row-copy"><strong>작성자</strong><small>${esc(recipe.author)}</small></div></div></div><div style="height:12px"></div><button class="primary-button full-button" type="button" data-action="save" data-id="${esc(id)}">${saved ? "저장 취소" : "레시피 저장"}</button>${ownPost ? `<button class="secondary-button full-button" style="margin-top:8px" type="button" data-action="edit-post" data-id="${esc(id)}">내 레시피 수정</button>` : ""}`);
  }

  function showComments(id) {
    const comments = state.comments[id] || [];
    openSheet("댓글", `<div class="sheet-list" data-comment-list>${comments.length ? comments.map(comment => `<div class="sheet-row"><div class="avatar">${esc(comment.author.slice(0,2))}</div><div class="sheet-row-copy"><strong>${esc(comment.author)}</strong><small>${esc(comment.body)} · ${esc(comment.time)}</small></div></div>`).join("") : '<div class="empty"><strong>첫 댓글을 남겨보세요</strong>요리에 대한 질문이나 후기를 나눌 수 있습니다.</div>'}</div><form data-comment-form data-id="${esc(id)}" style="margin-top:12px"><div class="field"><label for="comment-body">댓글 내용</label><input id="comment-body" name="body" maxlength="200" required placeholder="정중한 댓글을 작성해 주세요"></div><button class="primary-button full-button" type="submit">댓글 등록</button></form>`);
  }

  function showNotifications() {
    openSheet("알림", `<div class="sheet-list">${state.notifications.length ? state.notifications.map(item => `<button class="menu-row" type="button" data-action="read-notification" data-id="${item.id}"><span>${icon(item.read ? "check" : "bell")}</span><span class="sheet-row-copy"><strong>${esc(item.title)}</strong><small>${esc(item.body)}</small></span><small>${item.read ? "읽음" : "새 알림"}</small></button>`).join("") : '<div class="empty"><strong>새 알림이 없습니다</strong>활동 알림이 이곳에 표시됩니다.</div>'}</div><div style="height:12px"></div><button class="secondary-button full-button" type="button" data-action="read-all">모두 읽음 처리</button>`);
  }

  function showCart() {
    const entries = Object.entries(state.cart).filter(([id, quantity]) => quantity > 0 && products.some(product => product.id === id));
    const total = entries.reduce((sum, [id, quantity]) => sum + products.find(product => product.id === id).price * quantity, 0);
    openSheet("장바구니", entries.length ? `<div class="sheet-list">${entries.map(([id, quantity]) => { const product = products.find(item => item.id === id); return `<div class="sheet-row"><span>${icon(product.icon)}</span><div class="sheet-row-copy"><strong>${esc(product.name)}</strong><small>${money(product.price)}</small></div><div class="quantity"><button type="button" data-action="cart-quantity" data-id="${id}" data-delta="-1" aria-label="수량 줄이기">−</button><strong>${quantity}</strong><button type="button" data-action="cart-quantity" data-id="${id}" data-delta="1" aria-label="수량 늘리기">+</button></div></div>`; }).join("")}</div><div class="card" style="margin:12px 0;padding:15px;display:flex;justify-content:space-between"><span>결제 예정 금액</span><strong>${money(total)}</strong></div><button class="primary-button full-button" type="button" data-action="checkout">주문하기</button>` : '<div class="card empty"><strong>장바구니가 비어 있습니다</strong>마켓에서 필요한 식재료를 담아보세요.</div>');
  }

  function showProduct(id) {
    const product = products.find(item => item.id === id);
    if (!product) { toast("상품 정보를 찾을 수 없습니다."); return; }
    openSheet("상품 상세", `<div class="recipe-detail-photo"><img src="${esc(product.image)}" alt="${esc(product.name)}"></div><article class="hero-card"><p class="eyebrow">${esc(product.category)} · 무료배송</p><h2>${esc(product.name)}</h2><p>${esc(product.detail)}</p><strong style="font-size:22px">${money(product.price)}</strong></article><button class="primary-button full-button" type="button" data-action="add-cart" data-id="${product.id}">장바구니 담기</button>`);
  }

  function showCreate(noteOnly = false, source = {}) {
    if (serviceBlocked("posting")) return;
    const selectedType = normalizeRecipeType(source.category || "밥");
    const selectedCuisine = normalizeCuisine(source.cuisine || "한식");
    const typeOptions = recipeTypes.map(type => `<option value="${esc(type)}"${type === selectedType ? " selected" : ""}>${esc(type)}</option>`).join("");
    const cuisineOptions = cuisineTypes.map(cuisine => `<option value="${esc(cuisine)}"${cuisine === selectedCuisine ? " selected" : ""}>${esc(cuisine)}</option>`).join("");
    const draftId = source.draftId || (source.id?.startsWith("draft-") ? source.id : "");
    const postId = source.postId || (source.id?.startsWith("post-") ? source.id : "");
    const existingImage = source.image || "";
    const isEditingPost = Boolean(postId);
    const title = isEditingPost ? "레시피 수정" : draftId ? "임시 저장 글 이어쓰기" : noteOnly ? "간단 기록" : "레시피 등록";
    openSheet(title, `<form data-create-form data-note-only="${noteOnly}" data-draft-id="${esc(draftId)}" data-post-id="${esc(postId)}"><div class="field"><label for="post-title">제목</label><input id="post-title" name="title" maxlength="60" required placeholder="요리 이름을 입력하세요" value="${esc(source.title || "")}"></div><div class="field"><label for="post-body">조리법과 이야기</label><textarea id="post-body" name="body" maxlength="1000" required placeholder="재료와 조리 과정을 구체적으로 기록해 주세요">${esc(source.body || "")}</textarea></div>${noteOnly ? "" : `<div class="field"><label for="post-image">완성 사진</label><input id="post-image" name="image" type="file" accept="image/*"><input name="existingImage" type="hidden" value="${esc(existingImage)}">${existingImage ? '<small>새 사진을 선택하지 않으면 기존 사진을 유지합니다.</small>' : ""}</div>`}<div class="field-grid"><div class="field"><label for="post-cuisine">카테고리</label><select id="post-cuisine" name="cuisine" required>${cuisineOptions}</select></div><div class="field"><label for="post-category">요리 종류</label><select id="post-category" name="category" required>${typeOptions}</select></div></div><button class="primary-button full-button" type="submit">${isEditingPost ? "수정 완료" : "게시하기"}</button>${isEditingPost ? `<button class="danger-button full-button" style="margin-top:8px" type="button" data-action="delete-post" data-id="${esc(postId)}">게시물 삭제</button>` : '<button class="secondary-button full-button" style="margin-top:8px" type="button" data-action="save-draft">임시 저장</button>'}</form>`);
  }

  function showOrders() {
    openSheet("주문 내역", state.orders.length ? `<div class="sheet-list">${state.orders.map(order => `<button class="menu-row" type="button" data-action="order-detail" data-id="${esc(order.id)}"><span>${icon("box")}</span><span class="sheet-row-copy"><strong>${esc(order.number)} · ${money(order.total)}</strong><small>${esc(order.date)} · ${esc(order.status)}</small></span><span>${icon("chevron")}</span></button>`).join("")}</div>` : '<div class="card empty"><strong>주문 내역이 없습니다</strong>첫 주문을 완료하면 배송 상태를 확인할 수 있습니다.</div>');
  }

  function showOrder(id) {
    const order = state.orders.find(item => item.id === id);
    if (!order) { toast("주문 정보를 찾을 수 없습니다."); return; }
    const items = Array.isArray(order.items) ? order.items : [];
    const itemRows = items.length ? items.map(item => `<div class="sheet-row"><span>${icon("bag")}</span><div class="sheet-row-copy"><strong>${esc(item.name)}</strong><small>${money(item.price)} · ${item.quantity}개</small></div><strong>${money(item.price * item.quantity)}</strong></div>`).join("") : '<div class="sheet-row"><span>' + icon("box") + '</span><div class="sheet-row-copy"><strong>이전 주문</strong><small>상품 상세 정보가 저장되지 않은 주문입니다.</small></div></div>';
    const cancellable = ["결제 완료", "상품 준비"].includes(order.status);
    openSheet("주문 상세", `<article class="card hero-card"><p class="eyebrow">${esc(order.status)}</p><h2>${esc(order.number)}</h2><p>${esc(order.date)} 주문</p><strong>${money(order.total)}</strong></article><div class="section-head"><h2>주문 상품</h2></div><div class="sheet-list">${itemRows}</div>${cancellable ? `<button class="danger-button full-button" style="margin-top:12px" type="button" data-action="cancel-order" data-id="${esc(id)}">주문 취소</button>` : ""}`);
  }

  function showPoints() {
    const history = state.pointHistory || [];
    openSheet("포인트", `<article class="card hero-card"><p class="eyebrow">사용 가능 포인트</p><h2>${state.profile.points.toLocaleString("ko-KR")} P</h2><p>레시피 참여와 마켓 구매로 적립된 포인트입니다.</p></article><div class="section-head"><h2>이용 내역</h2></div><div class="sheet-list">${history.length ? history.map(item => `<div class="sheet-row"><span>${icon("point")}</span><div class="sheet-row-copy"><strong>${esc(item.reason)}</strong><small>${esc(item.date)}</small></div><strong>${item.type === "적립" ? "+" : "-"}${Number(item.amount).toLocaleString("ko-KR")} P</strong></div>`).join("") : '<div class="empty"><strong>포인트 내역이 없습니다</strong>적립과 사용 내역이 이곳에 표시됩니다.</div>'}</div>`);
  }

  function showHiddenPosts() {
    const posts = [...state.posts, ...recipes].filter(post => state.hidden[post.id]);
    openSheet("숨긴 게시물 관리", posts.length ? `<div class="sheet-list">${posts.map(post => `<button class="menu-row" type="button" data-action="restore-post" data-id="${esc(post.id)}"><span>${icon("image")}</span><span class="sheet-row-copy"><strong>${esc(post.title)}</strong><small>눌러서 다시 표시</small></span><span>${icon("chevron")}</span></button>`).join("")}</div>` : '<div class="card empty"><strong>숨긴 게시물이 없습니다</strong>숨긴 콘텐츠가 생기면 이곳에서 복구할 수 있습니다.</div>');
  }

  function showSettings() {
    const switchButton = (key, label, description) => `<button class="menu-row" type="button" data-action="toggle-setting" data-key="${key}"><span>${icon(state.settings[key] ? "check" : "close")}</span><span class="sheet-row-copy"><strong>${label}</strong><small>${description}</small></span><small>${state.settings[key] ? "켬" : "끔"}</small></button>`;
    const account = currentAccount();
    const providerName = socialProviderNames[account?.provider];
    const securityLabel = providerName ? `${providerName} 계정 연결` : account?.needsPin ? "로그인 PIN 설정" : "로그인 PIN 변경";
    const securityDescription = providerName ? `${providerName} 계정으로 다시 인증합니다.` : "숫자 4자리 PIN으로 계정을 보호합니다.";
    openSheet("설정", `<div class="sheet-list">${switchButton("notifications", "활동 알림", "댓글, 저장, 챌린지 알림")}${switchButton("marketing", "혜택 알림", "마켓 할인과 이벤트 소식")}${switchButton("privateProfile", "비공개 프로필", "승인한 사용자만 게시물 확인")}<button class="menu-row" type="button" data-action="hidden-posts"><span>${icon("image")}</span><span class="sheet-row-copy"><strong>숨긴 게시물 관리</strong><small>피드에서 숨긴 콘텐츠를 다시 표시합니다.</small></span><span>${icon("chevron")}</span></button><button class="menu-row" type="button" data-action="account-security"><span>${icon("shield")}</span><span class="sheet-row-copy"><strong>${esc(securityLabel)}</strong><small>${esc(securityDescription)}</small></span><span>${icon("chevron")}</span></button><button class="menu-row" type="button" data-action="logout"><span>${icon("user")}</span><span class="sheet-row-copy"><strong>로그아웃</strong><small>@${esc(state.profile.handle)} 계정에서 로그아웃합니다.</small></span><span>${icon("chevron")}</span></button></div><div style="height:12px"></div><button class="danger-button full-button" type="button" data-action="reset-data">앱 데이터 초기화</button>`);
  }

  function showAccountInfo() {
    const account = currentAccount();
    if (!account) return renderAuth("login");
    const phone = account.phone ? `${account.phone.slice(0, 3)}-****-${account.phone.slice(-4)}` : "휴대폰 번호 미등록";
    const joined = account.createdAt ? new Date(account.createdAt).toLocaleDateString("ko-KR") : "기존 회원";
    const providerName = socialProviderNames[account.provider];
    const loginMethod = providerName ? `${providerName} 간편 로그인` : "ID 또는 휴대폰 + PIN";
    const securityLabel = providerName ? `${providerName} 계정 다시 인증` : account.needsPin ? "로그인 PIN 설정" : "로그인 PIN 변경";
    openSheet("계정 및 로그인", `<article class="account-sheet-summary"><p>현재 로그인 계정</p><h2>@${esc(account.handle)}</h2><dl><div><dt>닉네임</dt><dd>${esc(account.name)}</dd></div><div><dt>휴대폰</dt><dd>${esc(phone)}</dd></div><div><dt>로그인 방식</dt><dd>${esc(loginMethod)}</dd></div><div><dt>가입일</dt><dd>${esc(joined)}</dd></div></dl></article><div class="account-sheet-actions"><button class="primary-button full-button" type="button" data-action="account-security">${esc(securityLabel)}</button><button class="secondary-button full-button" type="button" data-action="logout">로그아웃</button></div>`);
  }

  function showProfileForm() {
    openSheet("프로필 수정", `<form data-profile-form><div class="field"><label for="profile-name">닉네임</label><input id="profile-name" name="name" required maxlength="20" value="${esc(state.profile.name)}"></div><div class="field"><label for="profile-handle">사용자 ID</label><input id="profile-handle" name="handle" required maxlength="24" value="${esc(state.profile.handle)}"></div><div class="field"><label for="profile-location">활동 지역</label><input id="profile-location" name="location" maxlength="30" value="${esc(state.profile.location)}"></div><button class="primary-button full-button" type="submit">저장</button></form>`);
  }

  function showPinForm() {
    const account = currentAccount();
    if (!account) return renderAuth("login");
    openSheet(account.needsPin ? "로그인 PIN 설정" : "로그인 PIN 변경", `<form data-pin-form>${account.needsPin ? "" : '<div class="field"><label for="current-pin">현재 PIN</label><input id="current-pin" name="currentPin" type="password" inputmode="numeric" minlength="4" maxlength="4" required pattern="[0-9]{4}" autocomplete="current-password"></div>'}<div class="field"><label for="new-pin">새 PIN</label><input id="new-pin" name="newPin" type="password" inputmode="numeric" minlength="4" maxlength="4" required pattern="[0-9]{4}" autocomplete="new-password" placeholder="숫자 4자리"></div><div class="field"><label for="confirm-pin">새 PIN 확인</label><input id="confirm-pin" name="confirmPin" type="password" inputmode="numeric" minlength="4" maxlength="4" required pattern="[0-9]{4}" autocomplete="new-password"></div><button class="primary-button full-button" type="submit">PIN 저장</button></form>`);
  }

  function handleAction(action, id, button) {
    if (action === "notifications") return showNotifications();
    if (action === "cart") return showCart();
    if (action === "story") { const name = button.dataset.name; const following = Boolean(state.following[name]); return openSheet(name, `<article class="card hero-card"><p class="eyebrow">크리에이터 스토리</p><h2>${esc(name)}의 오늘 식탁</h2><p>제철 재료를 활용한 조리 과정과 장보기 팁을 확인해 보세요.</p></article><button class="${following ? "secondary-button" : "primary-button"} full-button" type="button" data-action="toggle-follow" data-name="${esc(name)}">${following ? "팔로우 취소" : "팔로우"}</button>`); }
    if (action === "toggle-follow") { const name = button.dataset.name; state.following[name] ? delete state.following[name] : state.following[name] = true; saveState(); closeSheet(); renderFeed(); toast(state.following[name] ? `${name}님을 팔로우합니다.` : `${name}님 팔로우를 취소했습니다.`); return; }
    if (action === "challenge") { state.joinedChallenge = !state.joinedChallenge; saveState(); toast(state.joinedChallenge ? "챌린지에 참여했습니다." : "챌린지 참여를 취소했습니다."); button.textContent = state.joinedChallenge ? "참여 중" : "챌린지 참여"; return; }
    if (action === "like") { state.liked[id] ? delete state.liked[id] : state.liked[id] = true; saveState(); renderFeed(); return; }
    if (action === "save") { state.saved[id] ? delete state.saved[id] : state.saved[id] = true; saveState(); renderFeed(); toast(state.saved[id] ? "레시피를 저장했습니다." : "저장을 취소했습니다."); if ($("[data-sheet-root]").classList.contains("active")) closeSheet(); return; }
    if (action === "comments") return showComments(id);
    if (action === "recipe-detail") return showRecipe(id);
    if (action === "product-detail") return showProduct(id);
    if (action === "add-cart") { if (serviceBlocked("market")) return; state.cart[id] = (state.cart[id] || 0) + 1; saveState(); closeSheet(); toast("장바구니에 담았습니다."); return; }
    if (action === "cart-quantity") { state.cart[id] = Math.max(0, (state.cart[id] || 0) + Number(button.dataset.delta)); if (!state.cart[id]) delete state.cart[id]; saveState(); showCart(); return; }
    if (action === "checkout") { if (serviceBlocked("market")) return; const entries = Object.entries(state.cart).filter(([productId, quantity]) => quantity > 0 && products.some(product => product.id === productId)); if (!entries.length) return showCart(); const total = entries.reduce((sum, [productId, quantity]) => sum + products.find(product => product.id === productId).price * quantity, 0); const items = entries.map(([productId, quantity]) => { const product = products.find(item => item.id === productId); return { id: product.id, name: product.name, price: product.price, quantity }; }); state.orders.unshift({ id: uid("order"), number: `ORD-${new Date().toISOString().slice(0,10).replaceAll("-", "")}-${String(state.orders.length + 1).padStart(3, "0")}`, total, items, status: "결제 완료", date: new Date().toLocaleDateString("ko-KR"), createdAt: new Date().toISOString() }); state.cart = {}; addPointHistory("적립", Math.floor(total * .01), "마켓 구매 적립"); saveState(); closeSheet(); toast("주문이 완료되었습니다."); return; }
    if (action === "create-post") return showCreate(false);
    if (action === "create-note") return showCreate(true);
    if (action === "drafts") return openSheet("임시 저장 글", state.drafts.length ? `<div class="sheet-list">${state.drafts.map(draft => `<div class="sheet-row"><span>${icon("archive")}</span><div class="sheet-row-copy"><strong>${esc(draft.title || "제목 없는 기록")}</strong><small>${esc(draft.date)}</small></div><div class="row-actions"><button class="small-button" type="button" data-action="edit-draft" data-id="${esc(draft.id)}">이어쓰기</button><button class="small-button" type="button" data-action="delete-draft" data-id="${esc(draft.id)}">삭제</button></div></div>`).join("")}</div>` : '<div class="card empty"><strong>임시 저장 글이 없습니다</strong>작성 중 저장한 기록이 이곳에 표시됩니다.</div>');
    if (action === "edit-draft") { const draft = state.drafts.find(item => item.id === id); if (!draft) return toast("임시 저장 글을 찾을 수 없습니다."); return showCreate(Boolean(draft.noteOnly), { ...draft, draftId: draft.id }); }
    if (action === "delete-draft") { state.drafts = state.drafts.filter(item => item.id !== id); saveState(); toast("임시 저장 글을 삭제했습니다."); return handleAction("drafts"); }
    if (action === "orders") return showOrders();
    if (action === "order-detail") return showOrder(id);
    if (action === "cancel-order") { const order = state.orders.find(item => item.id === id); if (!order) return; if (!confirm("이 주문을 취소할까요?")) return; order.status = "주문 취소"; saveState(); toast("주문을 취소했습니다."); return showOrder(id); }
    if (action === "settings") return showSettings();
    if (action === "account-info") return showAccountInfo();
    if (action === "account-security") { const account = currentAccount(); return account?.provider ? startSocialAuth(account.provider) : showPinForm(); }
    if (action === "change-pin") return showPinForm();
    if (action === "logout") { const account = currentAccount(); if (account?.needsPin) { toast("로그아웃 전에 로그인 PIN을 설정해 주세요."); return showPinForm(); } saveState(); localStorage.removeItem(SESSION_KEY); closeSheet(); renderAuth("login"); setAuthStatus("안전하게 로그아웃되었습니다."); return; }
    if (action === "edit-profile") return showProfileForm();
    if (action === "points") return showPoints();
    if (action === "saved-recipes") { const saved = allRecipes().filter(recipe => state.saved[recipe.id]); return openSheet("저장한 레시피", saved.length ? `<div class="sheet-list">${saved.map(recipe => `<button class="menu-row" type="button" data-action="recipe-detail" data-id="${recipe.id}"><span>${icon(recipe.icon || "image")}</span><strong>${esc(recipe.title)}</strong><span>${icon("chevron")}</span></button>`).join("")}</div>` : '<div class="card empty"><strong>저장한 레시피가 없습니다</strong>마음에 드는 레시피의 저장 버튼을 눌러보세요.</div>'); }
    if (action === "my-posts") return openSheet("내 게시물", state.posts.length ? `<div class="sheet-list">${state.posts.map(post => `<button class="menu-row" type="button" data-action="recipe-detail" data-id="${post.id}"><span>${icon("image")}</span><strong>${esc(post.title)}</strong><span>${icon("chevron")}</span></button>`).join("")}</div>` : '<div class="card empty"><strong>작성한 게시물이 없습니다</strong>오늘의 식사를 첫 기록으로 남겨보세요.</div>');
    if (action === "post-menu") { const ownPost = state.posts.some(post => post.id === id); return openSheet("게시물 관리", ownPost ? `<div class="sheet-list"><button class="menu-row" type="button" data-action="edit-post" data-id="${esc(id)}"><span>${icon("edit")}</span><strong>게시물 수정</strong><span>${icon("chevron")}</span></button><button class="menu-row" type="button" data-action="delete-post" data-id="${esc(id)}"><span>${icon("trash")}</span><strong>게시물 삭제</strong><span>${icon("chevron")}</span></button></div>` : `<div class="sheet-list"><button class="menu-row" type="button" data-action="hide-post" data-id="${esc(id)}"><span>${icon("close")}</span><strong>이 게시물 숨기기</strong><span>${icon("chevron")}</span></button><button class="menu-row" type="button" data-action="report-post" data-id="${esc(id)}"><span>${icon("shield")}</span><strong>게시물 신고</strong><span>${icon("chevron")}</span></button></div>`); }
    if (action === "edit-post") { const post = state.posts.find(item => item.id === id); if (!post) return toast("게시물을 찾을 수 없습니다."); return showCreate(false, { ...post, postId: post.id }); }
    if (action === "delete-post") { if (!confirm("게시물을 삭제할까요? 삭제 후 복구할 수 없습니다.")) return; state.posts = state.posts.filter(item => item.id !== id); delete state.comments[id]; delete state.saved[id]; delete state.liked[id]; delete state.hidden[id]; saveState(); closeSheet(); renderAll(); toast("게시물을 삭제했습니다."); return; }
    if (action === "hide-post") { state.hidden[id] = true; saveState(); closeSheet(); renderFeed(); toast("게시물을 숨겼습니다."); return; }
    if (action === "restore-post") { delete state.hidden[id]; saveState(); renderFeed(); toast("게시물을 다시 표시합니다."); return showHiddenPosts(); }
    if (action === "hidden-posts") return showHiddenPosts();
    if (action === "report-post") { const reports = JSON.parse(localStorage.getItem(REPORT_KEY) || "[]"); reports.unshift({ id: uid("report"), target: id, reason: "사용자 신고", status: "대기", date: new Date().toLocaleString("ko-KR") }); localStorage.setItem(REPORT_KEY, JSON.stringify(reports)); closeSheet(); toast("운영팀에 신고를 접수했습니다."); return; }
    if (action === "read-notification") { const item = state.notifications.find(notification => notification.id === id); if (item) item.read = true; saveState(); showNotifications(); return; }
    if (action === "read-all") { state.notifications.forEach(item => item.read = true); saveState(); showNotifications(); return; }
    if (action === "toggle-setting") { const key = button.dataset.key; state.settings[key] = !state.settings[key]; saveState(); showSettings(); return; }
    if (action === "reset-data") { if (confirm("작성한 게시물과 주문 내역을 포함한 앱 데이터를 초기화할까요?")) { state = structuredClone(initialState); saveState(); closeSheet(); renderAll(); toast("앱 데이터를 초기화했습니다."); } }
  }

  document.addEventListener("click", event => {
    const socialButton = event.target.closest("[data-social-auth]");
    if (socialButton) return startSocialAuth(socialButton.dataset.socialAuth);
    const authMode = event.target.closest("[data-auth-mode]");
    if (authMode) return renderAuth(authMode.dataset.authMode);
    const closeButton = event.target.closest("[data-close-sheet]");
    if (closeButton) return closeSheet();
    const nav = event.target.closest("[data-nav]");
    if (nav) return navigate(nav.dataset.nav);
    const category = event.target.closest("[data-recipe-category]");
    if (category) { currentRecipeFilter = category.dataset.recipeCategory; renderRecipeCategories(); renderRecipes(); return; }
    const cuisine = event.target.closest("[data-recipe-cuisine]");
    if (cuisine) { currentCuisineFilter = cuisine.dataset.recipeCuisine; renderRecipeCategories(); renderRecipes(); return; }
    const feedFilter = event.target.closest("[data-feed-filter]");
    if (feedFilter) { currentFeedFilter = feedFilter.dataset.feedFilter; renderFeed(); return; }
    const action = event.target.closest("[data-action]");
    if (action) handleAction(action.dataset.action, action.dataset.id, action);
  });

  document.addEventListener("submit", async event => {
    event.preventDefault();
    if (event.target.matches("[data-signup-form]")) {
      if (!adminState.settings.registration) return setAuthStatus("현재 신규 회원가입이 일시 중지되었습니다.");
      const data = Object.fromEntries(new FormData(event.target));
      const name = String(data.name || "").trim();
      const handle = normalizeHandle(data.handle);
      const phone = normalizePhone(data.phone);
      const pin = String(data.pin || "");
      if (!/^[a-z0-9_]{3,24}$/.test(handle)) return setAuthStatus("사용자 ID는 영문 소문자, 숫자, 밑줄로 3자 이상 입력해 주세요.");
      if (!/^01\d{8,9}$/.test(phone)) return setAuthStatus("휴대폰 번호를 정확히 입력해 주세요.");
      if (!/^\d{4}$/.test(pin)) return setAuthStatus("로그인 PIN은 숫자 4자리로 입력해 주세요.");
      if (accounts.some(account => account.handle === handle)) return setAuthStatus("이미 사용 중인 사용자 ID입니다.");
      if (accounts.some(account => account.phone === phone)) return setAuthStatus("이미 가입된 휴대폰 번호입니다.");
      const account = { id: uid("account"), name, handle, phone, pinHash: await hashPin(pin), needsPin: false, location: "지역 미설정", createdAt: new Date().toISOString() };
      accounts.push(account);
      saveAccounts();
      const nextState = structuredClone(initialState);
      nextState.profile = { ...nextState.profile, accountId: account.id, name, handle, location: account.location, points: 500 };
      nextState.pointHistory = [{ id: uid("PT"), type: "적립", amount: 500, reason: "신규 회원 웰컴 포인트", date: new Date().toLocaleString("ko-KR") }];
      nextState.notifications = [{ id: uid("notification"), title: "오늘한입 가입 완료", body: "간편 회원가입이 완료되었습니다. 첫 레시피를 기록해 보세요.", read: false }];
      localStorage.setItem(accountStateKey(account.id), JSON.stringify(nextState));
      activateAccount(account, nextState);
      toast("간편 회원가입이 완료되었습니다.");
      return;
    }
    if (event.target.matches("[data-login-form]")) {
      const data = Object.fromEntries(new FormData(event.target));
      const identifier = String(data.identifier || "").trim().toLowerCase();
      const phone = normalizePhone(identifier);
      const account = accounts.find(item => item.handle === normalizeHandle(identifier) || (phone && item.phone === phone));
      if (!account) return setAuthStatus("가입 정보를 찾을 수 없습니다.");
      if (account.needsPin || !account.pinHash) return setAuthStatus("이 계정은 기존 기기에서 먼저 로그인 PIN을 설정해야 합니다.");
      if (account.pinHash !== await hashPin(String(data.pin || ""))) return setAuthStatus("로그인 PIN이 일치하지 않습니다.");
      const status = adminState.users.find(user => user.id === account.id || user.handle === account.handle)?.status || "정상";
      if (status !== "정상") return setAuthStatus(`현재 ${status} 상태의 계정입니다. 운영자에게 문의해 주세요.`);
      activateAccount(account);
      toast("로그인했습니다.");
      return;
    }
    if (event.target.matches("[data-pin-form]")) {
      const account = currentAccount();
      if (!account) return renderAuth("login");
      const data = Object.fromEntries(new FormData(event.target));
      if (!/^\d{4}$/.test(String(data.newPin || ""))) return toast("새 PIN은 숫자 4자리로 입력해 주세요.");
      if (data.newPin !== data.confirmPin) return toast("새 PIN 확인이 일치하지 않습니다.");
      if (!account.needsPin && account.pinHash !== await hashPin(String(data.currentPin || ""))) return toast("현재 PIN이 일치하지 않습니다.");
      account.pinHash = await hashPin(data.newPin);
      account.needsPin = false;
      saveAccounts();
      closeSheet();
      toast("로그인 PIN을 저장했습니다.");
      return;
    }
    if (event.target.matches("[data-comment-form]")) {
      const form = event.target;
      const body = new FormData(form).get("body").trim();
      if (!body) return;
      state.comments[form.dataset.id] ||= [];
      state.comments[form.dataset.id].push({ id: uid("comment"), author: state.profile.name, body, time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) });
      saveState();
      showComments(form.dataset.id);
      return;
    }
    if (event.target.matches("[data-profile-form]")) {
      const data = Object.fromEntries(new FormData(event.target));
      const account = currentAccount();
      const handle = normalizeHandle(data.handle);
      if (!/^[a-z0-9_]{3,24}$/.test(handle)) return toast("사용자 ID는 영문 소문자, 숫자, 밑줄로 입력해 주세요.");
      if (accounts.some(item => item.id !== account?.id && item.handle === handle)) return toast("이미 사용 중인 사용자 ID입니다.");
      state.profile = { ...state.profile, name: data.name.trim(), handle, location: data.location.trim() || "지역 미설정" };
      if (account) { account.name = state.profile.name; account.handle = handle; account.location = state.profile.location; saveAccounts(); registerAdminUser(account); }
      saveState(); closeSheet(); renderCounts(); toast("프로필을 수정했습니다."); return;
    }
    if (event.target.matches("[data-create-form]")) {
      if (serviceBlocked("posting")) return;
      const form = event.target;
      const data = new FormData(form);
      const file = data.get("image");
      let image = data.get("existingImage") || "";
      if (file && file.size) image = await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(file); });
      const postId = form.dataset.postId;
      const draftId = form.dataset.draftId;
      const values = { author: state.profile.name, handle: `@${state.profile.handle}`, title: data.get("title").trim(), body: data.get("body").trim(), category: normalizeRecipeType(data.get("category")), cuisine: normalizeCuisine(data.get("cuisine")), image, icon: "image", updatedAt: new Date().toISOString() };
      if (postId) {
        const index = state.posts.findIndex(post => post.id === postId);
        if (index < 0) return toast("수정할 게시물을 찾을 수 없습니다.");
        state.posts[index] = { ...state.posts[index], ...values };
      } else {
        const post = { id: uid("post"), ...values, likes: 0, time: "방금", createdAt: new Date().toISOString() };
        state.posts.unshift(post);
        state.comments[post.id] = [];
        addPointHistory("적립", 50, "레시피 등록");
      }
      if (draftId) state.drafts = state.drafts.filter(draft => draft.id !== draftId);
      saveState(); closeSheet(); navigate("home"); renderAll(); toast(postId ? "레시피를 수정했습니다." : "새 레시피를 게시했습니다.");
    }
  });

  document.addEventListener("input", event => {
    if (event.target.matches("[data-recipe-search]")) renderRecipes();
    if (event.target.matches("[data-product-search]")) renderProducts();
  });

  document.addEventListener("click", async event => {
    const draftButton = event.target.closest('[data-action="save-draft"]');
    if (!draftButton) return;
    if (serviceBlocked("posting")) return;
    const form = draftButton.closest("form");
    const data = new FormData(form);
    const file = data.get("image");
    let image = data.get("existingImage") || "";
    if (file && file.size) image = await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(file); });
    const draftId = form.dataset.draftId || uid("draft");
    const draft = { id: draftId, title: String(data.get("title") || "").trim(), body: String(data.get("body") || "").trim(), category: normalizeRecipeType(data.get("category")), cuisine: normalizeCuisine(data.get("cuisine")), image, noteOnly: form.dataset.noteOnly === "true", date: new Date().toLocaleString("ko-KR") };
    const index = state.drafts.findIndex(item => item.id === draftId);
    if (index >= 0) state.drafts[index] = draft; else state.drafts.unshift(draft);
    saveState(); closeSheet(); toast("임시 저장했습니다.");
  }, true);

  window.addEventListener("storage", event => {
    if (event.key === STORAGE_KEY) { state = loadState(); const account = currentAccount(); if (account) localStorage.setItem(accountStateKey(account.id), JSON.stringify(state)); renderAll(); }
    if (event.key === ADMIN_KEY) { adminState = loadAdminState(); renderAll(); if (!$("[data-auth-root]").hidden) renderAuth(currentAuthMode); if (adminState.settings.maintenance) toast("운영자 설정으로 서비스 점검이 시작되었습니다."); }
    if (event.key === ACCOUNTS_KEY) accounts = loadAccounts();
    if (event.key === SESSION_KEY && !currentAccount()) renderAuth("login");
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeSheet(); });

  function renderAll() {
    hydrateIcons(); renderRecipeCategories(); renderRecipes(); renderProducts(); renderFeed(); renderCounts(); applyChallengeBannerImage();
    const challengeButton = $('[data-action="challenge"]');
    if (challengeButton) challengeButton.textContent = state.joinedChallenge ? "참여 중" : "챌린지 참여";
    document.body.classList.toggle("service-maintenance", adminState.settings.maintenance);
    $$('[data-action="create-post"], [data-action="create-note"]').forEach(button => { button.disabled = !adminState.settings.posting || adminState.settings.maintenance; });
    if (adminState.settings.maintenance && currentScreen !== "profile") navigate("profile");
  }

  consumeSocialCallback().then(handled => {
    if (!handled) initializeAuth();
    renderAll();
  });
  const challengeBanner = $("[data-challenge-banner]");
  if (challengeBanner) {
    challengeBannerObserver = new MutationObserver(applyChallengeBannerImage);
    challengeBannerObserver.observe(challengeBanner, { childList: true, characterData: true, subtree: true });
  }
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("cookshare-service-worker.js").catch(() => {});
})();
