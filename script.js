// Функция для задувания свечи и перехода к сайту
function makeWish(event) {
    event.stopPropagation(); // Чтобы не срабатывал клик на торт
    
    const flame = document.querySelector('.flame');
    const candle = document.querySelector('.candle');
    
    // Анимация задувания свечи
    flame.style.animation = 'none';
    flame.style.opacity = '0';
    flame.style.transform = 'translateX(-50%) scale(0.5)';
    
    // Добавляем дымок
    const smoke = document.createElement('div');
    smoke.style.cssText = `
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 5px;
        height: 5px;
        background: #888;
        border-radius: 50%;
        animation: smoke 2s ease-out forwards;
    `;
    candle.appendChild(smoke);
    
    // Добавляем стили для дымка
    const smokeStyle = document.createElement('style');
    smokeStyle.textContent = `
        @keyframes smoke {
            0% {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-50px) scale(3);
            }
        }
    `;
    document.head.appendChild(smokeStyle);
    
    setTimeout(startCelebration, 1000);
}

function startCelebration() {
    const cakeScreen = document.getElementById('cakeScreen');
    const mainSite = document.getElementById('mainSite');
    
    // Анимация исчезновения торта
    cakeScreen.style.opacity = '0';
    cakeScreen.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        cakeScreen.style.display = 'none';
        mainSite.style.display = 'block';
        
        // Добавляем небольшую анимацию появления основного сайта
        mainSite.style.opacity = '0';
        mainSite.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            mainSite.style.opacity = '1';
        }, 100);
    }, 1000);
}

// Функция для создания падающих листьев при клике на сову
function createLeaves() {
    const leavesContainer = document.getElementById('leavesContainer');
    const colors = ['#d4af37', '#8b7511', '#b8860b', '#daa520'];
    
    // Создаем 15 листьев
    for (let i = 0; i < 15; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        const size = Math.random() * 15 + 10;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        leaf.style.cssText = `
            left: ${Math.random() * 100}vw;
            top: -30px;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]});
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        leavesContainer.appendChild(leaf);
        
        // Удаляем лист после анимации
        setTimeout(() => {
            if (leaf.parentNode) {
                leaf.remove();
            }
        }, (duration + delay) * 1000);
    }
}

// Предсказания для каждого предмета
const predictions = {
    wand: "В этом году твоя палочка выберет для тебя путь 'Expelliarmus!' — он мягко уберет с твоего пути всех негативных людей и ситуации. Ты получишь неожиданное предложение, от которого невозможно отказаться! Твой навык 'Магия' повысится до максимума.",
    
    mirror: "О, всадник радости! В зеркале Еиналеж ты увидишь свое самое заветное желание, которое начинает сбываться уже в этом месяце. Не забывай тратить на него очки вдохновения, и скоро твоя шкала 'Счастья' будет переполнена!",
    
    crystal: "Кристалл судьбы предрекает тебе период большого творчества! Ты будешь строить и обустраивать свой 'идеальный дом' как в Симс, будь то новое хобби, проект или реальное жилье. Твоя шкала 'Комфорта' скоро достигнет максимума!",
    
    potion: "Это зелье 'Феликс Фелицис' для твоей карьеры! Грядет удача в профессиональной сфере — не упусти свой шанс. Твоя шкала 'Карьера' вот-вот получит долгожданное повышение!",
    
    blueprint: "Госпожа Судьба использует читы! В этом году у тебя будет +50000 симолеонов на реализацию самой безумной идеи. Не бойся ставить большие цели — все двери откроются перед тобой, как по магии 'Алохомора'!"
};

// Функция показа предсказания
function showPrediction(item) {
    const scroll = document.getElementById('magicScroll');
    const predictionText = document.getElementById('predictionText');
    
    // Добавляем класс для анимации разворачивания
    scroll.classList.add('unrolled');
    
    // Устанавливаем текст предсказания
    predictionText.textContent = predictions[item];
    
    // Добавляем магический эффект
    predictionText.style.animation = 'textAppear 0.8s ease-out';
    
    // Убираем анимацию для возможности повторного использования
    setTimeout(() => {
        predictionText.style.animation = '';
    }, 800);
}

// Пасхалка
function showEasterEgg() {
    document.getElementById('easterEgg').style.display = 'flex';
}

function hideEasterEgg() {
    document.getElementById('easterEgg').style.display = 'none';
}

// Добавляем CSS для анимации текста
const style = document.createElement('style');
style.textContent = `
    @keyframes textAppear {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Магический сайт загружен! 🎂✨');
    
    // Добавляем обработчики для магических предметов
    const magicItems = document.querySelectorAll('.magic-item');
    magicItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
