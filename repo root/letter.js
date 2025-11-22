const form = document.getElementById("letterForm");
const previewBox = document.getElementById("previewBox");
const previewBtn = document.getElementById("previewBtn");

function buildLetterText() {
  const fromName = document.getElementById("fromName").value.trim();
  const toName = document.getElementById("toName").value.trim();
  const message = document.getElementById("message").value.trim();
  const addSignature = document.getElementById("addSignature").checked;

  const lines = [];

  if (toName) {
    lines.push(`${toName}에게,`);
    lines.push("");
  }

  if (message) {
    lines.push(message);
    lines.push("");
  }

  if (addSignature) {
    lines.push(`From. ${fromName || "익명 산타"}`);
  }

  if (!lines.length) {
    lines.push("(아직 내용이 없습니다)");
  }

  return lines.join("\n");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const toEmail = document.getElementById("toEmail").value.trim();
  if (!toEmail) {
    alert("받는 사람 이메일 주소를 입력해 주세요.");
    return;
  }

  const fromName = document.getElementById("fromName").value.trim();
  const subject = `🎄 크리스마스 편지 from ${fromName || "익명 산타"}`;
  const body = buildLetterText();

  const mailtoLink =
    "mailto:" +
    encodeURIComponent(toEmail) +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  // 메일 프로그램 열기
  window.location.href = mailtoLink;
});

previewBtn.addEventListener("click", function () {
  const body = buildLetterText();
  previewBox.textContent = body;
});
