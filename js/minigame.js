document.addEventListener('DOMContentLoaded', () => {
    const gameSelection = document.querySelector('.game-selection');
    const gameArea = document.getElementById('game-area');

    // --- 게임 선택 핸들러 ---
    gameSelection.addEventListener('click', (e) => {
        const card = e.target.closest('.game-card');
        if (!card) return;

        const gameType = card.getAttribute('data-game');
        
        // 이전에 실행 중이던 게임 초기화 (필요시)
        gameArea.innerHTML = `<p>게임 로드 중: ${gameType}...</p>`;

        // 선택된 게임에 따라 다른 로직을 호출 (주석 처리된 부분에 실제 게임 로직이 들어갑니다)
        switch (gameType) {
            case 'falling-gifts':
                loadFallingGiftsGame();
                break;
            case 'santa-dodge':
                loadSantaDodgeGame();
                break;
            case 'snow-clicker':
                loadSnowClickerGame();
                break;
            default:
                gameArea.innerHTML = '<p>게임을 찾을 수 없습니다.</p>';
        }
    });

    // --- 1. 선물 잡기 게임 (더미) ---
    function loadFallingGiftsGame() {
        gameArea.innerHTML = `
            <h2>🎁 선물 잡기 게임</h2>
            <canvas id="fallingGiftsCanvas" width="800" height="480" style="background-color: #000; border: 2px solid white;"></canvas>
            <p>선물 잡기 게임 로직을 여기에 구현하세요 (예: 캔버스 기반).</p>
        `;
        // 실제 게임 로직 (Canvas API 또는 게임 라이브러리) 시작 지점
    }

    // --- 2. 산타 피하기 게임 (더미) ---
    function loadSantaDodgeGame() {
        gameArea.innerHTML = `
            <h2>🎅 산타 피하기 게임</h2>
            <canvas id="santaDodgeCanvas" width="800" height="480" style="background-color: #000; border: 2px solid white;"></canvas>
            <p>산타 피하기 게임 로직을 여기에 구현하세요.</p>
        `;
    }

    // --- 3. 눈송이 터뜨리기 게임 (더미) ---
    function loadSnowClickerGame() {
        gameArea.innerHTML = `
            <h2>🌨️ 눈송이 터뜨리기</h2>
            <div id="snowClickerContainer" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
                <p>눈송이 터뜨리기 게임 로직을 여기에 구현하세요 (예: DOM 조작 기반).</p>
                <button class="button-green" style="margin-top: 20px;">눈송이 생성 시작</button>
            </div>
        `;
    }
});