// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Магический сайт загружен! 🎂✨');
    
    // Скрываем основной сайт при загрузке
    document.getElementById('mainSite').style.display = 'none';
    
    // Добавляем обработчик клика на торт
    const cake = document.querySelector('.birthday-cake');
    cake.addEventListener('click', makeWish);
});

// Функция для задувания свечи
function makeWish() {
    const flame = document.querySelector('.flame');
    
    // Останавливаем анимацию мерцания
    flame.style.animation = 'none';
    
    // Анимация задувания
    flame.style.transition = 'all 0.5s ease';
    flame.style.opacity = '0';
    flame.style.transform = 'translateX(-50%) scale(0.1)';
    
    // Ждем окончания анимации и переходим к сайту
    setTimeout(() => {
        const cakeScreen = document.getElementById('cakeScreen');
        const mainSite = document.getElementById('mainSite');
        
        // Плавно скрываем торт
        cakeScreen.style.transition = 'opacity 1s ease';
        cakeScreen.style.opacity = '0';
        
        setTimeout(() => {
            cakeScreen.style.display = 'none';
            mainSite.style.display = 'block';
        }, 1000);
    }, 500);
}

// Функция для создания падающих листьев
function createLeaves() {
    const leavesContainer = document.getElementById('leavesContainer');
    const colors = ['#d4af37', '#8b7511', '#b8860b', '#daa520'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            const size = Math.random() * 15 + 10;
            const duration = Math.random() * 3 + 2;
            const left = Math.random() * 100;
            
            leaf.style.cssText = `
                left: ${left}vw;
                top: -30px;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]});
                animation: fall ${duration}s linear forwards;
                opacity: 0.8;
            `;
            
            leavesContainer.appendChild(leaf);
            
            setTimeout(() => {
                if (leaf.parentNode) leaf.remove();
            }, duration * 1000);
        }, i * 150);
    }
}

// Предсказания
const predictions = {
    wand: "В этом году твоя палочка выберет для тебя путь 'Expelliarmus!' — он мягко уберет с твоего пути всех негативных людей и ситуации. Ты получишь неожиданное предложение, от которого невозможно отказаться! Твой навык 'Магия' повысится до максимума.",
    mirror: "О, всадник радости! В зеркале Еиналеж ты увидишь свое самое заветное желание, которое начинает сбываться уже в этом месяце. Не забывай тратить на него очки вдохновения, и скоро твоя шкала 'Счастья' будет переполнена!",
    crystal: "Кристалл судьбы предрекает тебе период большого творчества! Ты будешь строить и обустраивать свой 'идеальный дом' как в Симс, будь то новое хобби, проект или реальное жилье. Твоя шкала 'Комфорта' скоро достигнет максимума!",
    potion: "Это зелье 'Феликс Фелицис' для твоей карьеры! Грядет удача в профессиональной сфере — не упусти свой шанс. Твоя шкала 'Карьера' вот-вот получит долгожданное повышение!",
    blueprint: "Госпожа Судьба использует читы! В этом году у тебя будет +50000 симолеонов на реализацию самой безумной идеи. Не бойся ставить большие цели — все двери откроются перед тобой, как по магии 'Алохомора'!"
};

function showPrediction(item) {
    const scroll = document.getElementById('magicScroll');
    const predictionText = document.getElementById('predictionText');
    
    scroll.classList.add('unrolled');
    predictionText.textContent = predictions[item];
    predictionText.style.animation = 'textAppear 0.8s ease-out';
    
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

// Анимация текста
const style = document.createElement('style');
style.textContent = `
    @keyframes textAppear {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
