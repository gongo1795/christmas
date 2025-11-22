const ornamentButtons = document.querySelectorAll(".ornament-btn");
const treeArea = document.getElementById("tree-area");
const clearTreeBtn = document.getElementById("clearTreeBtn");

let currentEmoji = "🔴"; // 기본 선택

ornamentButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    ornamentButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentEmoji = btn.dataset.emoji;
  });
});

treeArea.addEventListener("click", (e) => {
  // 트리 영역 내에서의 좌표 계산
  const rect = treeArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 장식 요소 생성
  const ornament = document.createElement("div");
  ornament.className = "ornament";
  ornament.textContent = currentEmoji;
  ornament.style.left = x + "px";
  ornament.style.top = y + "px";

  treeArea.appendChild(ornament);
});

// 장식 초기화
clearTreeBtn.addEventListener("click", () => {
  const ornaments = treeArea.querySelectorAll(".ornament");
  ornaments.forEach((o) => o.remove());
});
