// 圖片列表
const images = [
    'images/20240702_145523.jpg',
    'images/20240702_165000.jpg',
    'images/20250211_134006.jpg',
    'images/20250224_110639.jpg',
    'images/20250224_110709.jpg',
    'images/20250613_210014.jpg',
    'images/20250906_163210.jpg',
    'images/1754474666798-aec99603c8484c37bfcb68ec573e6120-800x1422.webp',
    'images/Screenshot_20251009_185305_Photos.jpg',
    'images/Screenshot_20251009_185317_Photos.jpg',
    'images/PXL_20241128_101406662.MP.jpg',
    'images/PXL_20241129_025804958.jpg',
    'images/PXL_20250317_053117913.jpg',
    'images/Screenshot_20250503-233854.png',
    'images/markup_1000002727.png',
    'images/markup_1000002728.png',
    'images/Screenshot_20250719-130133.png'
];

// 隨機打亂圖片順序
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 載入圖片畫廊
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const shuffledImages = shuffleArray(images);
    
    shuffledImages.forEach((imagePath, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // 隨機選擇一些圖片作為大圖（約30%的機率）
        if (Math.random() < 0.3 && index < shuffledImages.length - 3) {
            galleryItem.classList.add('large');
        }
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `回憶 ${index + 1}`;
        img.loading = 'lazy';
        
        // 圖片載入錯誤處理
        img.onerror = function() {
            this.style.display = 'none';
            galleryItem.style.display = 'none';
        };
        
        // 點擊圖片放大
        galleryItem.addEventListener('click', function() {
            openImageModal(imagePath);
        });
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
    });
}

// 打開圖片模態框
function openImageModal(imagePath) {
    // 創建模態框
    const modal = document.createElement('div');
    modal.className = 'image-modal';
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
        z-index: 1000;
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
            document.body.removeChild(modal);
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

// 煙火效果
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    const colors = ['#00d4ff', '#ffd700', '#8a2be2', '#ff6b6b', '#00ff88', '#ff00ff'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 20px ${firework.style.backgroundColor}`;
            fireworksContainer.appendChild(firework);
            
            // 移除煙火元素
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 1000);
        }, i * 150);
    }
}

// 隨機煙火效果（定期觸發）
function randomFireworks() {
    if (Math.random() < 0.15) { // 15% 機率觸發煙火
        createFireworks();
    }
}

// 滾動動畫
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.gallery-item, .blessing-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    // 載入圖片畫廊
    loadGallery();
    
    // 每8秒隨機觸發煙火效果
    setInterval(randomFireworks, 8000);
    
    // 頁面載入時觸發煙火效果
    setTimeout(createFireworks, 1500);
    
    // 滾動事件
    window.addEventListener('scroll', handleScrollAnimation);
    
    // 初始觸發一次滾動動畫
    handleScrollAnimation();
});

// 添加鍵盤快捷鍵
document.addEventListener('keydown', function(e) {
    if (e.key === 'f' || e.key === 'F') {
        createFireworks();
    }
});

// 添加觸摸設備支持
if ('ontouchstart' in window) {
    let touchCount = 0;
    document.addEventListener('touchstart', function(e) {
        touchCount++;
        if (touchCount === 3) {
            createFireworks();
            touchCount = 0;
        }
        setTimeout(() => {
            touchCount = 0;
        }, 1000);
    });
}

