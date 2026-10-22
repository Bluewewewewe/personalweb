/* ============================================================
   Tianna° · 一张桌子，五个宇宙
   场景 / 热点 / 宇宙切换转场 / 面板 / 移动端控制栏
   ============================================================ */
"use strict";

/* ---------- 数据 ---------- */

// 每个宇宙的热点坐标为图片百分比 [x1, y1, x2, y2]（由视觉定位测得）
const UNIVERSES = [
  {
    id: "comic",
    earth: "EARTH-1610",
    name: "布鲁克林漫画",
    img: "public/assets/desk-comic.webp?v=2",
    hots: {
      about: [24, 20, 87, 72],
      game: [66, 86, 93, 99],
      cp: [5, 54, 22, 76],
      mail: [1, 83, 29, 97],
      tools: [87, 71, 99, 84],
    },
  },
  {
    id: "pixel",
    earth: "EARTH-8BIT",
    name: "像素电玩",
    img: "public/assets/desk-pixel.webp?v=2",
    hots: {
      about: [28, 8, 77, 59],
      game: [59, 59, 73, 69],
      cp: [11, 30, 25, 47],
      mail: [49, 77, 70, 89],
      tools: [71, 44, 98, 66],
    },
  },
  {
    id: "cyber",
    earth: "EARTH-2077",
    name: "霓虹赛博",
    img: "public/assets/desk-cyber.webp?v=2",
    hots: {
      about: [17, 20, 56, 58],
      game: [8, 57, 25, 70],
      cp: [1, 45, 15, 56],
      mail: [27, 59, 46, 66],
      tools: [50, 45, 70, 56],
    },
  },
  {
    id: "noir",
    earth: "EARTH-1949",
    name: "黑白胶片",
    img: "public/assets/desk-noir.webp?v=2",
    hots: {
      about: [50, 12, 88, 45],
      game: [42, 46, 57, 56],
      cp: [31, 28, 45, 46],
      mail: [10, 48, 37, 58],
      tools: [1, 36, 28, 46],
    },
  },
  {
    id: "water",
    earth: "EARTH-1867",
    name: "浮世水彩",
    img: "public/assets/desk-water.webp?v=2",
    hots: {
      about: [34, 25, 74, 54],
      game: [30, 55, 43, 63],
      cp: [17, 43, 30, 58],
      mail: [5, 62, 27, 71],
      tools: [1, 50, 16, 65],
    },
  },
];

const ICONS = {
  about:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/></svg>',
  game:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="10" rx="5"/><path d="M7.5 11v4M5.5 13h4"/><circle cx="15.8" cy="12.2" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.2" cy="14.6" r="0.9" fill="currentColor" stroke="none"/></svg>',
  cp:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.6-9.2-9A5.2 5.2 0 0 1 12 6.4 5.2 5.2 0 0 1 21.2 11c-2.2 4.4-9.2 9-9.2 9z"/></svg>',
  tools:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3.5 7.5l8.5 6 8.5-6"/></svg>',
};

const PANELS = {
  about: {
    label: "关于我",
    short: "关于",
    kicker: "MONITOR · 显示器",
    title: "关于我",
    text: "我是 Tianna。UNSW 计算机人工智能二年级在读，平时喜欢打游戏，也喜欢动手做一些小工具。这张桌子就是我的宇宙入口，随便点、随便看。",
    chips: ["UNSW", "计算机 · 人工智能", "二年级"],
  },
  game: {
    label: "打游戏",
    short: "游戏",
    kicker: "CONTROLLER · 手柄",
    title: "打游戏",
    text: "游戏是头号兴趣。这双手柄永远放在伸手就能够到的地方——学习间隙开一局，是这张桌子上最重要的仪式。",
    chips: ["头号兴趣", "有空就开一局"],
  },
  cp: {
    label: "嗑 CP",
    short: "CP",
    kicker: "STANDEE · 立牌",
    title: "嗑 CP",
    text: "嗑 CP 是正经事。桌上最显眼的位置，永远留给正在嗑的那一对——每天的快乐源泉都在这里。",
    chips: ["快乐源泉", "正经事"],
  },
  tools: {
    label: "做小工具",
    short: "工具",
    kicker: "TOOLBOX · 工具箱",
    title: "做小工具",
    text: "喜欢动手做一些小工具。想到什么顺手的点子，就动手写出来给自己用。这只工具箱里装的都是“自己来”的底气。",
    chips: ["动手派", "想到就做"],
  },
  mail: {
    label: "联系我",
    short: "邮箱",
    kicker: "ENVELOPE · 信封",
    title: "联系我",
    text: "想找我，写信到这儿：",
    chips: [],
    mail: "tianlanp@gmail.com",
  },
};

