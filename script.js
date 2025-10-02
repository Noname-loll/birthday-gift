// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Магический сайт загружен! 🎂✨');
    
    // Скрываем основной сайт при загрузке
    document.getElementById('mainSite').style.display = 'none';
    
    // Показываем экран с тортом
    document.getElementById('cakeScreen').style.display = 'flex';
    
    // Добавляем подсказку про встряхивание
    addShakeHint();
    
    // Инициализируем обработчик встряхивания
    initShakeDetection();
});

// Добавляем подсказку про встряхивание
function addShakeHint() {
    const cakeMessage = document.querySelector('.cake-message');
    const shakeHint = document.createElement('p');
    shakeHint.className = 'shake-hint';
    shakeHint.textContent = 'Или встряхни телефон, чтобы задуть свечу! 📱💨';
    cakeMessage.appendChild(shakeHint);
}

// Обнаружение встряхивания телефона
let lastShakeTime = 0;
let shakeCount = 0;

function initShakeDetection() {
    if (window.DeviceMotionEvent) {
        let lastX, lastY, lastZ;
        let threshold = 15; // чувствительность встряхивания
        
        window.addEventListener('devicemotion', function(event) {
            const acceleration = event.accelerationIncludingGravity;
            const currentTime = new Date().getTime();
            
            if ((currentTime - lastShakeTime) > 1000) { // не чаще чем раз в секунду
                const deltaX = Math.abs(lastX - acceleration.x);
                const deltaY = Math.abs(lastY - acceleration.y);
                const deltaZ = Math.abs(lastZ - acceleration.z);
                
                if ((deltaX > threshold && deltaY > threshold) || 
                    (deltaX > threshold && deltaZ > threshold) || 
                    (deltaY > threshold && deltaZ > threshold)) {
                    
                    shakeCount++;
                    if (shakeCount >= 2) { // нужно 2 встряхивания
                        makeWish();
                        shakeCount = 0;
                    }
                    lastShakeTime = currentTime;
                }
                
                lastX = acceleration.x;
                lastY = acceleration.y;
                lastZ = acceleration.z;
            }
        });
    } else {
        console.log('DeviceMotion не поддерживается');
    }
}

// Функция для задувания свечи
function makeWish() {
    const flame = document.querySelector('.flame');
    const cake = document.querySelector('.birthday-cake');
    
    // Если уже задували, выходим
    if (cake.style.pointerEvents === 'none') return;
    
    // Отключаем повторные клики/встряхивания
    cake.style.pointerEvents = 'none';
    
    // Останавливаем анимацию мерцания
    flame.style.animation = 'none';
    
    // Анимация задувания
    flame.style.transition = 'all 0.5s ease';
    flame.style.opacity = '0';
    flame.style.transform = 'translateX(-50%) scale(0.1)';
    flame.style.boxShadow = '0 0 5px rgba(255, 107, 53, 0.3)';
    
    // Показываем дым
    createSmoke();
    
    // Анимация исчезновения торта
    setTimeout(() => {
        document.querySelector('.cake-container').style.opacity = '0';
        document.querySelector('.cake-container').style.transform = 'translateY(50px)';
    }, 1000);
    
    // Переход к основному сайту через 2 секунды
    setTimeout(() => {
        document.getElementById('cakeScreen').style.display = 'none';
        document.getElementById('mainSite').style.display = 'block';
        
        // Инициализируем основную страницу
        initializeMainPage();
    }, 2000);
}

// Создание дыма при задувании свечи
function createSmoke() {
    const candle = document.querySelector('.candle');
    
    for (let i = 0; i < 8; i++) { // Больше дыма
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.style.cssText = `
                position: absolute;
                top: -25px;
                left: 50%;
                width: 6px;
                height: 6px;
                background: #666;
                border-radius: 50%;
                opacity: 0.7;
                transform: translateX(-50%);
                animation: smokeRise 2s ease-out forwards;
            `;
            
            candle.appendChild(smoke);
            
            // Удаляем элемент после анимации
            setTimeout(() => {
                if (smoke.parentNode) {
                    smoke.parentNode.removeChild(smoke);
                }
            }, 2000);
        }, i * 150);
    }
}

