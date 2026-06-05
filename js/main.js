gsap.registerPlugin(ScrollTrigger);

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function scrollToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

window.addEventListener("pageshow", (e) => {
  scrollToTop();
  if (e.persisted && typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

/* ===== Preloader ===== */
function initPreloader() {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to("#preloader", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.getElementById("preloader").style.display = "none";
        },
      });
      initHero();
      showSoundGate();
    },
  });

  tl.from(".preloader-ball", {
    y: -200,
    rotation: 720,
    duration: 1.2,
    ease: "bounce.out",
  })
    .from(".preloader-shuttle", {
      y: -200,
      rotation: -360,
      duration: 1.2,
      ease: "bounce.out",
    }, "-=0.9")
    .to(".preloader-text", { opacity: 1, duration: 0.3 }, "-=0.4");
}

/* ===== Hero entrance ===== */
function initHero() {
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    .to(".nav", { y: 0, duration: 0.8 })
    .to(".hero-badge", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
    .from(".title-line", { opacity: 0, y: 80, rotationX: -40, stagger: 0.15, duration: 0.9 }, "-=0.2")
    .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
    .to(".hero-sports", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
    .to(".hero-actions", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
    .to(".hero-stats", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
    .from(".hero-ball", { scale: 0, rotation: -180, opacity: 0, duration: 1, ease: "back.out(2)" }, "-=0.6")
    .from(".hero-shuttle", { scale: 0, rotation: 180, opacity: 0, duration: 1, ease: "back.out(2)" }, "-=0.8")
    .from(".hero-collage img", { scale: 0, opacity: 0, stagger: 0.12, duration: 0.7, ease: "back.out(1.4)" }, "-=0.7")
    .from(".megaphone", { x: 100, opacity: 0, rotation: 20, duration: 0.8, ease: "elastic.out(1, 0.5)" }, "-=0.7")
    .to(".crowd-silhouette", { opacity: 1, duration: 0.5 }, "-=0.4")
    .to(".scroll-hint", { opacity: 1, duration: 0.5 }, "-=0.2");

  gsap.to(".hero-ball", {
    y: -20,
    rotation: 360,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".hero-shuttle", {
    y: 15,
    x: 10,
    rotation: -25,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".megaphone", {
    rotation: -8,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  animateCounters();
}

/* ===== Counter animation ===== */
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    gsap.to(el, {
      innerText: target,
      duration: 2,
      delay: 1.5,
      snap: { innerText: 1 },
      ease: "power2.out",
    });
  });
}

/* ===== Floating flags ===== */
function initFlags() {
  gsap.utils.toArray(".flags-bg .flag").forEach((flag, i) => {
    gsap.to(flag, {
      y: gsap.utils.random(-30, 30),
      x: gsap.utils.random(-20, 20),
      rotation: gsap.utils.random(-15, 15),
      duration: gsap.utils.random(3, 5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.3,
    });
  });
}

/* ===== Hero parallax stripes ===== */
function initParallax() {
  gsap.utils.toArray(".hero-stripe").forEach((stripe, i) => {
    gsap.to(stripe, {
      x: (i + 1) * 60,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
}

/* ===== Match section — pin + scrub ===== */
function initMatchSection() {
  const cheerTarget = 72;

  ScrollTrigger.create({
    trigger: ".match-section",
    start: "top top",
    end: "+=120%",
    pin: ".match-pin-wrapper",
    pinSpacing: true,
  });

  gsap.from(".match-card", {
    scale: 0.85,
    opacity: 0,
    scrollTrigger: {
      trigger: ".match-section",
      start: "top 70%",
      end: "top 30%",
      scrub: 1,
    },
  });

  gsap.to("#cheerFill", {
    width: cheerTarget + "%",
    scrollTrigger: {
      trigger: ".match-section",
      start: "top 60%",
      end: "bottom 40%",
      scrub: 1,
      onUpdate: (self) => {
        const pct = Math.round(cheerTarget * self.progress);
        document.getElementById("cheerPercent").textContent = pct + "%";
      },
    },
  });

  gsap.from(".countdown-item", {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".match-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });
}

/* ===== Sport tabs ===== */
function initSportTabs() {
  document.querySelectorAll(".sport-tabs").forEach((tabsEl) => {
    const parent = tabsEl.parentElement;
    const panels = parent.querySelectorAll(":scope > .sport-panel");
    const tabs = tabsEl.querySelectorAll(".sport-tab");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const sport = tab.dataset.sport;

        tabs.forEach((t) => t.classList.toggle("active", t === tab));
        panels.forEach((panel) => {
          const isActive = panel.dataset.panel === sport;
          panel.classList.toggle("active", isActive);

          if (isActive && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.fromTo(
              panel,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
          }
        });
      });
    });
  });
}

/* ===== Squad cards — batch reveal ===== */
function initSquad() {
  gsap.from(".squad-section .section-tag, .squad-section .section-title, .squad-section .section-desc", {
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".squad-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  ScrollTrigger.batch(".player-card", {
    start: "top 90%",
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.6,
        ease: "back.out(1.4)",
      });
    },
    once: true,
  });
}

/* ===== Chants + fan gallery ===== */
function initFans() {
  gsap.utils.toArray(".chants").forEach((chantsEl) => {
    gsap.from(chantsEl.querySelectorAll(".chant"), {
      x: -60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: chantsEl,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  ScrollTrigger.batch(".loi-gay-card", {
    start: "top 90%",
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.55,
        ease: "back.out(1.4)",
        immediateRender: false,
      });
    },
    once: true,
  });
}

/* ===== Images (đọc từ data/hinh-anh.json) ===== */
let siteImages = {};

function pickImages(list, fallback = []) {
  return Array.isArray(list) && list.length ? list : fallback;
}

function normalizeImageConfig(raw) {
  if (raw.hero || raw.sinhVien || raw.bongDa) return raw;

  const sv = raw.sinhvien || [];
  const bd = raw.bongda || [];
  const cl = raw.caulong || [];
  return {
    hero: { collage: sv.slice(0, 3) },
    sinhVien: { sectionRaTruong: sv, tabThuVien: sv },
    bongDa: { stripDuoiTran: bd, tabThuVien: bd, doiHinh: { danhSach: bd } },
    cauLong: { stripDuoiTran: cl, tabThuVien: cl, doiHinh: { danhSach: cl } },
    coDongVien: { gallery: [...sv, ...bd, ...cl].slice(0, 6) },
    chuThichAlt: {
      sinhVien: "Sinh viên Làng 8",
      bongDa: "Bóng đá Làng 8",
      cauLong: "Cầu lông Làng 8",
      chung: "Làng 8",
    },
  };
}

function renderPhotoGrid(id, images, altPrefix, eager = false) {
  const el = document.getElementById(id);
  if (!el || !images?.length) return;
  const loading = eager ? "eager" : "lazy";
  el.innerHTML = images
    .map(
      (src, i) => `
    <figure class="photo-card">
      <img src="${src}" alt="${altPrefix} ${i + 1}" loading="${loading}" decoding="async" />
    </figure>`
    )
    .join("");
}

function waitForImages(selector) {
  return new Promise((resolve) => {
    const container = document.querySelector(selector);
    if (!container) {
      resolve();
      return;
    }
    const imgs = [...container.querySelectorAll("img")];
    if (!imgs.length) {
      resolve();
      return;
    }

    let done = 0;
    const finish = () => {
      done += 1;
      if (done >= imgs.length) resolve();
    };

    imgs.forEach((img) => {
      if (img.complete) finish();
      else {
        img.addEventListener("load", finish, { once: true });
        img.addEventListener("error", finish, { once: true });
      }
    });
  });
}

function renderPhotoStrip(id, images) {
  const el = document.getElementById(id);
  if (!el || !images?.length) return;
  el.innerHTML = images.map((src) => `<img src="${src}" alt="" loading="lazy" />`).join("");
}

function renderHeroCollage(images, altText) {
  const el = document.getElementById("heroCollage");
  if (!el || !images?.length) return;
  el.innerHTML = images
    .map((src) => `<img src="${src}" alt="${altText}" loading="eager" />`)
    .join("");
}

function fillPlayerPhotos(cfg) {
  const map = {
    bongda: pickImages(cfg.bongDa?.doiHinh?.danhSach, cfg.bongDa?.tabThuVien),
    caulong: pickImages(cfg.cauLong?.doiHinh?.danhSach, cfg.cauLong?.tabThuVien),
  };

  document.querySelectorAll(".player-card[data-sport]").forEach((card, i) => {
    const sport = card.dataset.sport;
    const pool = map[sport];
    const photoEl = card.querySelector(".player-photo");
    if (!pool?.length || !photoEl) return;
    photoEl.innerHTML = `<img src="${pool[i % pool.length]}" alt="" loading="lazy" />`;
  });
}

async function initImages() {
  try {
    const res = await fetch("data/hinh-anh.json");
    siteImages = normalizeImageConfig(await res.json());
  } catch {
    siteImages = normalizeImageConfig({});
  }

  const alt = siteImages.chuThichAlt || {};

  renderHeroCollage(
    pickImages(siteImages.hero?.collage, siteImages.sinhVien?.sectionRaTruong?.slice(0, 3)),
    alt.sinhVien || "Sinh viên Làng 8"
  );

  renderPhotoGrid(
    "gallery-sinhvien",
    pickImages(siteImages.sinhVien?.sectionRaTruong),
    alt.sinhVien || "Sinh viên Làng 8",
    true
  );
  renderPhotoGrid(
    "gallery-lang8",
    pickImages(siteImages.lang8?.khoanhKhac),
    alt.chung || "Khoảnh khắc Làng 8",
    true
  );

  renderPhotoStrip("strip-bongda", pickImages(siteImages.bongDa?.stripDuoiTran));
  renderPhotoStrip("strip-caulong", pickImages(siteImages.cauLong?.stripDuoiTran));

  renderPhotoGrid(
    "fanGallery",
    pickImages(siteImages.coDongVien?.gallery),
    alt.chung || "Làng 8",
    true
  );

  fillPlayerPhotos(siteImages);
  applyMusicConfig(siteImages.nhacNen);
}

/* ===== Nhạc nền — bắt buộc mở loa ===== */
let musicStarted = false;

function applyMusicConfig(cfg) {
  const audio = document.getElementById("bgMusic");
  if (!audio || !cfg) return;
  if (cfg.file) audio.src = cfg.file;
  if (typeof cfg.amLuong === "number") audio.volume = Math.min(1, Math.max(0, cfg.amLuong));
}

function showSoundGate() {
  const gate = document.getElementById("soundGate");
  if (!gate || musicStarted) return;

  gate.hidden = false;
  document.body.classList.add("sound-locked");
  scrollToTop();

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.fromTo(
      ".sound-gate-panel",
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }
    );
    gsap.to(".sound-gate-icon", {
      scale: 1.08,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

function hideSoundGate() {
  const gate = document.getElementById("soundGate");
  if (!gate) return;

  document.body.classList.remove("sound-locked");

  const removeGate = () => gate.remove();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    removeGate();
    return;
  }

  gsap.to(gate, {
    opacity: 0,
    duration: 0.35,
    onComplete: removeGate,
  });
}

function initMusic() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("soundGateBtn");
  if (!audio || !btn) return;

  btn.addEventListener("click", () => {
    if (musicStarted) return;

    audio
      .play()
      .then(() => {
        musicStarted = true;
        hideSoundGate();
      })
      .catch(() => {
        btn.classList.add("sound-gate-btn--error");
        btn.querySelector(".sound-gate-label").textContent = "THỬ LẠI";
      });
  });
}

function initPhotoGridAnim(containerSelector) {
  const cards = gsap.utils.toArray(`${containerSelector} .photo-card`);
  if (!cards.length) return;

  gsap.set(cards, { opacity: 1, y: 0, scale: 1 });

  gsap.from(cards, {
    y: 40,
    scale: 0.92,
    stagger: 0.1,
    duration: 0.65,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: containerSelector,
      start: "top 92%",
      toggleActions: "play none none none",
      once: true,
      invalidateOnRefresh: true,
    },
  });
}

function initPhotoAnimations() {
  initPhotoGridAnim("#gallery-sinhvien");
  initPhotoGridAnim("#gallery-lang8");
  initPhotoGridAnim("#fanGallery");
}

function initGradSection() {
  gsap.from(".grad-section .section-tag, .grad-section .section-title, .grad-section .section-desc", {
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: "power3.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".grad-section",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });
}

function initBlessing() {
  gsap.from(".blessing-card", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".blessing-section",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

/* ===== Join section ===== */
function initJoin() {
  gsap.from(".join-card", {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".join-section",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

/* ===== Countdown timer ===== */
const MATCH_SCHEDULE = {
  year: 2026,
  month: 6,
  day: 15,
  hour: 15,
  minute: 0,
};

function startCountdown(prefix, schedule = MATCH_SCHEDULE) {
  const matchDate = new Date(
    schedule.year,
    schedule.month - 1,
    schedule.day,
    schedule.hour,
    schedule.minute,
    0
  );

  function update() {
    const now = new Date();
    const diff = matchDate - now;

    const set = (key, val) => {
      const el = document.querySelector(`[data-countdown="${prefix}-${key}"]`);
      if (el) el.textContent = String(val).padStart(2, "0");
    };

    if (diff <= 0) {
      set("days", 0);
      set("hours", 0);
      set("mins", 0);
      set("secs", 0);
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    set("days", d);
    set("hours", h);
    set("mins", m);
    set("secs", s);
  }

  update();
  setInterval(update, 1000);
}

function initCountdown() {
  startCountdown("bd");
  startCountdown("cl");
}

/* ===== Confetti burst ===== */
function burstConfetti() {
  const wrap = document.getElementById("confetti");
  const colors = ["#f4c430", "#e63946", "#2d9a5a", "#faf6ed", "#d4a017"];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.background = colors[i % colors.length];
    piece.style.left = "50%";
    piece.style.top = "50%";
    wrap.appendChild(piece);

    gsap.to(piece, {
      x: gsap.utils.random(-400, 400),
      y: gsap.utils.random(-500, 100),
      rotation: gsap.utils.random(0, 720),
      opacity: 0,
      duration: gsap.utils.random(1.5, 3),
      ease: "power2.out",
      onComplete: () => piece.remove(),
    });
  }
}

/* ===== Registration storage (JSON) ===== */
const REG_STORAGE_KEY = "covu-dang-ky";
let regFromFile = [];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(REG_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(list) {
  localStorage.setItem(REG_STORAGE_KEY, JSON.stringify(list, null, 2));
}

async function loadRegFromFile() {
  try {
    const res = await fetch("data/dang-ky.json");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function getAllRegistrations() {
  const local = loadFromStorage();
  const merged = [...regFromFile, ...local];
  const seen = new Set();
  return merged.filter((item) => {
    const key = item.id || `${item.ten}-${item.sdt}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const MON_LABELS = {
  "bong-da": { text: "⚽ Bóng đá nữ", cls: "" },
  "cau-long": { text: "🏸 Cầu lông", cls: "reg-item-mon--badminton" },
  "ca-hai": { text: "⚽🏸 Cả hai", cls: "reg-item-mon--both" },
};

function formatMon(mon) {
  return MON_LABELS[mon] || MON_LABELS["bong-da"];
}

function updateRegBadge() {
  const count = getAllRegistrations().length;
  document.getElementById("regBadge").textContent = count;
}

function updateRegistrationUI() {
  updateRegBadge();
  renderLoiGayWall();
}

function renderLoiGayWall() {
  const wall = document.getElementById("loiGayWall");
  if (!wall) return;

  const items = getAllRegistrations()
    .filter((item) => item.loiGay?.trim())
    .sort((a, b) => new Date(b.ngayDangKy) - new Date(a.ngayDangKy));

  if (!items.length) {
    wall.innerHTML =
      '<p class="loi-gay-empty">Chưa có lời gáy nào — đăng ký form bên dưới và gửi lời gáy của bạn nhé! 📣</p>';
    return;
  }

  wall.innerHTML = items
    .map((item) => {
      const mon = formatMon(item.mon);
      return `
      <blockquote class="loi-gay-card">
        <p class="loi-gay-text">"${escapeHtml(item.loiGay.trim())}"</p>
        <footer class="loi-gay-meta">
          <strong class="loi-gay-name">${escapeHtml(item.ten)}</strong>
          <span class="loi-gay-mon ${mon.cls}">${mon.text}</span>
        </footer>
      </blockquote>`;
    })
    .join("");
}

function renderRegList() {
  const list = getAllRegistrations();
  const listEl = document.getElementById("regList");
  const countEl = document.getElementById("regCount");
  const jsonEl = document.getElementById("regJson");

  countEl.textContent =
    list.length === 0
      ? "Chưa có ai đăng ký — hãy là người đầu tiên!"
      : `Có ${list.length} người xác nhận tham gia cổ vũ`;

  if (list.length === 0) {
    listEl.innerHTML = '<li class="reg-empty">Danh sách trống 🏟️</li>';
  } else {
    listEl.innerHTML = list
      .map(
        (item, i) => {
          const mon = formatMon(item.mon);
          return `
      <li class="reg-item">
        <span class="reg-item-num">${i + 1}</span>
        <div class="reg-item-info">
          <div class="reg-item-name">
            ${escapeHtml(item.ten)}
            <span class="reg-item-mon ${mon.cls}">${mon.text}</span>
          </div>
          ${item.sdt ? `<div class="reg-item-phone">📞 ${escapeHtml(item.sdt)}</div>` : ""}
          ${item.loiGay ? `<div class="reg-item-gay">📣 "${escapeHtml(item.loiGay)}"</div>` : ""}
          <div class="reg-item-date">${formatDate(item.ngayDangKy)}</div>
        </div>
      </li>`;
        }
      )
      .join("");
  }

  jsonEl.textContent = JSON.stringify(list, null, 2);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function openRegModal() {
  renderRegList();
  const modal = document.getElementById("regModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.from(".reg-modal-panel", {
      scale: 0.9,
      y: 30,
      opacity: 0,
      duration: 0.4,
      ease: "back.out(1.5)",
    });
  }
}

function closeRegModal() {
  const modal = document.getElementById("regModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initRegistrations() {
  document.getElementById("showRegBtn").addEventListener("click", openRegModal);
  document.getElementById("regModalClose").addEventListener("click", closeRegModal);
  document.getElementById("regModalBackdrop").addEventListener("click", closeRegModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeRegModal();
  });

  return loadRegFromFile().then((data) => {
    regFromFile = data;
    updateRegistrationUI();
  });
}

function addRegistration(ten, sdt, loiGay, mon) {
  const entry = {
    id: "local-" + Date.now(),
    ten: ten.trim(),
    sdt: (sdt || "").trim(),
    loiGay: (loiGay || "").trim(),
    mon: mon || "bong-da",
    ngayDangKy: new Date().toISOString(),
    nguon: "local",
  };

  const list = loadFromStorage();
  list.push(entry);
  saveToStorage(list);
  updateRegistrationUI();
  return entry;
}

/* ===== Form submit ===== */
function initForm() {
  document.getElementById("joinForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const ten = form.ten.value;
    const sdt = form.sdt.value;
    const loiGay = form.loiGay.value;
    const mon = form.querySelector('input[name="mon"]:checked')?.value || "bong-da";

    addRegistration(ten, sdt, loiGay, mon);

    const note = document.getElementById("joinNote");
    note.textContent = "🎉 Đã ghi tên vào danh sách! Hẹn gặp ở sân bóng Làng 8 nhé!";
    burstConfetti();

    gsap.from(note, { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" });

    if (loiGay.trim() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from("#loiGayWall .loi-gay-card:first-child", {
        scale: 0.85,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
      });
    }

    form.reset();
  });
}

/* ===== Mobile nav ===== */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

/* ===== Reduced motion ===== */
function initReducedMotion() {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.globalTimeline.clear();
    gsap.set(".preloader", { display: "none" });
    gsap.set([
      ".nav", ".hero-badge", ".title-line", ".hero-sub", ".hero-sports",
      ".hero-actions", ".hero-stats", ".hero-ball", ".hero-shuttle", ".megaphone",
      ".crowd-silhouette", ".scroll-hint",
    ], { opacity: 1, clearProps: "transform" });
    ScrollTrigger.getAll().forEach((st) => st.kill());
  });
}

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", async () => {
  if (location.hash) {
    history.replaceState(null, "", location.pathname + location.search);
  }
  scrollToTop();

  await initImages();
  await waitForImages("#gallery-sinhvien");
  await waitForImages("#gallery-lang8");
  await waitForImages("#fanGallery");
  scrollToTop();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.getElementById("preloader").style.display = "none";
    gsap.set(".nav", { y: 0 });
    gsap.set(".hero-badge, .title-line, .hero-sub, .hero-sports, .hero-actions, .hero-stats, .hero-ball, .hero-shuttle, .hero-collage img, .megaphone, .crowd-silhouette, .scroll-hint", { opacity: 1 });
    initCountdown();
    initSportTabs();
    await initRegistrations();
    initMusic();
    showSoundGate();
    initForm();
    initNav();
    scrollToTop();
    return;
  }

  initPreloader();
  initFlags();
  initParallax();
  initMatchSection();
  initSquad();
  initGradSection();
  initPhotoAnimations();
  await initRegistrations();
  initMusic();
  initFans();
  initBlessing();
  initJoin();
  initCountdown();
  initSportTabs();
  initForm();
  initNav();
  initReducedMotion();

  scrollToTop();
  ScrollTrigger.refresh();
});
