// theme.js

const THEME_KEY = "christmas-theme";

function applyTheme(theme) {
  const body = document.body;
  body.setAttribute("data-theme", theme);

  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  if (theme === "light") {
    toggleBtn.textContent = "🌙"; // 지금은 라이트 → 누르면 다크
    toggleBtn.title = "다크 모드로 전환";
  } else {
    toggleBtn.textContent = "☀️"; // 지금은 다크 → 누르면 라이트
    toggleBtn.title = "화이트 모드로 전환";
  }
}

function toggleTheme() {
  const current = document.body.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

document.addEventListener("DOMContentLoaded", () => {
  // 저장된 테마 불러오기 (없으면 기본 다크)
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(saved);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }
});
