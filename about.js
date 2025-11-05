document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeContactForm();
    initializeRouteModal();
    initializeAnimations();
    
    console.log('Страница "О нас" загружена!');
});

// Переменные для карты
let map;
let placemark;

// Инициализация карты
function initializeMap() {
    setTimeout(() => {
        loadMap();
    }, 1000);
}

// Загрузка карты
function loadMap() {
    const mapContainer = document.getElementById('mapContainer');
    
    if (!mapContainer) return;
    
    // Создаем стилизованную карту-заглушку
    mapContainer.innerHTML = `
        <div class="map-content">
            <div class="map-overlay">
                <div class="map-marker">
                    <i class="bi bi-geo-alt-fill"></i>
                </div>
                <div class="map-info">
                    <h5>Детское пространство "Василёк"</h5>
                    <p>г. Владимир, ул. Детская, 15</p>
                    <p class="text-muted">остановка "Цветочная"</p>
                </div>
            </div>
            <div class="map-background"></div>
        </div>
    `;
    
    // Добавляем стили для карты-заглушки
    const style = document.createElement('style');
    style.textContent = `
        .map-content {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
        
        .map-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #e0d6ff, #d4c7ff);
            opacity: 0.6;
        }
        
        .map-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 2;
        }
        
        .map-marker {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--purple), var(--dark-purple));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            box-shadow: 0 5px 15px rgba(138, 79, 255, 0.4);
            animation: pulse 2s infinite;
        }
        
        .map-marker i {
            font-size: 1.5rem;
            color: white;
        }
        
        .map-info h5 {
            color: var(--dark-purple);
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .map-info p {
            margin: 0;
            color: var(--text-dark);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Управление картой
function zoomIn() {
    showAlert('Функция увеличения карты будет доступна при подключении Яндекс Карт', 'info');
}
function zoomOut() {
    showAlert('Функция уменьшения карты будет доступна при подключении Яндекс Карт', 'info');
}
function resetMap() {
    showAlert('Карта возвращена в исходное положение', 'success');
}

// Инициализация формы обратной связи
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (validateContactForm(name, phone, email, message)) {
                sendContactForm(name, phone, email, message);
            }
        });
    }
}

// Валидация формы обратной связи
function validateContactForm(name, phone, email, message) {
    const errors = [];
    
    if (!name.trim()) errors.push('Введите ваше имя');
    if (!phone.trim()) errors.push('Введите телефон');
    
    if (errors.length > 0) {
        showAlert(errors.join(', '), 'danger');
        return false;
    }
    
    if (!isValidPhone(phone)) {
        showAlert('Введите корректный номер телефона', 'danger');
        return false;
    }
    
    if (email && !isValidEmail(email)) {
        showAlert('Введите корректный email', 'danger');
        return false;
    }
    
    return true;
}

// Проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Проверка номера телефона
function isValidPhone(phone) {
    const phoneRegex = /^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Отправка формы обратной связи
function sendContactForm(name, phone, email, message) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Отправка...';
    submitBtn.disabled = true;
    
    // Эмуляция отправки формы
    setTimeout(() => {
        const formData = {
            name,
            phone,
            email,
            message,
            timestamp: new Date().toISOString()
        };
        
        // Сохраняем в localStorage для демонстрации
        const existingContacts = JSON.parse(localStorage.getItem('vasilek_contacts')) || [];
        existingContacts.push(formData);
        localStorage.setItem('vasilek_contacts', JSON.stringify(existingContacts));
        
        document.getElementById('contactForm').reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showAlert('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        
    }, 2000);
}

// Инициализация модального окна маршрута
function initializeRouteModal() {
}

// Показать модальное окно маршрута
function showRouteModal() {
    const modal = new bootstrap.Modal(document.getElementById('routeModal'));
    modal.show();
}

// Расчет маршрута
function calculateRoute() {
    const fromAddress = document.getElementById('routeFrom').value;
    
    if (!fromAddress.trim()) {
        showAlert('Введите адрес отправления', 'danger');
        return;
    }
    
    const routeInfo = document.getElementById('routeInfo');
    const routeTime = document.getElementById('routeTime');
    const routeDistance = document.getElementById('routeDistance');
    
    routeInfo.style.display = 'block';
    routeTime.textContent = '~25 минут';
    routeDistance.textContent = '~8.5 км';
    
    showAlert('Маршрут построен успешно!', 'success');
}

// Позвонить нам
function callUs() {
    if (confirm('Позвонить по номеру +7 (495) 123-45-67?')) {
        showAlert('Имитация звонка... В реальном приложении будет открыт набор номера', 'info');
        setTimeout(() => {
            showAlert('Звонок завершен. Ждем вас в гости!', 'success');
        }, 3000);
    }
}

// Анимации при скролле
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.value-card, .contact-card, .form-card, .about-photo-wrapper');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const checkVisibility = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

// Показ уведомления
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
    `;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Экспорт функций для глобального использования
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.resetMap = resetMap;
window.showRouteModal = showRouteModal;
window.calculateRoute = calculateRoute;
window.callUs = callUs;