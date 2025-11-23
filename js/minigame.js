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
        // 게임 영역에 캔버스 삽입
        gameArea.innerHTML = `
            <div id="game-controls">
                <button id="startGameBtn" class="button-red">시작하기</button>
                <div id="scoreDisplay" style="color: white; font-size: 1.2em; margin-top: 10px;">점수: 0</div>
            </div>
            <canvas id="fallingGiftsCanvas" width="600" height="400" style="background-color: #0F2027; border: 2px solid white; margin-top: 10px;"></canvas>
            <div id="gameOverMessage" style="color: red; font-size: 2em; display: none;">GAME OVER!</div>
        `;
        
        const canvas = document.getElementById('fallingGiftsCanvas');
        const ctx = canvas.getContext('2d');
        const startGameBtn = document.getElementById('startGameBtn');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const gameOverMessage = document.getElementById('gameOverMessage');

        let score = 0;
        let isGameOver = false;
        let animationFrameId;
        
        // --- 플레이어 (바구니) 설정 ---
        const player = {
            width: 60,
            height: 10,
            x: canvas.width / 2 - 30,
            y: canvas.height - 20,
            speed: 5,
            color: 'brown',
            movingLeft: false,
            movingRight: false,
            draw: function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };

        // --- 선물 객체 배열 ---
        let gifts = [];

        // --- 선물 생성 함수 ---
        function createGift() {
            const gift = {
                size: Math.random() * 10 + 15, // 크기 15~25
                x: Math.random() * (canvas.width - 25),
                y: 0,
                speed: Math.random() * 1 + 2, // 속도 2~3
                color: ['red', 'green', 'gold'][Math.floor(Math.random() * 3)],
                draw: function() {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.size, this.size);
                    // 선물 리본 (단순화)
                    ctx.fillStyle = 'white';
                    ctx.fillRect(this.x + this.size / 2 - 2, this.y, 4, this.size);
                    ctx.fillRect(this.x, this.y + this.size / 2 - 2, this.size, 4);
                }
            };
            gifts.push(gift);
        }

        // --- 충돌 감지 및 처리 ---
        function updateGame() {
            // 1. 화면 지우기
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 2. 플레이어 이동 처리
            if (player.movingLeft && player.x > 0) {
                player.x -= player.speed;
            }
            if (player.movingRight && player.x < canvas.width - player.width) {
                player.x += player.speed;
            }
            player.draw();

            // 3. 선물 업데이트 및 충돌 검사
            for (let i = 0; i < gifts.length; i++) {
                const gift = gifts[i];
                gift.y += gift.speed;
                gift.draw();

                // 🎁 충돌 검사 (선물이 바구니에 닿았는지)
                if (gift.y + gift.size >= player.y && 
                    gift.x + gift.size > player.x && 
                    gift.x < player.x + player.width) {
                    
                    score += 10;
                    scoreDisplay.textContent = `점수: ${score}`;
                    gifts.splice(i, 1); // 선물 제거
                    i--; // 인덱스 보정
                } 
                // ❌ 선물 놓침 (바닥에 닿았는지)
                else if (gift.y > canvas.height) {
                    isGameOver = true;
                    gameOverMessage.style.display = 'block';
                    gifts.splice(i, 1);
                    i--;
                }
            }
            
            // 4. 게임 루프 반복
            if (!isGameOver) {
                animationFrameId = requestAnimationFrame(updateGame);
            } else {
                // 게임 종료 시 선물 생성 인터벌 중지
                clearInterval(giftInterval);
            }
        }
        
        let giftInterval; // 선물 생성 인터벌 ID

        // --- 게임 시작/초기화 ---
        function startGame() {
            // 상태 초기화
            score = 0;
            gifts = [];
            isGameOver = false;
            player.x = canvas.width / 2 - 30;
            scoreDisplay.textContent = `점수: ${score}`;
            gameOverMessage.style.display = 'none';

            // 키보드 이벤트 리스너 (반복 추가 방지를 위해 한 번만 실행)
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            
            // 기존 애니메이션 프레임 중지 (혹시 모를 이전 실행 방지)
            cancelAnimationFrame(animationFrameId);
            
            // 게임 루프 시작
            updateGame();

            // 선물 생성 시작 (1초마다)
            clearInterval(giftInterval);
            giftInterval = setInterval(createGift, 1000);
        }

        // --- 키보드 이벤트 핸들러 ---
        function handleKeyDown(e) {
            if (isGameOver) return;
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                player.movingLeft = true;
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                player.movingRight = true;
            }
        }

        function handleKeyUp(e) {
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                player.movingLeft = false;
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                player.movingRight = false;
            }
        }

        // 시작 버튼 이벤트
        startGameBtn.addEventListener('click', startGame);

        // 페이지 이동 시 이벤트 제거 (클린업)
        const cleanup = () => {
            clearInterval(giftInterval);
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            startGameBtn.removeEventListener('click', startGame);
        };
        // NOTE: 이 cleanup 함수를 페이지 네비게이션이 발생할 때 호출해야 합니다.
        // (현재는 페이지가 이동될 때 자동으로 이벤트 리스너가 제거됩니다.)
    }

    // --- 2. 산타 피하기 게임 (더미 유지) ---
    function loadSantaDodgeGame() {
        gameArea.innerHTML = `
            <h2>🎅 산타 피하기 게임</h2>
            <canvas id="santaDodgeCanvas" width="800" height="480" style="background-color: #0F2027; border: 2px solid white;"></canvas>
            <p style="color: white; margin-top: 10px;">산타 피하기 게임 로직을 여기에 구현하세요.</p>
        `;
    }

    // --- 3. 눈송이 터뜨리기 게임 (더미 유지) ---
    function loadSnowClickerGame() {
        gameArea.innerHTML = `
            <h2>🌨️ 눈송이 터뜨리기</h2>
            <div id="snowClickerContainer" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; color: white;">
                <p>눈송이 터뜨리기 게임 로직을 여기에 구현하세요 (예: DOM 조작 기반).</p>
                <button class="button-green" style="margin-top: 20px;">눈송이 생성 시작</button>
            </div>
        `;
    }
});

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