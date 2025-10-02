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
