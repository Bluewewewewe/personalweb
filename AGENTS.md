# AGENTS.md

## 项目概览
Tianna 的个人主页：「一张桌子，五个宇宙」。整屏一张 16:9 漫画书桌插画，桌上物件是可点热点，点开对应内容面板；按空格 / 方向键 / 圆点在 5 种画风（宇宙）之间切换，canvas 网格翻块 + RGB 错位故障转场。纯静态站，无构建步骤，可直接部署 GitHub Pages。

## 技术栈
- 原生 HTML / CSS / JS（native-static 模板，无框架、无依赖）
- 启动：`python3 -m http.server ${DEPLOY_RUN_PORT}`（见 `.coze`，dev 与 deploy 相同）
- 设计规范见 `DESIGN.md`（改动样式前必读）

## 目录结构
- `index.html` — 页面结构：载入层、场景、HUD、面板、移动端 dock
- `styles/main.css` — 全部样式；宇宙强调色用 `body[data-universe]` + `--accent` 切换
- `scripts/app.js` — 全部逻辑（无依赖，约 400 行）
- `public/assets/desk-{comic,pixel,cyber,noir,water}.webp` — 5 张 1600×900 宇宙插画

## 关键实现
- **热点坐标**：`app.js` 的 `UNIVERSES[].hots`，图片百分比 `[x1,y1,x2,y2]`，**每个宇宙各自一份**（各图构图不同，由多模态视觉定位测得）。改图必须重测坐标。
- **cover 对齐**：`#sceneInner` 按 cover 数学换算成实际像素尺寸，热点用 % 定位在容器内，视差/拖动只改容器 transform。
- **转场**：`glitchTransition()` 在 `#fx` canvas 上画 14×8 网格随机延迟翻转 + 白闪 + RGB 切片，结束后交换 `.layer.active`。
- **内容**：`PANELS` 对象维护 5 个面板文案；`HOT_ORDER` 控制热点/dock 顺序。
- **场景内嵌图**：立牌与显示器里的画面是直接合成进 5 张 `desk-*.webp` 的（透视贴合 + 各宇宙风格化），非前端叠加。改图后重新透视合成并更新 `?v=` 版本号。
- **移动端**：`--dock-h` 媒体查询驱动底部控制栏与底部抽屉面板；热点在触屏仍可点，dock 是兜底入口。

## 开发注意
- 所有资源用**相对路径**（GitHub Pages 项目子路径可正常部署）。
- 中文字体走 `fonts.googleapis.cn`。
- 无后端、无 API；验证方式：`node --check scripts/app.js` + curl 探活。
- 修改样式前先读 `DESIGN.md`；禁止科技蓝渐变 / 玻璃拟态 / emoji 图标。
