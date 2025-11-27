// 圖片和視頻列表 - 精心設計的排版配置
// 每個項目包含：路徑、大小類別（1-17對應不同的grid布局）
const mediaItems = [
    { path: 'images/20240702_145523.jpg', size: 4 },  // 大圖 3x3
    { path: 'images/20240702_165000.jpg', size: 2 },  // 中圖 3x2
    { path: 'images/20250211_134006.jpg', size: 3 },  // 中圖 2x2
    { path: 'images/20250224_110639.jpg', size: 2 },  // 中圖 3x2
    { path: 'images/20250224_110709.jpg', size: 3 },  // 中圖 2x2
    { path: 'images/20250613_210014.jpg', size: 4 },  // 大圖 3x3
    { path: 'images/20250906_163210.jpg', size: 5 },  // 大圖 2x3
    { path: 'images/1754474666798-aec99603c8484c37bfcb68ec573e6120-800x1422.webp', size: 8 },  // 特大圖 3x4
    { path: 'images/Screenshot_20251009_185305_Photos.jpg', size: 2 },  // 中圖 3x2
    { path: 'images/Screenshot_20251009_185317_Photos.jpg', size: 6 },  // 大圖 4x2
    { path: 'images/PXL_20241128_101406662.MP.jpg', size: 4 },  // 大圖 3x3
    { path: 'images/PXL_20241129_025804958.jpg', size: 3 },  // 中圖 2x2
    { path: 'images/PXL_20250317_053117913.jpg', size: 2 },  // 中圖 3x2
    { path: 'images/Screenshot_20250503-233854.png', size: 7 },  // 特大圖 5x3
    { path: 'images/markup_1000002727.png', size: 3 },  // 中圖 2x2
    { path: 'images/markup_1000002728.png', size: 4 },  // 大圖 3x3
    { path: 'images/Screenshot_20250719-130133.png', size: 13 },  // 特大圖 4x3
    { path: 'images/PXL_20240923_094252902.mp4', size: 10, isVideo: true },  // 視頻 4x2
    { path: 'images/PXL_20241121_054245029.mp4', size: 16, isVideo: true }   // 視頻 5x2
];

// 載入圖片和視頻畫廊
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    mediaItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item size-${item.size}`;
        
        if (item.isVideo) {
            // 創建視頻元素
            const video = document.createElement('video');
            video.src = item.path;
            video.controls = true;
            video.muted = false;
            video.loop = false;
            video.playsInline = true;
            video.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
            
            // 視頻載入錯誤處理
            video.onerror = function() {
                galleryItem.style.display = 'none';
            };
            
            galleryItem.appendChild(video);
        } else {
            // 創建圖片元素
            const img = document.createElement('img');
            img.src = item.path;
            img.alt = `回憶 ${index + 1}`;
            img.loading = 'lazy';
            
            // 圖片載入錯誤處理
            img.onerror = function() {
                this.style.display = 'none';
                galleryItem.style.display = 'none';
            };
            
            // 點擊圖片放大
            galleryItem.addEventListener('click', function() {
                openImageModal(item.path);
            });
            
            galleryItem.appendChild(img);
        }
        
        galleryGrid.appendChild(galleryItem);
    });
}

// 打開圖片模態框
function openImageModal(mediaPath) {
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
    
    const isVideo = mediaPath.endsWith('.mp4');
    let mediaElement;
    
    if (isVideo) {
        mediaElement = document.createElement('video');
        mediaElement.src = mediaPath;
        mediaElement.controls = true;
        mediaElement.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(0, 212, 255, 0.5);
        `;
    } else {
        mediaElement = document.createElement('img');
        mediaElement.src = mediaPath;
        mediaElement.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(0, 212, 255, 0.5);
        `;
    }
    
    modal.appendChild(mediaElement);
    document.body.appendChild(modal);
    
    // 點擊關閉
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
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
    // 載入圖片和視頻畫廊
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
