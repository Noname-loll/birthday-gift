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
    flame.style.transform = 'translateX(-50%) scale(0.
