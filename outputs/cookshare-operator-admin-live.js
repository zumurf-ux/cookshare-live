(() => {
  "use strict";

  const STATE_KEY = "cookshare.live.state.v3";
  const REPORT_KEY = "cookshare.reports.v1";
  const ADMIN_KEY = "cookshare.admin.state.v1";
  const iconPaths = {
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5A3.5 3.5 0 0 1 20 23Z"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    box: '<path d="m4 7 8-4 8 4-8 4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"/>',
    point: '<circle cx="12" cy="12" r="9"/><path d="M9 8h4a3 3 0 0 1 0 6H9V8Zm0 6v3M9 11h5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    trend: '<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
    alert: '<path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5M12 18h.01"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    download: '<path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7M10 11v6M14 11v6"/>'
  };

  const defaultUserState = {
    profile: { accountId: "", name: "한끼연구소", handle: "one_meal_lab", location: "서울 마포구", points: 12450 },
    posts: [], orders: [], liked: {}, saved: {}, hidden: {}, notifications: [], pointHistory: []
  };
  const defaultAdminState = {
    users: [
      { id: "u1", name: "한끼연구소", handle: "one_meal_lab", location: "서울 마포구", status: "정상" },
      { id: "u2", name: "민지의 집밥", handle: "minji_table", location: "경기 성남시", status: "정상" },
      { id: "u3", name: "주말식탁", handle: "weekend_table", location: "서울 송파구", status: "정상" }
    ],
    operators: [{ id: "op1", email: "admin@onebite.local", role: "전체 관리자", status: "활성" }],
    invitations: [],
    pointLedger: [
      { id: "PT-240801", user: "한끼연구소", type: "적립", amount: 100, reason: "출석 참여", date: "2026. 8. 9. 09:00" },
      { id: "PT-240802", user: "민지의 집밥", type: "적립", amount: 500, reason: "챌린지 우수 참여", date: "2026. 8. 8. 18:30" }
    ],
    settings: { registration: true, posting: true, market: true, maintenance: false },
    audit: [
      { action: "운영 정책 확인", actor: "김운영", time: "오늘 09:12" },
      { action: "신고 처리 완료", actor: "김운영", time: "어제 17:48" }
    ]
  };

  const pageInfo = {
    dashboard: ["대시보드", "핵심 지표와 우선 처리 업무를 확인합니다."], content: ["콘텐츠 관리", "사용자 게시물의 공개 상태를 관리합니다."],
    reports: ["신고 관리", "접수된 신고를 검토하고 조치합니다."], orders: ["주문 관리", "결제와 배송 상태를 관리합니다."],
    users: ["회원 관리", "회원 활동과 계정 상태를 확인합니다."], points: ["포인트 원장", "포인트 적립과 사용 이력을 확인합니다."], system: ["시스템 설정", "서비스 운영 기능과 감사 로그를 관리합니다."]
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const icon = name => `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${iconPaths[name] || iconPaths.grid}</svg>`;
  const money = value => `${Number(value).toLocaleString("ko-KR")}원`;
  const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  function parse(key, fallback) {
    try {
      const saved = JSON.parse(localStorage.getItem(key)) || {};
      const merged = { ...structuredClone(fallback), ...saved };
      if (fallback.settings) merged.settings = { ...fallback.settings, ...(saved.settings || {}) };
      if (fallback.profile) merged.profile = { ...fallback.profile, ...(saved.profile || {}) };
      Object.keys(fallback).forEach(name => { if (Array.isArray(fallback[name]) && !Array.isArray(saved[name])) merged[name] = structuredClone(fallback[name]); });
      return merged;
    } catch { return structuredClone(fallback); }
  }
  let userState = parse(STATE_KEY, defaultUserState);
  let adminState = parse(ADMIN_KEY, defaultAdminState);
  let reports = (() => { try { return JSON.parse(localStorage.getItem(REPORT_KEY)) || []; } catch { return []; } })();
  let toastTimer;

  function saveUser(notification) {
    if (notification) {
      userState.notifications ||= [];
      userState.notifications.unshift({ id: uid("notification"), title: notification.title, body: notification.body, read: false });
    }
    localStorage.setItem(STATE_KEY, JSON.stringify(userState));
  }
  function saveAdmin(action) {
    if (action) adminState.audit.unshift({ action, actor: "김운영", time: new Date().toLocaleString("ko-KR", { hour: "2-digit", minute: "2-digit" }) });
    adminState.audit = adminState.audit.slice(0, 100);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminState));
  }
  function saveReports() { localStorage.setItem(REPORT_KEY, JSON.stringify(reports)); }
  function hydrateIcons(root = document) { $$('[data-icon]', root).forEach(node => { if (!node.querySelector("svg")) node.innerHTML = icon(node.dataset.icon); }); }
  function toast(message) { const node = $("[data-admin-toast]"); node.textContent = message; node.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove("show"), 2200); }
  function statusClass(status) { if (["정상", "배송 완료", "처리 완료", "공개"].includes(status)) return "good"; if (["대기", "결제 완료", "상품 준비", "배송 중"].includes(status)) return "warn"; return "bad"; }
  function openModal(title, content) { $("[data-modal-title]").textContent = title; $("[data-modal-body]").innerHTML = content; const root = $("[data-admin-modal]"); root.classList.add("active"); root.setAttribute("aria-hidden", "false"); hydrateIcons(root); }
  function closeModal() { const root = $("[data-admin-modal]"); root.classList.remove("active"); root.setAttribute("aria-hidden", "true"); }
  async function copyText(value) {
    try { await navigator.clipboard.writeText(value); return true; }
    catch {
      const input = document.createElement("textarea");
      input.value = value; input.style.position = "fixed"; input.style.opacity = "0"; document.body.append(input); input.select();
      const copied = document.execCommand("copy"); input.remove(); return copied;
    }
  }

  function navigate(panel) {
    $$("[data-admin-panel]").forEach(node => node.classList.toggle("active", node.dataset.adminPanel === panel));
    $$(".admin-nav [data-admin-nav]").forEach(node => node.classList.toggle("active", node.dataset.adminNav === panel));
    $("[data-admin-title]").textContent = pageInfo[panel][0];
    $("[data-admin-description]").textContent = pageInfo[panel][1];
    $("[data-sidebar]").classList.remove("open");
    renderPanel(panel);
  }

  function contentRows() {
    const base = [
      { id: "r1", title: "들깨 두유 크림 파스타", author: "민지의 집밥", date: "2026. 8. 9.", likes: 128 },
      { id: "r2", title: "제철 무 들기름 솥밥", author: "주말식탁", date: "2026. 8. 9.", likes: 94 }
    ];
    return [...userState.posts.map(post => ({ ...post, date: post.createdAt ? new Date(post.createdAt).toLocaleDateString("ko-KR") : "2026. 8. 9.", likes: post.likes || 0 })), ...base];
  }

  function renderDashboard() {
    const posts = contentRows();
    const openReports = reports.filter(report => report.status !== "처리 완료");
    const orders = userState.orders || [];
    const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const kpis = [
      ["오늘 게시물", posts.length, "trend", "사용자 등록 콘텐츠"], ["대기 신고", openReports.length, "alert", "우선 검토가 필요합니다"],
      ["오늘 주문", orders.length, "box", `결제 합계 ${money(revenue)}`], ["활성 회원", adminState.users.length, "user", "등록 회원 기준"]
    ];
    $("[data-kpi-grid]").innerHTML = kpis.map(([label, value, iconName, detail]) => `<article class="kpi-card"><div class="kpi-head"><span>${label}</span><span class="kpi-icon">${icon(iconName)}</span></div><strong>${Number(value).toLocaleString("ko-KR")}</strong><p>${detail}</p></article>`).join("");
    const chartValues = [32, 48, 41, 63, 57, 74, Math.max(25, Math.min(92, 28 + posts.length * 5 + orders.length * 4))];
    const labels = ["월", "화", "수", "목", "금", "토", "오늘"];
    $("[data-chart]").innerHTML = chartValues.map((value, index) => `<div class="chart-column"><span class="chart-bar" style="height:${value}%" aria-label="${labels[index]} 활동 ${value}"></span><span>${labels[index]}</span></div>`).join("");
    const priorities = [
      ...openReports.slice(0, 2).map(report => ({ icon: "alert", type: "risk", title: report.reason, detail: `${report.target} · 신고 검토`, status: "대기" })),
      ...orders.filter(order => order.status !== "배송 완료").slice(0, 2).map(order => ({ icon: "box", type: "order", title: order.number, detail: `${money(order.total)} · 배송 처리`, status: order.status }))
    ];
    if (!priorities.length) priorities.push({ icon: "check", type: "good", title: "대기 업무 없음", detail: "모든 긴급 항목이 처리되었습니다.", status: "정상" });
    $("[data-priority-list]").innerHTML = priorities.map(item => `<li><span class="list-mark ${item.type}">${icon(item.icon)}</span><span class="list-copy"><strong>${esc(item.title)}</strong><small>${esc(item.detail)}</small></span><span class="status-pill ${statusClass(item.status)}">${esc(item.status)}</span></li>`).join("");
  }

  function renderContent() {
    const query = ($("[data-content-search]")?.value || "").trim().toLowerCase();
    const statusFilter = $("[data-content-status]")?.value || "all";
    const rows = contentRows().filter(post => {
      const status = userState.hidden?.[post.id] ? "hidden" : "visible";
      return (statusFilter === "all" || statusFilter === status) && `${post.title} ${post.author}`.toLowerCase().includes(query);
    });
    $("[data-content-table]").innerHTML = rows.length ? rows.map(post => { const hidden = Boolean(userState.hidden?.[post.id]); return `<tr><td><strong>${esc(post.title)}</strong><br><small>${esc(post.id)}</small></td><td>${esc(post.author)}</td><td>${esc(post.date)}</td><td>좋아요 ${Number(post.likes).toLocaleString("ko-KR")}</td><td><span class="status-pill ${hidden ? "bad" : "good"}">${hidden ? "숨김" : "공개"}</span></td><td><div class="row-actions"><button class="small-button" type="button" data-admin-action="view-content" data-id="${post.id}">상세</button><button class="small-button ${hidden ? "primary" : "danger"}" type="button" data-admin-action="toggle-content" data-id="${post.id}">${hidden ? "복구" : "숨김"}</button></div></td></tr>`; }).join("") : '<tr><td colspan="6"><div class="admin-empty"><strong>조건에 맞는 콘텐츠가 없습니다</strong>검색어 또는 상태 필터를 변경해 주세요.</div></td></tr>';
  }

  function renderReports() {
    const filter = $("[data-report-status]")?.value || "all";
    const rows = reports.filter(report => filter === "all" || report.status === filter);
    $("[data-report-table]").innerHTML = rows.length ? rows.map(report => `<tr><td>${esc(report.id)}</td><td>${esc(report.target)}</td><td>${esc(report.reason)}</td><td>${esc(report.date)}</td><td><span class="status-pill ${statusClass(report.status)}">${esc(report.status)}</span></td><td><div class="row-actions"><button class="small-button" type="button" data-admin-action="report-detail" data-id="${report.id}">검토</button>${report.status !== "처리 완료" ? `<button class="small-button primary" type="button" data-admin-action="resolve-report" data-id="${report.id}">처리 완료</button>` : ""}</div></td></tr>`).join("") : '<tr><td colspan="6"><div class="admin-empty"><strong>접수된 신고가 없습니다</strong>새 신고가 등록되면 이곳에 표시됩니다.</div></td></tr>';
  }

  function renderOrders() {
    const query = ($("[data-order-search]")?.value || "").trim().toLowerCase();
    const filter = $("[data-order-status]")?.value || "all";
    const rows = (userState.orders || []).filter(order => (filter === "all" || order.status === filter) && order.number.toLowerCase().includes(query));
    $("[data-order-table]").innerHTML = rows.length ? rows.map(order => `<tr><td><strong>${esc(order.number)}</strong></td><td>${esc(userState.profile?.name || "한끼연구소")}</td><td>${esc(order.date)}</td><td>${money(order.total)}</td><td><span class="status-pill ${statusClass(order.status)}">${esc(order.status)}</span></td><td><button class="small-button primary" type="button" data-admin-action="order-status" data-id="${order.id}">상태 변경</button></td></tr>`).join("") : '<tr><td colspan="6"><div class="admin-empty"><strong>주문 내역이 없습니다</strong>사용자 앱에서 주문이 완료되면 실시간으로 표시됩니다.</div></td></tr>';
  }

  function renderUsers() {
    if (userState.profile) {
      const currentIndex = adminState.users.findIndex(user => (userState.profile.accountId && user.id === userState.profile.accountId) || user.handle === userState.profile.handle);
      const currentUser = { id: userState.profile.accountId || adminState.users[currentIndex]?.id || uid("user"), name: userState.profile.name, handle: userState.profile.handle, location: userState.profile.location, status: currentIndex >= 0 ? adminState.users[currentIndex].status : "정상" };
      if (currentIndex >= 0) adminState.users[currentIndex] = { ...adminState.users[currentIndex], ...currentUser }; else adminState.users.unshift(currentUser);
    }
    const query = ($("[data-user-search]")?.value || "").trim().toLowerCase();
    const filter = $("[data-user-status]")?.value || "all";
    const rows = adminState.users.map((user, index) => ({ ...user, sourceIndex: index, isCurrent: (userState.profile?.accountId && user.id === userState.profile.accountId) || user.handle === userState.profile?.handle })).filter(user => (filter === "all" || user.status === filter) && `${user.name} ${user.handle} ${user.location}`.toLowerCase().includes(query));
    $("[data-user-table]").innerHTML = rows.length ? rows.map(user => `<tr><td><strong>${esc(user.name)}</strong></td><td>@${esc(user.handle)}</td><td>${esc(user.location)}</td><td>${user.isCurrent ? userState.posts.length : user.sourceIndex + 3}</td><td>${user.isCurrent ? Number(userState.profile?.points || 0).toLocaleString("ko-KR") : (5600 + user.sourceIndex * 2100).toLocaleString("ko-KR")} P</td><td><span class="status-pill ${statusClass(user.status)}">${esc(user.status)}</span></td><td><button class="small-button" type="button" data-admin-action="user-detail" data-id="${esc(user.id)}">관리</button></td></tr>`).join("") : '<tr><td colspan="7"><div class="admin-empty"><strong>조건에 맞는 회원이 없습니다</strong>검색어 또는 상태 필터를 변경해 주세요.</div></td></tr>';
  }

  function renderPoints() {
    $("[data-point-table]").innerHTML = adminState.pointLedger.length ? adminState.pointLedger.map(item => `<tr><td>${esc(item.id)}</td><td>${esc(item.user)}</td><td><span class="status-pill ${item.type === "적립" ? "good" : "warn"}">${esc(item.type)}</span></td><td>${item.type === "적립" ? "+" : "-"}${Number(item.amount).toLocaleString("ko-KR")} P</td><td>${esc(item.reason)}</td><td>${esc(item.date)}</td></tr>`).join("") : '<tr><td colspan="6"><div class="admin-empty"><strong>포인트 내역이 없습니다</strong>포인트 조정 내역이 이곳에 표시됩니다.</div></td></tr>';
  }

  function renderSystem() {
    const labels = { registration: ["신규 회원 가입", "새 계정 생성을 허용합니다."], posting: ["콘텐츠 등록", "사용자의 게시물 등록을 허용합니다."], market: ["마켓 주문", "상품 주문과 결제를 허용합니다."], maintenance: ["점검 모드", "사용자 앱을 점검 화면으로 전환합니다."] };
    $("[data-system-settings]").innerHTML = Object.entries(labels).map(([key, [label, detail]]) => `<button class="menu-row" type="button" data-admin-action="toggle-system" data-key="${key}"><span>${icon(adminState.settings[key] ? "check" : "close")}</span><span class="sheet-row-copy"><strong>${label}</strong><small>${detail}</small></span><span class="status-pill ${adminState.settings[key] ? "good" : ""}">${adminState.settings[key] ? "사용" : "중지"}</span></button>`).join("");
    $("[data-audit-list]").innerHTML = adminState.audit.slice(0, 8).map(item => `<li><span class="list-mark">${icon("clock")}</span><span class="list-copy"><strong>${esc(item.action)}</strong><small>${esc(item.actor)}</small></span><small>${esc(item.time)}</small></li>`).join("");
  }

  function renderPanel(panel) { if (panel === "dashboard") renderDashboard(); if (panel === "content") renderContent(); if (panel === "reports") renderReports(); if (panel === "orders") renderOrders(); if (panel === "users") renderUsers(); if (panel === "points") renderPoints(); if (panel === "system") renderSystem(); renderCounts(); }
  function renderCounts() {
    const openReports = reports.filter(report => report.status !== "처리 완료").length;
    $("[data-content-count]").textContent = contentRows().length;
    $("[data-report-count]").textContent = openReports;
    $("[data-order-count]").textContent = (userState.orders || []).length;
    $("[data-alert-count]").textContent = openReports;
    $("[data-alert-count]").hidden = openReports === 0;
  }

  function showInvitationFromUrl() {
    const params = new URLSearchParams(location.search);
    const id = params.get("invite");
    const email = params.get("email");
    const role = params.get("role");
    if (!id || !email || !role) return;
    openModal("운영자 초대 확인", `<article class="card hero-card"><p class="eyebrow">${esc(role)}</p><h2>${esc(email)}</h2><p>오늘한입 운영자 콘솔 초대를 수락하면 지정된 권한으로 등록됩니다.</p></article><button class="primary-button full-button" type="button" data-admin-action="accept-invite" data-id="${esc(id)}" data-email="${esc(email)}" data-role="${esc(role)}">초대 수락</button><button class="secondary-button full-button" style="margin-top:8px" type="button" data-admin-action="dismiss-invite">나중에 하기</button>`);
  }

  function handleAction(action, id, button) {
    if (action === "export") { const rows = [["지표", "값"], ["게시물", contentRows().length], ["대기 신고", reports.filter(item => item.status !== "처리 완료").length], ["주문", userState.orders.length]]; const csv = rows.map(row => row.join(",")).join("\n"); const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }); const link = document.createElement("a"); const url = URL.createObjectURL(blob); link.href = url; link.download = `오늘한입_운영리포트_${new Date().toISOString().slice(0,10)}.csv`; link.hidden = true; document.body.append(link); link.click(); window.setTimeout(() => { link.remove(); URL.revokeObjectURL(url); }, 1000); toast("운영 리포트를 내려받았습니다."); return; }
    if (action === "alerts") return openModal("운영 알림", `<div class="admin-list">${reports.filter(item => item.status !== "처리 완료").map(item => `<div class="sheet-row"><span>${icon("alert")}</span><span class="sheet-row-copy"><strong>${esc(item.reason)}</strong><small>${esc(item.target)} · ${esc(item.date)}</small></span></div>`).join("") || '<div class="admin-empty"><strong>새 운영 알림이 없습니다</strong>모든 신고가 처리되었습니다.</div>'}</div>`);
    if (action === "view-content") { const post = contentRows().find(item => item.id === id); if (!post) return toast("콘텐츠를 찾을 수 없습니다."); return openModal("콘텐츠 상세", `<div class="card hero-card"><p class="eyebrow">${esc(post.author)}</p><h2>${esc(post.title)}</h2><p>${esc(post.body || "사용자가 등록한 레시피 콘텐츠입니다.")}</p></div>`); }
    if (action === "toggle-content") { userState.hidden ||= {}; userState.hidden[id] ? delete userState.hidden[id] : userState.hidden[id] = true; saveUser(); saveAdmin(`콘텐츠 ${userState.hidden[id] ? "숨김" : "복구"}: ${id}`); renderContent(); renderDashboard(); toast(userState.hidden[id] ? "콘텐츠를 숨겼습니다." : "콘텐츠를 복구했습니다."); return; }
    if (action === "report-detail") { const report = reports.find(item => item.id === id); if (!report) return toast("신고 정보를 찾을 수 없습니다."); return openModal("신고 검토", `<div class="sheet-list"><div class="sheet-row"><span>${icon("shield")}</span><span class="sheet-row-copy"><strong>${esc(report.reason)}</strong><small>대상 ${esc(report.target)}</small></span></div><div class="sheet-row"><span>${icon("clock")}</span><span class="sheet-row-copy"><strong>접수 일시</strong><small>${esc(report.date)}</small></span></div></div>`); }
    if (action === "resolve-report") { const report = reports.find(item => item.id === id); if (!report) return toast("신고 정보를 찾을 수 없습니다."); report.status = "처리 완료"; report.resolvedAt = new Date().toLocaleString("ko-KR"); saveReports(); saveAdmin(`신고 처리 완료: ${id}`); renderReports(); renderDashboard(); toast("신고 처리를 완료했습니다."); return; }
    if (action === "order-status") { const order = userState.orders.find(item => item.id === id); if (!order) return toast("주문 정보를 찾을 수 없습니다."); const statuses = ["결제 완료", "상품 준비", "배송 중", "배송 완료", "주문 취소"]; return openModal("주문 상태 변경", `<div class="field"><label for="order-status-value">${esc(order.number)}</label><select id="order-status-value" data-order-status-value>${statuses.map(status => `<option ${status === order.status ? "selected" : ""}>${status}</option>`).join("")}</select></div><button class="primary-button full-button" type="button" data-admin-action="save-order-status" data-id="${id}">상태 저장</button>`); }
    if (action === "save-order-status") { const order = userState.orders.find(item => item.id === id); if (!order) return toast("주문 정보를 찾을 수 없습니다."); order.status = $("[data-order-status-value]").value; saveUser({ title: "주문 상태 변경", body: `${order.number} 주문이 ${order.status} 상태로 변경되었습니다.` }); saveAdmin(`주문 상태 변경: ${order.number} → ${order.status}`); closeModal(); renderOrders(); renderDashboard(); toast("주문 상태를 변경했습니다."); return; }
    if (action === "user-detail") { const user = adminState.users.find(item => item.id === id); if (!user) return toast("회원 정보를 찾을 수 없습니다."); const statuses = ["정상", "이용 제한", "탈퇴"]; return openModal("회원 관리", `<div class="sheet-list"><div class="sheet-row"><span>${icon("user")}</span><span class="sheet-row-copy"><strong>${esc(user.name)}</strong><small>@${esc(user.handle)} · ${esc(user.location)}</small></span></div></div><div class="field" style="margin-top:12px"><label for="user-status-value">계정 상태</label><select id="user-status-value" data-user-status-value>${statuses.map(status => `<option ${status === user.status ? "selected" : ""}>${status}</option>`).join("")}</select></div><button class="primary-button full-button" type="button" data-admin-action="save-user-status" data-id="${esc(id)}">상태 저장</button>`); }
    if (action === "save-user-status") { const user = adminState.users.find(item => item.id === id); if (!user) return toast("회원 정보를 찾을 수 없습니다."); user.status = $("[data-user-status-value]").value; if (user.handle === userState.profile?.handle) saveUser({ title: "계정 상태 변경", body: `계정 상태가 ${user.status}(으)로 변경되었습니다.` }); saveAdmin(`회원 상태 변경: ${user.handle} → ${user.status}`); closeModal(); renderUsers(); toast("회원 상태를 변경했습니다."); return; }
    if (action === "invite") return openModal("운영자 초대", `<form data-invite-form><div class="field"><label for="invite-email">이메일</label><input id="invite-email" name="email" type="email" required placeholder="operator@example.com"></div><div class="field"><label for="invite-role">권한</label><select id="invite-role" name="role"><option>콘텐츠 운영자</option><option>주문 운영자</option><option>전체 관리자</option></select></div><button class="primary-button full-button" type="submit">초대 링크 생성</button></form>`);
    if (action === "copy-invite") { copyText(button.dataset.value).then(copied => toast(copied ? "초대 링크를 복사했습니다." : "초대 링크 복사에 실패했습니다.")); return; }
    if (action === "accept-invite") { adminState.operators ||= []; const existing = adminState.operators.find(operator => operator.email === button.dataset.email); if (existing) { existing.role = button.dataset.role; existing.status = "활성"; } else { adminState.operators.push({ id: uid("operator"), email: button.dataset.email, role: button.dataset.role, status: "활성" }); } const invitation = (adminState.invitations || []).find(item => item.id === id); if (invitation) { invitation.status = "수락"; invitation.acceptedAt = new Date().toISOString(); } saveAdmin(`운영자 초대 수락: ${button.dataset.email} (${button.dataset.role})`); history.replaceState(null, "", location.pathname); closeModal(); toast("운영자 초대를 수락했습니다."); return; }
    if (action === "dismiss-invite") { history.replaceState(null, "", location.pathname); closeModal(); return; }
    if (action === "point-adjust") return openModal("포인트 조정", `<form data-point-form><div class="field"><label for="point-user">회원</label><select id="point-user" name="user">${adminState.users.map(user => `<option>${esc(user.name)}</option>`).join("")}</select></div><div class="field"><label for="point-type">구분</label><select id="point-type" name="type"><option>적립</option><option>차감</option></select></div><div class="field"><label for="point-amount">포인트</label><input id="point-amount" name="amount" type="number" min="1" max="100000" required></div><div class="field"><label for="point-reason">사유</label><input id="point-reason" name="reason" maxlength="60" required></div><button class="primary-button full-button" type="submit">원장에 반영</button></form>`);
    if (action === "toggle-system") { const key = button.dataset.key; adminState.settings[key] = !adminState.settings[key]; saveAdmin(`시스템 기능 ${adminState.settings[key] ? "사용" : "중지"}: ${key}`); renderSystem(); toast("설정 상태를 변경했습니다."); return; }
    if (action === "save-system") { saveAdmin("시스템 설정 저장"); renderSystem(); toast("시스템 설정을 저장했습니다."); }
  }

  document.addEventListener("click", event => {
    if (event.target.closest("[data-modal-close]")) return closeModal();
    if (event.target.closest("[data-sidebar-toggle]")) return $("[data-sidebar]").classList.toggle("open");
    const nav = event.target.closest("[data-admin-nav]");
    if (nav) return navigate(nav.dataset.adminNav);
    const action = event.target.closest("[data-admin-action]");
    if (action) handleAction(action.dataset.adminAction, action.dataset.id, action);
  });
  document.addEventListener("input", event => { if (event.target.matches("[data-content-search]")) renderContent(); if (event.target.matches("[data-order-search]")) renderOrders(); if (event.target.matches("[data-user-search]")) renderUsers(); });
  document.addEventListener("change", event => { if (event.target.matches("[data-content-status]")) renderContent(); if (event.target.matches("[data-report-status]")) renderReports(); if (event.target.matches("[data-order-status]")) renderOrders(); if (event.target.matches("[data-user-status]")) renderUsers(); });
  document.addEventListener("submit", event => {
    event.preventDefault();
    if (event.target.matches("[data-invite-form]")) {
      const data = Object.fromEntries(new FormData(event.target));
      const invitation = { id: uid("invite"), email: data.email.trim().toLowerCase(), role: data.role, status: "대기", createdAt: new Date().toISOString() };
      adminState.invitations ||= [];
      adminState.invitations.unshift(invitation);
      const url = new URL(location.href); url.search = ""; url.searchParams.set("invite", invitation.id); url.searchParams.set("email", invitation.email); url.searchParams.set("role", invitation.role);
      invitation.url = url.href;
      saveAdmin(`운영자 초대 링크 생성: ${invitation.email} (${invitation.role})`);
      openModal("초대 링크 생성 완료", `<div class="field"><label for="invite-link">초대 링크</label><input id="invite-link" readonly value="${esc(invitation.url)}"></div><button class="primary-button full-button" type="button" data-admin-action="copy-invite" data-value="${esc(invitation.url)}">링크 복사</button>`);
      toast("초대 링크를 생성했습니다.");
    }
    if (event.target.matches("[data-point-form]")) {
      const data = Object.fromEntries(new FormData(event.target));
      const amount = Number(data.amount);
      if (!Number.isFinite(amount) || amount < 1) return toast("1포인트 이상 입력해 주세요.");
      if (data.user === userState.profile?.name && data.type === "차감" && amount > Number(userState.profile.points || 0)) return toast("보유 포인트보다 많이 차감할 수 없습니다.");
      adminState.pointLedger.unshift({ id: uid("PT"), user: data.user, type: data.type, amount, reason: data.reason.trim(), date: new Date().toLocaleString("ko-KR") });
      if (data.user === userState.profile?.name) {
        userState.profile.points += data.type === "적립" ? amount : -amount;
        userState.pointHistory ||= [];
        userState.pointHistory.unshift({ id: uid("PT"), type: data.type, amount, reason: data.reason.trim(), date: new Date().toLocaleString("ko-KR") });
        saveUser({ title: `포인트 ${data.type}`, body: `${data.reason.trim()} 사유로 ${amount.toLocaleString("ko-KR")}P가 ${data.type === "적립" ? "적립" : "차감"}되었습니다.` });
      }
      saveAdmin(`포인트 ${data.type}: ${data.user} ${amount}P`); closeModal(); renderPoints(); toast("포인트 원장에 반영했습니다.");
    }
  });
  window.addEventListener("storage", event => { if (event.key === STATE_KEY) userState = parse(STATE_KEY, defaultUserState); if (event.key === REPORT_KEY) { try { reports = JSON.parse(localStorage.getItem(REPORT_KEY)) || []; } catch { reports = []; } } renderPanel($("[data-admin-panel].active").dataset.adminPanel); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

  hydrateIcons();
  navigate("dashboard");
  showInvitationFromUrl();
})();
