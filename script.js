// --- 彈跳網球邏輯 (DVD Screensaver 風格) ---
const ball = document.getElementById('tennis-ball');

let x = Math.random() * (window.innerWidth - 40);
let y = Math.random() * (window.innerHeight - 40);
let dx = 2.5; // 水平速度
let dy = 2.5; // 垂直速度

function animateBall() {
    const ballSize = 40;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 移動
    x += dx;
    y += dy;
    
    // 碰到邊緣反彈
    if (x + ballSize >= windowWidth || x <= 0) {
        dx = -dx;
    }
    if (y + ballSize >= windowHeight || y <= 0) {
        dy = -dy;
    }
    
    // 更新位置
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
    
    requestAnimationFrame(animateBall);
}

// 啟動網球動畫
animateBall();

// 當視窗大小改變時，確保球不會卡在外面
window.addEventListener('resize', () => {
    x = Math.min(x, window.innerWidth - 40);
    y = Math.min(y, window.innerHeight - 40);
});

// --- 圖片點擊放大功能 (使用事件委托提升性能) ---
document.addEventListener('click', function(e) {
    if (e.target.closest('.masonry-item img')) {
        openImageModal(e.target.src);
    }
});

function openImageModal(imagePath) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = imagePath;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(0, 212, 255, 0.5);
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // 點擊關閉
    modal.addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    });
    
    // ESC鍵關閉
    const closeModal = (e) => {
        if (e.key === 'Escape') {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }, 300);
            document.removeEventListener('keydown', closeModal);
        }
    };
    document.addEventListener('keydown', closeModal);
}

// 添加CSS動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// --- 煙火效果 (優化性能) ---
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    const colors = ['#00d4ff', '#ffd700', '#8a2be2', '#ff6b6b', '#00ff88', '#ff00ff'];
    
    // 減少煙火數量
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 20px ${firework.style.backgroundColor}`;
            fireworksContainer.appendChild(firework);
            
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 1000);
        }, i * 200);
    }
}

// 隨機煙火效果 (降低頻率以提升性能)
function randomFireworks() {
    if (Math.random() < 0.08) { // 降低機率
        createFireworks();
    }
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    // 每15秒隨機觸發煙火效果 (降低頻率)
    setInterval(randomFireworks, 15000);
    
    // 頁面載入時觸發煙火效果
    setTimeout(createFireworks, 2000);
});

// 按 F 鍵觸發煙火
document.addEventListener('keydown', function(e) {
    if (e.key === 'f' || e.key === 'F') {
        createFireworks();
    }
});
