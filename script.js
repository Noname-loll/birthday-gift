// Функция для обновления шкал потребностей
function updateNeedBars() {
    const needFills = document.querySelectorAll('.need-fill');
    
    needFills.forEach(fill => {
        const value = fill.getAttribute('data-value');
        fill.style.width = value + '%';
    });
}

// Функция для случайного изменения потребностей
function randomizeNeeds() {
    const needFills = document.querySelectorAll('.need-fill');
    
    needFills.forEach(fill => {
        const randomValue = Math.floor(Math.random() * 101);
        fill.setAttribute('data-value', randomValue);
        fill.querySelector('::after')?.remove();
    });
    
    updateNeedBars();
}

// Функция для заполнения всех потребностей до максимума
function maxAllNeeds() {
    const needFills = document.querySelectorAll('.need-fill');
    
    needFills.forEach(fill => {
        fill.setAttribute('data-value', '100');
    });
    
    updateNeedBars();
    
    // Добавляем праздничный эффект
    const message = document.querySelector('.birthday-message p');
    message.textContent = 'Все потребности заполнены! Ура! 🎉';
    message.style.color = 'gold';
    message.style.fontWeight = 'bold';
    
    // Создаем конфетти
    createConfetti();
}

// Функция для создания эффекта конфетти
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#a166ab'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            z-index: 1000;
        `;
        
        document.body.appendChild(confetti);
        
        // Удаляем конфетти после анимации
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Добавляем стили для анимации конфетти
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateNeedBars();
    
    // Добавляем интерактивность шкалам
    const needBars = document.querySelectorAll('.need-bar');
    
    needBars.forEach(bar => {
        bar.addEventListener('click', function() {
            const fill = this.querySelector('.need-fill');
            const currentValue = parseInt(fill.getAttribute('data-value'));
            const newValue = currentValue >= 100 ? 0 : currentValue + 20;
            
            fill.setAttribute('data-value', newValue);
            updateNeedBars();
        });
    });
});
