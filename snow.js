// snow.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("snowToggle");
  const snowLayer = document.querySelector(".snow-overlay");

  if (!toggleBtn || !snowLayer) return;

  // 기본: 눈 켜짐 상태
  let isSnowOn = true;

  function updateSnow() {
    if (isSnowOn) {
      snowLayer.style.opacity = "1";
      toggleBtn.textContent = "❄ 눈 끄기";
    } else {
      snowLayer.style.opacity = "0";
      toggleBtn.textContent = "❄ 눈 켜기";
    }
  }

  toggleBtn.addEventListener("click", () => {
    isSnowOn = !isSnowOn;
    updateSnow();
  });

  updateSnow();
});