const HOT_ORDER = ["about", "game", "cp", "tools", "mail"];
const IMG_W = 1600;
const IMG_H = 900;

/* ---------- 状态 ---------- */
let current = 0;
let busy = false;
let layers = [];
let pan = { x: 0, y: 0 };
let panTarget = { x: 0, y: 0 };
let par = { x: 0, y: 0 };
let parTarget = { x: 0, y: 0 };
let dragging = false;
let dragStart = null;
let sceneBox = { dx: 0, dy: 0, dw: 0, dh: 0 };

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarse = window.matchMedia("(pointer: coarse)").matches;

const $ = (sel) => document.querySelector(sel);
const stage = $("#stage");
const sceneInner = $("#sceneInner");
const hotsBox = $("#hots");
const fx = $("#fx");
const tip = $("#tip");
const panel = $("#panel");
const panelBody = $("#panelBody");
const panelMask = $("#panelMask");

/* ---------- 载入 ---------- */
function preload() {
  const fill = $("#loaderFill");
  const pct = $("#loaderPct");
  let done = 0;
  const t0 = performance.now();

  const jobs = UNIVERSES.map(
    (u) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = u.img;
        img.onload = img.onerror = () => {
          done += 1;
          const p = Math.round((done / UNIVERSES.length) * 100);
          fill.style.width = p + "%";
          pct.textContent = p + "%";
          resolve(img);
        };
      })
  );

  Promise.all(jobs).then((imgs) => {
    layers = imgs;
    imgs.forEach((img, i) => {
      img.className = "layer" + (i === 0 ? " active" : "");
      img.alt = UNIVERSES[i].name + "风格的书桌插画";
      img.draggable = false;
      sceneInner.insertBefore(img, hotsBox);
    });
    const wait = Math.max(0, 900 - (performance.now() - t0));
    setTimeout(() => {
      $("#loader").classList.add("done");
      document.body.classList.add("ready");
      buildHots();
      buildDots();
      buildDock();
      layoutScene();
      requestAnimationFrame(tick);
    }, wait);
  });
}

/* ---------- 场景布局（cover 换算 + 视差 + 拖动） ---------- */
function layoutScene() {
  const W = window.innerWidth;
  const H = stage.clientHeight || window.innerHeight;
  const s = Math.max(W / IMG_W, H / IMG_H) * 1.03;
  const dw = IMG_W * s;
  const dh = IMG_H * s;
  sceneBox = { dx: (W - dw) / 2, dy: (H - dh) / 2, dw, dh };
  sceneInner.style.width = dw + "px";
  sceneInner.style.height = dh + "px";
  clampPan();
  applyScene();
}

function clampPan() {
  const W = window.innerWidth;
  const H = stage.clientHeight || window.innerHeight;
  const { dw, dh } = sceneBox;
  const maxX = Math.max(0, (dw - W) / 2);
  const maxY = Math.max(0, (dh - H) / 2);
  panTarget.x = Math.min(maxX, Math.max(-maxX, panTarget.x));
  panTarget.y = Math.min(maxY, Math.max(-maxY, panTarget.y));
}

