// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Магический сайт загружен! 🎂✨');
    
    // Скрываем основной сайт при загрузке
    document.getElementById('mainSite').style.display = 'none';
    
    // Показываем экран с тортом
    document.getElementById('cakeScreen').style.display = 'flex';
    
    // Инициализируем обработчик встряхивания
    initShakeDetection();
});

// Обнаружение встряхивания телефона
let lastShakeTime = 0;
let shakeCount = 0;

function initShakeDetection() {
    if (window.DeviceMotionEvent) {
        let lastX = null, lastY = null, lastZ = null;
        const threshold = 12; // чувствительность встряхивания
        
        window.addEventListener('devicemotion', function(event) {
            const acceleration = event.accelerationIncludingGravity;
            if (!acceleration) return;
            
            const currentTime = new Date().getTime();
            
            if ((currentTime - lastShakeTime) > 800) { // не чаще чем раз в 0.8 секунды
                if (lastX !== null && lastY !== null && lastZ !== null) {
                    const deltaX = Math.abs(lastX - acceleration.x);
                    const deltaY = Math.abs(lastY - acceleration.y);
                    const deltaZ = Math.abs(lastZ - acceleration.z);
                    
                    if ((deltaX > threshold && deltaY > threshold) || 
                        (deltaX > threshold && deltaZ > threshold) || 
                        (deltaY > threshold && deltaZ > threshold)) {
                        
                        shakeCount++;
                        if (shakeCount >= 2) { // нужно 2 встряхивания
                            console.log('Встряхивание обнаружено! Задуваем свечу...');
                            makeWish();
                            shakeCount = 0;
                        }
                        lastShakeTime = currentTime;
                    }
                }
                
                lastX = acceleration.x;
                lastY = acceleration.y;
                lastZ = acceleration.z;
            }
        });
        
        console.log('Детектор встряхивания активирован 📱');
    } else {
        console.log('DeviceMotion не поддерживается на этом устройстве');
        // Скрываем подсказку про встряхивание если не поддерживается
        const shakeHint = document.querySelector('.shake-hint');
        if (shakeHint) {
            shakeHint.style.display = 'none';
        }
    }
}

// Функция для задувания свечи
function makeWish() {
    const flame = document.querySelector('.flame');
    const cake = document.querySelector('.birthday-cake');
    
    // Если уже задували, выходим
    if (cake.style.pointerEvents === 'none') return;
    
    console.log('Задуваем свечу... 🎂💨');
    
    // Отключаем повторные клики/встряхивания
    cake.style.pointerEvents = 'none';
    
    // Останавливаем анимацию мерцания
    flame.style.animation = 'none';
    
    // Анимация задувания
    flame.style.transition = 'all 0.8s ease';
    flame.style.opacity = '0';
    flame.style.transform = 'translateX(-50%) scale(0.1)';
    flame.style.boxShadow = '0 0 5px rgba(255, 107, 53, 0.2)';
    
    // Показываем дым
    createSmoke();
    
    // Анимация исчезновения торта
    setTimeout(() => {
        const cakeContainer = document.querySelector('.cake-container');
        cakeContainer.style.transition = 'all 1s ease';
        cakeContainer.style.opacity = '0';
        cakeContainer.style.transform = 'translateY(30px) scale(0.9)';
    }, 1000);
    
    // Переход к основному сайту через 2.5 секунды
    setTimeout(() => {
        document.getElementById('cakeScreen').style.display = 'none';
        document.getElementById('mainSite').style.display = 'block';
        
        // Инициализируем основную страницу
        initializeMainPage();
    }, 2500);
}

// Создание дыма при задувании свечи
function createSmoke() {
    const candle = document.querySelector('.candle');
    
    for (let i = 0; i < 10; i++) { // Больше дыма для эффекта
        setTimeout(() => {
            const smoke = document.createElement('div');
            const size = 4 + Math.random() * 4;
            smoke.style.cssText = `
                position: absolute;
                top: -15px;
                left: 50%;
                width: ${size}px;
                height: ${size}px;
                background: #888;
                border-radius: 50%;
                opacity: 0.6;
                transform: translateX(-50%);
                animation: smokeRise ${1 + Math.random()}s ease-out forwards;
            `;
            
            candle.appendChild(smoke);
            
            // Удаляем элемент после анимации
            setTimeout(() => {
                if (smoke.parentNode) {
                    smoke.parentNode.removeChild(smoke);
                }
            }, 2000);
        }, i * 120);
    }
}

// Анимация дыма
const style = document.createElement('style');
style.textContent = `
    @keyframes smokeRise {
        0% {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 0.6;
        }
        50% {
            transform: translateX(${Math.random() * 30 - 15}px) translateY(-40px) scale(1.5);
            opacity: 0.3;
        }
        100% {
            transform: translateX(${Math.random() * 40 - 20}px) translateY(-80px) scale(2);
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
        createParticles('#d4af37');
    }, 1000);
    
    setTimeout(() => {
        createParticles('#800020');
    }, 2000);
}

// Пасхалка
function showEasterEgg() {
    document.getElementById('easterEgg').style.display = 'flex';
}

function hideEasterEgg() {
    document.getElementById('easterEgg').style.display = 'none';
}

// Добавляем обработчики для магических предметов
document.addEventListener('DOMContentLoaded', function() {
    const magicItems = document.querySelectorAll('.magic-item');
    magicItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
