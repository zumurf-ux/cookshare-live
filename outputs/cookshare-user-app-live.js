(() => {
  "use strict";

  const STORAGE_KEY = "cookshare.live.state.v3";
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
    { id: "r1", title: "까망베르 후르츠 에그 토스트", author: "쿠킹 에디터", category: "간단요리", time: "15분", likes: 378, difficulty: "초보", image: "assets/recipe-egg-toast.jpg", tags: ["15분", "양식"], body: "노릇하게 구운 식빵에 달걀과 까망베르 치즈를 올린 든든한 브런치입니다." },
    { id: "r2", title: "어니언 그라탱 수프", author: "오리온 키친", category: "양식", time: "35분", likes: 695, difficulty: "보통", image: "assets/recipe-onion-soup.jpg", tags: ["양파", "오븐"], body: "천천히 볶아 단맛을 끌어낸 양파와 치즈 토스트를 함께 즐기는 깊은 풍미의 수프입니다." },
    { id: "r3", title: "바질 토마토 크림 파스타", author: "민지의 집밥", category: "메인요리", time: "25분", likes: 521, difficulty: "초보", image: "assets/recipe-tomato-pasta.jpg", tags: ["파스타", "25분"], body: "토마토의 산뜻함과 생크림의 부드러움을 바질 향으로 정리한 홈 레스토랑 메뉴입니다." },
    { id: "r4", title: "제철 채소 리코타 샐러드", author: "그린테이블", category: "건강식", time: "10분", likes: 846, difficulty: "초보", image: "assets/recipe-ricotta-salad.jpg", tags: ["제철", "건강식"], body: "아삭한 제철 채소와 담백한 리코타 치즈에 레몬 드레싱을 곁들인 가벼운 한 끼입니다." },
    { id: "r5", title: "베이크드 리코타 치즈버거", author: "발뮤다 키친", category: "메인요리", time: "30분", likes: 735, difficulty: "보통", image: "assets/recipe-cheese-burger.jpg", tags: ["오븐", "브런치"], body: "육즙 가득한 패티와 구운 리코타 치즈를 바삭한 번 사이에 담은 홈메이드 버거입니다." },
    { id: "r6", title: "바나나 오트밀 쿠키", author: "윤서의 식탁", category: "간식", time: "20분", likes: 412, difficulty: "초보", image: "assets/recipe-oat-cookie.jpg", tags: ["노버터", "간식"], body: "잘 익은 바나나의 단맛과 오트밀의 고소함만으로 완성하는 건강한 홈베이킹입니다." },
    { id: "r7", title: "잠봉 루콜라 샌드위치", author: "발뮤다 키친", category: "간단요리", time: "15분", likes: 337, difficulty: "초보", image: "assets/recipe-jambon-sandwich.jpg", tags: ["브런치", "15분"], body: "바삭하게 데운 바게트에 잠봉, 루콜라, 버터를 겹쳐 담은 프렌치 샌드위치입니다." },
    { id: "r8", title: "새우 살사 소프트 타코", author: "미식당", category: "양식", time: "25분", likes: 289, difficulty: "보통", image: "assets/recipe-shrimp-taco.jpg", tags: ["새우", "홈파티"], body: "매콤하게 구운 새우와 산뜻한 토마토 살사를 또띠아에 담은 홈파티 메뉴입니다." }
  ];

  const products = [
    { id: "p1", name: "강원도 제철 샐러드 채소 600g", price: 12900, category: "채소", detail: "새벽 수확 후 산지에서 바로 보내는 친환경 모둠 채소", image: "assets/recipe-ricotta-salad.jpg", icon: "leaf" },
    { id: "p2", name: "자유방목 무항생제 유정란 20구", price: 10800, category: "신선", detail: "생산 이력을 확인할 수 있는 난각번호 1번 유정란", image: "assets/recipe-egg-toast.jpg", icon: "lunch" },
    { id: "p3", name: "숙성 까망베르 치즈 200g", price: 18500, category: "유제품", detail: "브런치와 그라탱에 잘 어울리는 부드러운 숙성 치즈", image: "assets/recipe-onion-soup.jpg", icon: "point" },
    { id: "p4", name: "국산 바질 토마토 소스 500g", price: 16900, category: "가공", detail: "완숙 토마토와 생바질을 천천히 끓여 만든 파스타 소스", image: "assets/recipe-tomato-pasta.jpg", icon: "shield" }
  ];

  const initialState = {
    profile: { name: "윤서의 식탁", handle: "yoonseo_table", location: "서울 마포구", points: 12450 },
    liked: {}, saved: {}, hidden: {}, joinedChallenge: false, cart: {}, orders: [], posts: [], drafts: [],
    comments: { r1: [{ id: "c1", author: "소소한밥상", body: "들깨가루 양을 조금 늘려도 맛있어요.", time: "오전 10:24" }] },
    notifications: [
      { id: "n1", title: "챌린지 마감 안내", body: "두부 한 끼 챌린지가 6일 후 마감됩니다.", read: false },
      { id: "n2", title: "댓글 알림", body: "저장한 파스타 레시피에 새 댓글이 등록되었습니다.", read: false },
      { id: "n3", title: "포인트 적립", body: "출석 참여로 100포인트가 적립되었습니다.", read: false }
    ],
    settings: { notifications: true, marketing: false, privateProfile: false }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const money = value => `${Number(value).toLocaleString("ko-KR")}원`;
  const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true" viewBox="0 0 24 24">${iconPaths[name] || iconPaths.image}</svg>`;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved ? { ...structuredClone(initialState), ...saved } : structuredClone(initialState);
    } catch { return structuredClone(initialState); }
  }

  let state = loadState();
  let currentScreen = "home";
  let currentRecipeFilter = "전체";
  let currentCuisine = "간단요리";
  let currentQuickFilter = "추천순";
  let toastTimer;

  const screenHeaders = {
    home: ["오늘 뭐 먹지?", "윤서님을 위한<br>오늘의 메뉴 추천", "취향과 조리 시간을 반영한 맞춤 레시피"],
    recipes: ["재료별 맞춤 탐색", "냉장고 재료로 찾는<br>오늘의 레시피", "보유 재료와 상황에 맞는 메뉴를 추천합니다"],
    create: ["나만의 레시피 북", "오늘 만든 한 끼를<br>기록해 보세요", "사진과 조리 과정을 차곡차곡 보관합니다"],
    market: ["레시피 연계 장보기", "필요한 재료를<br>한 번에 준비하세요", "검증된 산지 상품을 레시피와 함께 추천합니다"],
    profile: ["나의 요리 데이터", "저장한 레시피와<br>식단을 관리하세요", "기록, 저장, 주문 내역을 한눈에 확인합니다"]
  };

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("cookshare-state-changed"));
    renderCounts();
  }

  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach(node => { if (!node.querySelector("svg")) node.innerHTML = icon(node.dataset.icon); });
  }

  function toast(message) {
    const node = $("[data-toast]");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 2200);
  }

  function navigate(screen) {
    currentScreen = screen;
    $$(".screen").forEach(node => node.classList.toggle("active", node.dataset.screen === screen));
    $$(".nav-button").forEach(node => node.classList.toggle("active", node.dataset.nav === screen));
    $(".app-main").scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => window.scrollTo(0, 0));
    const header = screenHeaders[screen] || screenHeaders.home;
    $("[data-hero-kicker]").textContent = header[0];
    $("[data-hero-title]").innerHTML = header[1];
    $("[data-hero-subtitle]").textContent = header[2];
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
      { ...recipes[2], author: "민지의 집밥", handle: "@minji_table", title: "바질 향을 살린 토마토 크림 파스타", likes: 128 },
      { ...recipes[3], author: "주말식탁", handle: "@weekend_table", title: "주말 브런치로 준비한 리코타 샐러드", likes: 94 }
    ];
    return [...state.posts, ...base].filter(post => !state.hidden[post.id]);
  }

  function renderFeed() {
    const feed = $("[data-feed]");
    const posts = allPosts();
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
    }).join("") : '<div class="card empty"><strong>표시할 게시물이 없습니다</strong>숨긴 게시물은 설정에서 다시 표시할 수 있습니다.</div>';
  }

  function recipeMeta(recipe) {
    return `<span>${icon("chef")} ${esc(recipe.difficulty || "초보")}</span><span>${icon("clock")} ${esc(recipe.time)}</span><span>${icon("heart")} ${Number(recipe.likes).toLocaleString("ko-KR")}</span>`;
  }

  function featureCard(recipe, className = "feature-card") {
    const saved = Boolean(state.saved[recipe.id]);
    return `<article class="${className}"><button type="button" data-action="recipe-detail" data-id="${recipe.id}"><span class="recipe-photo"><img src="${esc(recipe.image)}" alt="${esc(recipe.title)}" loading="lazy"></span><span class="feature-copy"><strong>${esc(recipe.title)}</strong><span>${esc(recipe.body)}</span><span class="recipe-meta">${recipeMeta(recipe)}</span></span></button><button class="save-float ${saved ? "saved" : ""}" type="button" data-action="save" data-id="${recipe.id}" aria-label="${saved ? "저장 취소" : "레시피 저장"}">${icon("bookmark")}</button></article>`;
  }

  function renderReferenceCollections() {
    const cuisineMatches = recipes.filter(recipe => recipe.category === currentCuisine || recipe.tags?.includes(currentCuisine));
    const featured = cuisineMatches.length >= 2 ? [...cuisineMatches, ...recipes.filter(recipe => !cuisineMatches.includes(recipe))] : recipes;
    const featuredRoot = $("[data-featured-recipes]");
    if (featuredRoot) featuredRoot.innerHTML = featured.slice(0, 4).map(recipe => featureCard(recipe)).join("");
    const ingredientRoot = $("[data-ingredient-recipes]");
    if (ingredientRoot) ingredientRoot.innerHTML = [recipes[1], recipes[0], recipes[3]].map(recipe => featureCard(recipe, "ingredient-recipe-card")).join("");
    const brandRoot = $("[data-brand-recipes]");
    if (brandRoot) brandRoot.innerHTML = [recipes[5], recipes[2], recipes[7]].map((recipe, index) => `<button class="brand-item" type="button" data-action="recipe-detail" data-id="${recipe.id}"><img src="${esc(recipe.image)}" alt="" loading="lazy"><span class="brand-copy"><small>${["풀무원", "오리온", "미식당"][index]} 공식 레시피</small><strong>${esc(recipe.title)}</strong><span>${esc(recipe.time)} · 좋아요 ${recipe.likes.toLocaleString("ko-KR")}</span></span>${icon("chevron")}</button>`).join("");
    const applianceRoot = $("[data-appliance-recipes]");
    if (applianceRoot) applianceRoot.innerHTML = [recipes[0], recipes[6], recipes[4], recipes[5]].map(recipe => `<button class="appliance-card" type="button" data-action="recipe-detail" data-id="${recipe.id}"><img src="${esc(recipe.image)}" alt="${esc(recipe.title)}" loading="lazy"><span><strong>${esc(recipe.title)}</strong><span class="recipe-meta">${recipeMeta(recipe)}</span></span></button>`).join("");
  }

  function renderRecipeCategories() {
    const categories = ["전체", ...new Set(recipes.map(recipe => recipe.category))];
    $("[data-recipe-categories]").innerHTML = categories.map(category => `<button class="chip ${category === currentRecipeFilter ? "active" : ""}" type="button" data-recipe-category="${esc(category)}">${esc(category)}</button>`).join("");
  }

  function renderRecipes() {
    const query = ($("[data-recipe-search]")?.value || "").trim().toLowerCase();
    const filtered = recipes.filter(recipe => (currentRecipeFilter === "전체" || recipe.category === currentRecipeFilter) && `${recipe.title} ${recipe.author} ${recipe.category}`.toLowerCase().includes(query));
    $("[data-recipe-grid]").innerHTML = filtered.length ? filtered.map(recipe => `<button class="recipe-card" type="button" data-action="recipe-detail" data-id="${recipe.id}"><span class="recipe-thumb"><img src="${esc(recipe.image)}" alt="" loading="lazy"></span><span class="recipe-copy"><strong>${esc(recipe.title)}</strong><span>${esc(recipe.author)} · ${esc(recipe.time)}</span></span></button>`).join("") : '<div class="card empty" style="grid-column:1/-1"><strong>검색 결과가 없습니다</strong>다른 재료나 요리 이름으로 검색해 보세요.</div>';
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
  }

  function recipeById(id) {
    const custom = state.posts.find(post => post.id === id);
    if (custom) return { ...custom, time: "사용자 등록", author: custom.author };
    return recipes.find(recipe => recipe.id === id) || recipes[0];
  }

  function showRecipe(id) {
    const recipe = recipeById(id);
    const saved = Boolean(state.saved[id]);
    openSheet("레시피 상세", `<div class="recipe-detail-photo">${recipe.image ? `<img src="${esc(recipe.image)}" alt="${esc(recipe.title)}">` : icon("image", "icon icon-lg")}</div><article class="hero-card"><p class="eyebrow">${esc(recipe.category || "나의 레시피")}</p><h2>${esc(recipe.title)}</h2><p>${esc(recipe.body || `${recipe.author}의 실제 조리 기록입니다. 재료 준비부터 완성까지 순서대로 확인하세요.`)}</p><div class="recipe-meta">${recipeMeta(recipe)}</div></article><div class="section-head"><h2>조리 정보</h2></div><div class="sheet-list"><div class="sheet-row"><span>${icon("clock")}</span><div class="sheet-row-copy"><strong>예상 조리 시간</strong><small>${esc(recipe.time || "20분")}</small></div></div><div class="sheet-row"><span>${icon("user")}</span><div class="sheet-row-copy"><strong>작성자</strong><small>${esc(recipe.author)}</small></div></div></div><div style="height:12px"></div><button class="primary-button full-button" type="button" data-action="save" data-id="${esc(id)}">${saved ? "저장 취소" : "레시피 저장"}</button>`);
  }

  function showComments(id) {
    const comments = state.comments[id] || [];
    openSheet("댓글", `<div class="sheet-list" data-comment-list>${comments.length ? comments.map(comment => `<div class="sheet-row"><div class="avatar">${esc(comment.author.slice(0,2))}</div><div class="sheet-row-copy"><strong>${esc(comment.author)}</strong><small>${esc(comment.body)} · ${esc(comment.time)}</small></div></div>`).join("") : '<div class="empty"><strong>첫 댓글을 남겨보세요</strong>요리에 대한 질문이나 후기를 나눌 수 있습니다.</div>'}</div><form data-comment-form data-id="${esc(id)}" style="margin-top:12px"><div class="field"><label for="comment-body">댓글 내용</label><input id="comment-body" name="body" maxlength="200" required placeholder="정중한 댓글을 작성해 주세요"></div><button class="primary-button full-button" type="submit">댓글 등록</button></form>`);
  }

  function showNotifications() {
    openSheet("알림", `<div class="sheet-list">${state.notifications.length ? state.notifications.map(item => `<button class="menu-row" type="button" data-action="read-notification" data-id="${item.id}"><span>${icon(item.read ? "check" : "bell")}</span><span class="sheet-row-copy"><strong>${esc(item.title)}</strong><small>${esc(item.body)}</small></span><small>${item.read ? "읽음" : "새 알림"}</small></button>`).join("") : '<div class="empty"><strong>새 알림이 없습니다</strong>활동 알림이 이곳에 표시됩니다.</div>'}</div><div style="height:12px"></div><button class="secondary-button full-button" type="button" data-action="read-all">모두 읽음 처리</button>`);
  }

  function showCart() {
    const entries = Object.entries(state.cart).filter(([, quantity]) => quantity > 0);
    const total = entries.reduce((sum, [id, quantity]) => sum + products.find(product => product.id === id).price * quantity, 0);
    openSheet("장바구니", entries.length ? `<div class="sheet-list">${entries.map(([id, quantity]) => { const product = products.find(item => item.id === id); return `<div class="sheet-row"><span>${icon(product.icon)}</span><div class="sheet-row-copy"><strong>${esc(product.name)}</strong><small>${money(product.price)}</small></div><div class="quantity"><button type="button" data-action="cart-quantity" data-id="${id}" data-delta="-1" aria-label="수량 줄이기">−</button><strong>${quantity}</strong><button type="button" data-action="cart-quantity" data-id="${id}" data-delta="1" aria-label="수량 늘리기">+</button></div></div>`; }).join("")}</div><div class="card" style="margin:12px 0;padding:15px;display:flex;justify-content:space-between"><span>결제 예정 금액</span><strong>${money(total)}</strong></div><button class="primary-button full-button" type="button" data-action="checkout">주문하기</button>` : '<div class="card empty"><strong>장바구니가 비어 있습니다</strong>마켓에서 필요한 식재료를 담아보세요.</div>');
  }

  function showProduct(id) {
    const product = products.find(item => item.id === id);
    openSheet("상품 상세", `<div class="recipe-detail-photo"><img src="${esc(product.image)}" alt="${esc(product.name)}"></div><article class="hero-card"><p class="eyebrow">${esc(product.category)} · 무료배송</p><h2>${esc(product.name)}</h2><p>${esc(product.detail)}</p><strong style="font-size:22px">${money(product.price)}</strong></article><button class="primary-button full-button" type="button" data-action="add-cart" data-id="${product.id}">장바구니 담기</button>`);
  }

  function showCreate(noteOnly = false) {
    openSheet(noteOnly ? "간단 기록" : "레시피 등록", `<form data-create-form><div class="field"><label for="post-title">제목</label><input id="post-title" name="title" maxlength="60" required placeholder="요리 이름을 입력하세요"></div><div class="field"><label for="post-body">조리법과 이야기</label><textarea id="post-body" name="body" maxlength="1000" required placeholder="재료와 조리 과정을 구체적으로 기록해 주세요"></textarea></div>${noteOnly ? "" : '<div class="field"><label for="post-image">완성 사진</label><input id="post-image" name="image" type="file" accept="image/*"></div>'}<div class="field"><label for="post-category">분류</label><select id="post-category" name="category"><option>밥요리</option><option>면요리</option><option>반찬</option><option>국물</option><option>간식</option></select></div><button class="primary-button full-button" type="submit">게시하기</button><button class="secondary-button full-button" style="margin-top:8px" type="button" data-action="save-draft">임시 저장</button></form>`);
  }

  function showOrders() {
    openSheet("주문 내역", state.orders.length ? `<div class="sheet-list">${state.orders.map(order => `<div class="sheet-row"><span>${icon("box")}</span><div class="sheet-row-copy"><strong>${esc(order.number)} · ${money(order.total)}</strong><small>${esc(order.date)} · ${esc(order.status)}</small></div></div>`).join("")}</div>` : '<div class="card empty"><strong>주문 내역이 없습니다</strong>첫 주문을 완료하면 배송 상태를 확인할 수 있습니다.</div>');
  }

  function showSettings() {
    const switchButton = (key, label, description) => `<button class="menu-row" type="button" data-action="toggle-setting" data-key="${key}"><span>${icon(state.settings[key] ? "check" : "close")}</span><span class="sheet-row-copy"><strong>${label}</strong><small>${description}</small></span><small>${state.settings[key] ? "켬" : "끔"}</small></button>`;
    openSheet("설정", `<div class="sheet-list">${switchButton("notifications", "활동 알림", "댓글, 저장, 챌린지 알림")}${switchButton("marketing", "혜택 알림", "마켓 할인과 이벤트 소식")}${switchButton("privateProfile", "비공개 프로필", "승인한 사용자만 게시물 확인")}</div><div style="height:12px"></div><button class="danger-button full-button" type="button" data-action="reset-data">앱 데이터 초기화</button>`);
  }

  function showProfileForm() {
    openSheet("프로필 수정", `<form data-profile-form><div class="field"><label for="profile-name">닉네임</label><input id="profile-name" name="name" required maxlength="20" value="${esc(state.profile.name)}"></div><div class="field"><label for="profile-handle">사용자 ID</label><input id="profile-handle" name="handle" required maxlength="24" value="${esc(state.profile.handle)}"></div><div class="field"><label for="profile-location">활동 지역</label><input id="profile-location" name="location" maxlength="30" value="${esc(state.profile.location)}"></div><button class="primary-button full-button" type="submit">저장</button></form>`);
  }

  function handleAction(action, id, button) {
    if (action === "notifications") return showNotifications();
    if (action === "cart") return showCart();
    if (action === "story") return openSheet(button.dataset.name, `<article class="card hero-card"><p class="eyebrow">크리에이터 스토리</p><h2>${esc(button.dataset.name)}의 오늘 식탁</h2><p>제철 재료를 활용한 조리 과정과 장보기 팁을 확인해 보세요.</p></article>`);
    if (action === "challenge") { state.joinedChallenge = !state.joinedChallenge; saveState(); toast(state.joinedChallenge ? "챌린지에 참여했습니다." : "챌린지 참여를 취소했습니다."); button.textContent = state.joinedChallenge ? "참여 중" : "챌린지 참여"; return; }
    if (action === "like") { state.liked[id] ? delete state.liked[id] : state.liked[id] = true; saveState(); renderFeed(); return; }
    if (action === "save") { state.saved[id] ? delete state.saved[id] : state.saved[id] = true; saveState(); renderFeed(); renderReferenceCollections(); toast(state.saved[id] ? "레시피를 저장했습니다." : "저장을 취소했습니다."); if ($("[data-sheet-root]").classList.contains("active")) closeSheet(); return; }
    if (action === "comments") return showComments(id);
    if (action === "recipe-detail") return showRecipe(id);
    if (action === "product-detail") return showProduct(id);
    if (action === "add-cart") { state.cart[id] = (state.cart[id] || 0) + 1; saveState(); closeSheet(); toast("장바구니에 담았습니다."); return; }
    if (action === "cart-quantity") { state.cart[id] = Math.max(0, (state.cart[id] || 0) + Number(button.dataset.delta)); if (!state.cart[id]) delete state.cart[id]; saveState(); showCart(); return; }
    if (action === "checkout") { const total = Object.entries(state.cart).reduce((sum, [productId, quantity]) => sum + products.find(product => product.id === productId).price * quantity, 0); state.orders.unshift({ id: uid("order"), number: `ORD-${new Date().toISOString().slice(0,10).replaceAll("-", "")}-${String(state.orders.length + 1).padStart(3, "0")}`, total, status: "결제 완료", date: new Date().toLocaleDateString("ko-KR") }); state.cart = {}; state.profile.points += Math.floor(total * .01); saveState(); closeSheet(); toast("주문이 완료되었습니다."); return; }
    if (action === "create-post") return showCreate(false);
    if (action === "create-note") return showCreate(true);
    if (action === "drafts") return openSheet("임시 저장 글", state.drafts.length ? `<div class="sheet-list">${state.drafts.map(draft => `<div class="sheet-row"><span>${icon("archive")}</span><div class="sheet-row-copy"><strong>${esc(draft.title || "제목 없는 기록")}</strong><small>${esc(draft.date)}</small></div></div>`).join("")}</div>` : '<div class="card empty"><strong>임시 저장 글이 없습니다</strong>작성 중 저장한 기록이 이곳에 표시됩니다.</div>');
    if (action === "orders") return showOrders();
    if (action === "settings") return showSettings();
    if (action === "edit-profile") return showProfileForm();
    if (action === "points") return openSheet("포인트", `<article class="card hero-card"><p class="eyebrow">사용 가능 포인트</p><h2>${state.profile.points.toLocaleString("ko-KR")} P</h2><p>레시피 참여와 마켓 구매로 적립된 포인트입니다.</p></article>`);
    if (action === "saved-recipes") { const saved = recipes.filter(recipe => state.saved[recipe.id]); return openSheet("저장한 레시피", saved.length ? `<div class="sheet-list">${saved.map(recipe => `<button class="menu-row" type="button" data-action="recipe-detail" data-id="${recipe.id}"><span>${icon(recipe.icon)}</span><strong>${esc(recipe.title)}</strong><span>${icon("chevron")}</span></button>`).join("")}</div>` : '<div class="card empty"><strong>저장한 레시피가 없습니다</strong>마음에 드는 레시피의 저장 버튼을 눌러보세요.</div>'); }
    if (action === "my-posts") return openSheet("내 게시물", state.posts.length ? `<div class="sheet-list">${state.posts.map(post => `<button class="menu-row" type="button" data-action="recipe-detail" data-id="${post.id}"><span>${icon("image")}</span><strong>${esc(post.title)}</strong><span>${icon("chevron")}</span></button>`).join("")}</div>` : '<div class="card empty"><strong>작성한 게시물이 없습니다</strong>오늘의 식사를 첫 기록으로 남겨보세요.</div>');
    if (action === "post-menu") return openSheet("게시물 관리", `<div class="sheet-list"><button class="menu-row" type="button" data-action="hide-post" data-id="${esc(id)}"><span>${icon("close")}</span><strong>이 게시물 숨기기</strong><span>${icon("chevron")}</span></button><button class="menu-row" type="button" data-action="report-post" data-id="${esc(id)}"><span>${icon("shield")}</span><strong>게시물 신고</strong><span>${icon("chevron")}</span></button></div>`);
    if (action === "hide-post") { state.hidden[id] = true; saveState(); closeSheet(); renderFeed(); toast("게시물을 숨겼습니다."); return; }
    if (action === "report-post") { const reports = JSON.parse(localStorage.getItem("cookshare.reports.v1") || "[]"); reports.unshift({ id: uid("report"), target: id, reason: "사용자 신고", status: "대기", date: new Date().toLocaleString("ko-KR") }); localStorage.setItem("cookshare.reports.v1", JSON.stringify(reports)); closeSheet(); toast("운영팀에 신고를 접수했습니다."); return; }
    if (action === "read-notification") { const item = state.notifications.find(notification => notification.id === id); if (item) item.read = true; saveState(); showNotifications(); return; }
    if (action === "read-all") { state.notifications.forEach(item => item.read = true); saveState(); showNotifications(); return; }
    if (action === "toggle-setting") { const key = button.dataset.key; state.settings[key] = !state.settings[key]; saveState(); showSettings(); return; }
    if (action === "reset-data") { if (confirm("작성한 게시물과 주문 내역을 포함한 앱 데이터를 초기화할까요?")) { state = structuredClone(initialState); saveState(); closeSheet(); renderAll(); toast("앱 데이터를 초기화했습니다."); } }
  }

  document.addEventListener("click", event => {
    const closeButton = event.target.closest("[data-close-sheet]");
    if (closeButton) return closeSheet();
    const nav = event.target.closest("[data-nav]");
    if (nav) return navigate(nav.dataset.nav);
    const cuisine = event.target.closest("[data-cuisine]");
    if (cuisine) { currentCuisine = cuisine.dataset.cuisine; $$('[data-cuisine]').forEach(node => node.classList.toggle("active", node === cuisine)); renderReferenceCollections(); toast(`${currentCuisine} 추천을 불러왔습니다.`); return; }
    const quickFilter = event.target.closest("[data-quick-filter]");
    if (quickFilter) { currentQuickFilter = quickFilter.dataset.quickFilter; $$('[data-quick-filter]').forEach(node => node.classList.toggle("active", node === quickFilter)); toast(`${currentQuickFilter} 기준으로 추천합니다.`); return; }
    const ingredient = event.target.closest("[data-ingredient]");
    if (ingredient) { const ingredientMap = { "계란": "r1", "양파": "r2", "마늘": "r3", "대파": "r7", "상추": "r4" }; return showRecipe(ingredientMap[ingredient.dataset.ingredient] || "r1"); }
    const category = event.target.closest("[data-recipe-category]");
    if (category) { currentRecipeFilter = category.dataset.recipeCategory; renderRecipeCategories(); renderRecipes(); return; }
    const feedFilter = event.target.closest("[data-feed-filter]");
    if (feedFilter) { $$('[data-feed-filter]').forEach(node => node.classList.toggle("active", node === feedFilter)); toast(`${feedFilter.textContent} 피드로 정렬했습니다.`); return; }
    const action = event.target.closest("[data-action]");
    if (action) handleAction(action.dataset.action, action.dataset.id, action);
  });

  document.addEventListener("submit", async event => {
    event.preventDefault();
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
      state.profile = { ...state.profile, name: data.name.trim(), handle: data.handle.trim().replace(/^@/, ""), location: data.location.trim() };
      saveState(); closeSheet(); renderCounts(); toast("프로필을 수정했습니다."); return;
    }
    if (event.target.matches("[data-create-form]")) {
      const form = event.target;
      const data = new FormData(form);
      const file = data.get("image");
      let image = "";
      if (file && file.size) image = await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(file); });
      const post = { id: uid("post"), author: state.profile.name, handle: `@${state.profile.handle}`, title: data.get("title").trim(), body: data.get("body").trim(), category: data.get("category"), image, likes: 0, icon: "image", time: "방금" };
      state.posts.unshift(post); state.comments[post.id] = []; state.profile.points += 50; saveState(); closeSheet(); navigate("home"); renderFeed(); toast("새 레시피를 게시했습니다.");
    }
  });

  document.addEventListener("input", event => {
    if (event.target.matches("[data-recipe-search]")) renderRecipes();
    if (event.target.matches("[data-product-search]")) renderProducts();
  });

  document.addEventListener("click", event => {
    const draftButton = event.target.closest('[data-action="save-draft"]');
    if (!draftButton) return;
    const form = draftButton.closest("form");
    const data = new FormData(form);
    state.drafts.unshift({ id: uid("draft"), title: data.get("title"), body: data.get("body"), date: new Date().toLocaleString("ko-KR") });
    saveState(); closeSheet(); toast("임시 저장했습니다.");
  }, true);

  window.addEventListener("storage", event => { if (event.key === STORAGE_KEY) { state = loadState(); renderAll(); } });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeSheet(); });

  function renderAll() {
    hydrateIcons(); renderRecipeCategories(); renderRecipes(); renderProducts(); renderFeed(); renderReferenceCollections(); renderCounts();
    const challengeButton = $('[data-action="challenge"]');
    if (challengeButton) challengeButton.textContent = state.joinedChallenge ? "참여 중" : "챌린지 참여";
  }

  renderAll();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("cookshare-service-worker.js").catch(() => {});
})();