function applyScene() {
  sceneInner.style.transform =
    "translate3d(" +
    (sceneBox.dx + pan.x + par.x) +
    "px," +
    (sceneBox.dy + pan.y + par.y) +
    "px,0)";
}

function tick() {
  pan.x += (panTarget.x - pan.x) * 0.12;
  pan.y += (panTarget.y - pan.y) * 0.12;
  par.x += (parTarget.x - par.x) * 0.07;
  par.y += (parTarget.y - par.y) * 0.07;
  applyScene();
  requestAnimationFrame(tick);
}

/* 鼠标视差 */
if (!isCoarse && !reduceMotion) {
  window.addEventListener("mousemove", (e) => {
    if (dragging) return;
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    parTarget.x = -nx * 20;
    parTarget.y = -ny * 14;
  });
}

/* 触屏 / 鼠标拖动被裁切部分 */
stage.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".hot") || busy) return;
  dragging = true;
  dragStart = { x: e.clientX, y: e.clientY, px: panTarget.x, py: panTarget.y, moved: false };
  stage.setPointerCapture(e.pointerId);
});
stage.addEventListener("pointermove", (e) => {
  if (!dragging || !dragStart) return;
  const dx = e.clientX - dragStart.x;
  const dy = e.clientY - dragStart.y;
  if (Math.abs(dx) + Math.abs(dy) > 6) dragStart.moved = true;
  panTarget.x = dragStart.px + dx;
  panTarget.y = dragStart.py + dy;
  clampPan();
});
stage.addEventListener("pointerup", () => {
  dragging = false;
  dragStart = null;
});
stage.addEventListener("pointercancel", () => {
  dragging = false;
  dragStart = null;
});
window.addEventListener("resize", layoutScene);

/* ---------- 热点 ---------- */
function buildHots() {
  const u = UNIVERSES[current];
  hotsBox.innerHTML = "";
  HOT_ORDER.forEach((key) => {
    const r = u.hots[key];
    if (!r) return;
    const b = document.createElement("button");
    b.className = "hot";
    b.dataset.key = key;
    b.setAttribute("aria-label", PANELS[key].label);
    b.style.left = r[0] + "%";
    b.style.top = r[1] + "%";
    b.style.width = r[2] - r[0] + "%";
    b.style.height = r[3] - r[1] + "%";
    hotsBox.appendChild(b);
  });
}

hotsBox.addEventListener("click", (e) => {
  const hot = e.target.closest(".hot");
  if (!hot) return;
  openPanel(hot.dataset.key);
});
hotsBox.addEventListener("mouseover", (e) => {
  const hot = e.target.closest(".hot");
  if (!hot || isCoarse) return;
  const rect = hot.getBoundingClientRect();
  tip.textContent = PANELS[hot.dataset.key].label;
  tip.style.left = rect.left + rect.width / 2 + "px";
  tip.style.top = rect.top - 14 + "px";
  tip.hidden = false;
});
hotsBox.addEventListener("mouseout", (e) => {
  if (e.target.closest(".hot")) tip.hidden = true;
});

/* ---------- 面板 ---------- */
function panelHTML(key) {
  const p = PANELS[key];
  const u = UNIVERSES[current];
  let html =
    '<span class="panel-kicker">' + p.kicker + "</span>" +
    '<h2 class="panel-title">' + p.title + "</h2>" +
    '<p class="panel-text">' + p.text + "</p>";
  if (p.mail) {
    html +=
      '<div class="mail-row"><div class="mail-addr">' + p.mail + "</div>" +
      '<div class="mail-actions">' +
      '<a class="btn" href="mailto:' + p.mail + '">写一封信</a>' +
      '<button class="btn ghost" id="copyMail" type="button">复制邮箱</button>' +
      "</div></div>";
  }
  if (p.chips.length) {
    html += '<div class="panel-chips">' + p.chips.map((c) => '<span class="chip">' + c + "</span>").join("") + "</div>";
  }
  html += '<div class="panel-stamp">TIANNA° · ' + u.earth + " FILE</div>";
  return html;
}