// Анимация дыма
const style = document.createElement('style');
style.textContent = `
    @keyframes smokeRise {
        0% {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 0.7;
        }
        50% {
            transform: translateX(${Math.random() * 40 - 20}px) translateY(-50px) scale(2);
            opacity: 0.4;
        }
        100% {
            transform: translateX(${Math.random() * 60 - 30}px) translateY(-100px) scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация основной страницы
function initializeMainPage() {
    console.log('Основная страница инициализирована! ✨');
    
    // Инициализируем свиток
    const magicScroll = document.getElementById('magicScroll');
    setTimeout(() => {
        magicScroll.classList.add('unrolled');
    }, 500);
    
    // Добавляем немного магических частиц при загрузке
    setTimeout(() => {
        createMagicParticles();
    }, 1000);
}

// Предсказания для магических предметов
const predictions = {
    wand: "Волшебная палочка предсказывает: Этот год принесет тебе невероятные возможности для роста! Ты освоишь новые 'заклинания' в реальной жизни - возможно, новый навык или хобби, которое изменит всё.",
    mirror: "Зеркальце Эрисед показывает: Ты увидишь свое самое заветное желание на пути к осуществлению. Помни - настоящая магия в том, чтобы видеть себя такой, какая ты есть, и такой, какой можешь стать.",
    crystal: "Магический кристалл вещает: Грядет время больших перемен! Как симовский персонаж, ты 'увеличишь' свои характеристики - мудрость возрастет через новые знания, а счастье через неожиданные встречи.",
    potion: "Зелье удачи нашептывает: В этом году тебя ждет 'критический успех' в важном деле! Как будто твой сим получил черту 'Удачливый'. Используй это время для смелых решений.",
    blueprint: "План Симс раскрывает: Твоя жизнь подобна хорошо спроектированному дому в Симс - в этом году ты 'достроишь' важные 'комнаты' своей судьбы. Ожидай карьерный рост или творческий прорыв!"
};

// Показ предсказания
function showPrediction(item) {
    const predictionText = document.getElementById('predictionText');
    const magicScroll = document.getElementById('magicScroll');
    
    // Анимация исчезновения текста
    predictionText.style.opacity = '0';
    predictionText.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        // Устанавливаем новый текст
        predictionText.textContent = predictions[item];
        
        // Анимация появления текста
        predictionText.style.opacity = '1';
        predictionText.style.transform = 'translateY(0)';
        
        // Анимация свитка
        magicScroll.style.transform = 'scale(0.98)';
        setTimeout(() => {
            magicScroll.style.transform = 'scale(1)';
        }, 200);
        
        // Создаем магические эффекты
        createMagicEffect(item);
        
    }, 300);
}

// Создание магического эффекта при выборе предмета
function createMagicEffect(item) {
    const colors = {
        wand: '#d4af37',
        mirror: '#87CEEB',
        crystal: '#9370DB',
        potion: '#32CD32',
        blueprint: '#FF6347'
    };
    
    createParticles(colors[item]);
}

// Создание частиц
function createParticles(color = '#d4af37') {
    const container = document.querySelector('.scroll-container');
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            top: 50%;
            left: 50%;
            opacity: 0.8;
        `;
        
        container.appendChild(particle);
        
        // Случайное направление
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const duration = 1 + Math.random() * 1;
        
        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.8
            },
            {
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'ease-out'
        });
        
        // Удаляем частицу после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}

// Создание падающих листьев
function createLeaves() {
    const leavesContainer = document.getElementById('leavesContainer');
    
    // Очищаем предыдущие листья
    leavesContainer.innerHTML = '';
    
    // Создаем 20 новых листьев
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            // Случайная позиция по горизонтали
            const left = Math.random() * 100;
            
            // Случайная задержка и продолжительность
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 4;
            
            leaf.style.cssText = `
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            leavesContainer.appendChild(leaf);
            
            // Удаляем лист после анимации
            setTimeout(() => {
                if (leaf.parentNode) {
                    leaf.parentNode.removeChild(leaf);
                }
            }, (delay + duration) * 1000);
            
        }, i * 200);
    }
}

// Создание магических частиц при загрузке
function createMagicParticles() {
    setTimeout(() => {
        create
