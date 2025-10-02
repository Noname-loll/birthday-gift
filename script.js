// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Магический сайт загружен! 🎂✨');
    
    // Скрываем основной сайт при загрузке
    document.getElementById('mainSite').style.display = 'none';
    
    // Добавляем обработчик клика на свечу
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');
    
    candle.addEventListener('click', makeWish);
    flame.addEventListener('click', makeWish);
    
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
    
    // Добавляем обработчик для совы (падающие листья)
    const owlContainer = document.querySelector('.owl-container');
    owlContainer.addEventListener('click', createLeaves);
});

// Функция для задувания свечи и перехода к сайту
function makeWish(event) {
    event.stopPropagation();
    
    const flame = document.querySelector('.flame');
    const candle = document.querySelector('.candle');
    
    // Останавливаем анимацию мерцания
    flame.style.animation = 'none';
    
    // Анимация задувания
    flame.style.transition = 'all 0.5s ease';
    flame.style.opacity = '0';
    flame.style.transform = 'translateX(-50%) scale(0.1)';
    
    // Создаем несколько дымков
    createSmoke(candle, 3);
    
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
            
            // Плавно показываем основной сайт
            setTimeout(() => {
                mainSite.style.opacity = '1';
            }, 50);
        }, 1000);
    }, 800);
}

// Функция создания дымка
function createSmoke(candle, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            smoke.style.cssText = `
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                width: 8px;
                height: 8px;
                background: rgba(136, 136, 136, 0.8);
                border-radius: 50%;
                animation: smokeRise 2s ease-out forwards;
            `;
            candle.appendChild(smoke);
            
            // Удаляем дымок после анимации
            setTimeout(() => {
                if (smoke.parentNode) {
                    smoke.remove();
                }
            }, 2000);
        }, i * 200);
    }
    
    // Добавляем стили для дымка если их еще нет
    if (!document.querySelector('#smokeStyles')) {
        const smokeStyle = document.createElement('style');
        smokeStyle.id = 'smokeStyles';
        smokeStyle.textContent = `
            @keyframes smokeRise {
                0% {
                    opacity: 0.8;
                    transform: translateX(-50%) translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateX(${Math.random() * 40 - 20}px) translateY(-80px) scale(2.5);
                }
            }
        `;
        document.head.appendChild(smokeStyle);
    }
}

// Функция для создания падающих листьев при клике на сову
function createLeaves() {
    const leavesContainer = document.getElementById('leavesContainer');
    const colors = ['#d4af37', '#8b7511', '#b8860b', '#daa520'];
    
    // Создаем 12 листьев
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            const size = Math.random() * 15 + 10;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random();
            const left = Math.random() * 100;
            
            leaf.style.cssText = `
                left: ${left}vw;
                top: -30px;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]});
                animation: fall ${duration}s linear ${delay}s forwards;
                opacity: 0.8;
            `;
            
            leavesContainer.appendChild(leaf);
            
            // Удаляем лист после анимации
            setTimeout(() => {
                if (leaf.parentNode) {
                    leaf.remove();
                }
            }, (duration + delay) * 1000);
        }, i * 150);
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
const textAppearStyle = document.createElement('style');
textAppearStyle.textContent = `
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
document.head.appendChild(textAppearStyle);