function openPanel(key) {
  if (!PANELS[key]) return;
  panelBody.innerHTML = panelHTML(key);
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  document.querySelectorAll(".dock-item").forEach((d) => {
    d.classList.toggle("active", d.dataset.key === key);
  });
  if (window.matchMedia("(max-width: 860px)").matches || isCoarse) {
    panelMask.hidden = false;
    requestAnimationFrame(() => panelMask.classList.add("show"));
  }
  const copyBtn = $("#copyMail");
  if (copyBtn) copyBtn.addEventListener("click", copyMail);
}

function closePanel() {
  if (!panel.classList.contains("open")) return;
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  panelMask.classList.remove("show");
  document.querySelectorAll(".dock-item").forEach((d) => d.classList.remove("active"));
  setTimeout(() => {
    panelMask.hidden = true;
  }, 380);
}

$("#panelClose").addEventListener("click", closePanel);
panelMask.addEventListener("click", closePanel);

function copyMail() {
  const addr = PANELS.mail.mail;
  const btn = $("#copyMail");
  const ok = () => {
    if (!btn) return;
    btn.textContent = "已复制 ✓";
    setTimeout(() => {
      btn.textContent = "复制邮箱";
    }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(addr).then(ok).catch(() => fallbackCopy(addr, ok));
  } else {
    fallbackCopy(addr, ok);
  }
}
function fallbackCopy(text, ok) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch (err) { /* 忽略 */ }
  document.body.removeChild(ta);
  ok();
}

/* ---------- 宇宙切换 ---------- */
function buildDots() {
  const box = $("#dots");
  box.innerHTML = "";
  UNIVERSES.forEach((u, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === current ? " active" : "");
    d.title = u.earth + " · " + u.name;
    d.setAttribute("aria-label", "切换到" + u.name);
    d.addEventListener("click", () => switchUniverse(i));
    box.appendChild(d);
  });
}

function buildDock() {
  const items = $("#dockItems");
  items.innerHTML = "";
  HOT_ORDER.forEach((key) => {
    const b = document.createElement("button");
    b.className = "dock-item";
    b.dataset.key = key;
    b.innerHTML = ICONS[key] + "<span>" + PANELS[key].short + "</span>";
    b.setAttribute("aria-label", PANELS[key].label);
    b.addEventListener("click", () => openPanel(key));
    items.appendChild(b);
  });
  $("#dockPrev").addEventListener("click", () => switchUniverse(current - 1));
  $("#dockNext").addEventListener("click", () => switchUniverse(current + 1));
}

function updateHUD() {
  const u = UNIVERSES[current];
  document.body.dataset.universe = u.id;
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === current);
  });
  scramble($("#universeEarth"), u.earth);
  scramble($("#universeName"), u.name);
  scramble($("#dockEarth"), u.earth);
  scramble($("#dockName"), u.name);
}

const GLYPHS = "▓▒░╳＊＃％＆01";
function scramble(el, text) {
  if (reduceMotion) {
    el.textContent = text;
    return;
  }
  let frame = 0;
  const total = 10;
  clearInterval(el._scrambleTimer);
  el._scrambleTimer = setInterval(() => {
    frame += 1;
    const lock = Math.floor((frame / total) * text.length);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      if (i < lock || text[i] === " " || text[i] === "-") out += text[i];
      else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (frame >= total) {
      clearInterval(el._scrambleTimer);
      el.textContent = text;
    }
  }, 32);
}

function switchUniverse(next) {
  const n = UNIVERSES.length;
  next = ((next % n) + n) % n;
  if (busy || next === current) return;
  busy = true;
  tip.hidden = true;
  panTarget.x = 0;
  panTarget.y = 0;
  parTarget.x = 0;
  parTarget.y = 0;

  const from = layers[current];
  const to = layers[next];

  const finish = () => {
    layers.forEach((l, i) => l.classList.toggle("active", i === next));
    current = next;
    buildHots();
    updateHUD();
    busy = false;
  };

  if (reduceMotion) {
    finish();
    return;
  }
  glitchTransition(from, to, finish);
}

/* 故障翻块转场：网格块随机延迟翻转 + RGB 错位切片 + 白闪 */
function glitchTransition(from, to, done) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = window.innerWidth;
  const H = stage.clientHeight || window.innerHeight;
  fx.width = W * dpr;
  fx.height = H * dpr;
  fx.style.width = W + "px";
  fx.style.height = H + "px";
  const ctx = fx.getContext("2d");
  ctx.scale(dpr, dpr);
  fx.classList.add("on");

  const cover = (img) => {
    const iw = img.naturalWidth || IMG_W;
    const ih = img.naturalHeight || IMG_H;
    const s = Math.max(W / iw, H / ih);
    const dw = iw * s;
    const dh = ih * s;
    return { iw, ih, dx: (W - dw) / 2, dy: (H - dh) / 2, dw, dh };
  };
  const cf = cover(from);
  const ct = cover(to);

  const COLS = 14;
  const ROWS = 8;
  const tw = W / COLS;
  const th = H / ROWS;
  const FLIP = 240;
  const MAX_DELAY = 420;
  const TOTAL = MAX_DELAY + FLIP + 220;

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      tiles.push({ c, r, delay: Math.random() * MAX_DELAY });
    }
  }

  function drawTile(img, cm, c, r, scaleX) {
    const sX = ((c * tw - cm.dx) / cm.dw) * cm.iw;
    const sY = ((r * th - cm.dy) / cm.dh) * cm.ih;
    const sW = (tw / cm.dw) * cm.iw;
    const sH = (th / cm.dh) * cm.ih;
    const dw = Math.max(0.5, tw * scaleX);
    ctx.drawImage(img, sX, sY, sW, sH, c * tw + (tw - dw) / 2, r * th, dw, th);
  }

  const t0 = performance.now();
  function frame(now) {
    const t = now - t0;
    ctx.fillStyle = "#0e0d0b";
    ctx.fillRect(0, 0, W, H);

    for (const tile of tiles) {
      const p = (t - tile.delay) / FLIP;
      if (p < 0) {
        drawTile(from, cf, tile.c, tile.r, 1);
      } else if (p >= 1) {
        drawTile(to, ct, tile.c, tile.r, 1);
      } else {
        const half = p < 0.5;
        const k = half ? 1 - p * 2 : (p - 0.5) * 2;
        drawTile(half ? from : to, half ? cf : ct, tile.c, tile.r, Math.max(0.02, k));
      }
    }

    // 中段白闪
    if (t > TOTAL * 0.38 && t < TOTAL * 0.46) {
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect(0, 0, W, H);
    }

    // RGB 错位切片
    if (t > TOTAL * 0.45 && t < TOTAL * 0.85) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 3; i++) {
        const y0 = Math.random() * H;
        const hh = 6 + Math.random() * 26;
        const off = (Math.random() - 0.5) * 26;
        const sY = ((y0 - ct.dy) / ct.dh) * ct.ih;
        const sH = (hh / ct.dh) * ct.ih;
        ctx.globalAlpha = 0.35;
        ctx.drawImage(to, 0, sY, ct.iw, sH, off, y0, W, hh);
      }
      ctx.restore();
    }

    if (t < TOTAL) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, W, H);
      fx.classList.remove("on");
      done();
    }
  }
  requestAnimationFrame(frame);
}

/* ---------- 键盘 ---------- */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePanel();
    return;
  }
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
  if (e.code === "Space" || e.key === "ArrowRight") {
    e.preventDefault();
    switchUniverse(current + 1);
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    switchUniverse(current - 1);
  } else if (/^[1-5]$/.test(e.key)) {
    switchUniverse(Number(e.key) - 1);
  }
});

/* ---------- 启动 ---------- */
preload();
