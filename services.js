document.addEventListener('DOMContentLoaded', function() {
    initializeServices();
    initializeFilters();
    initializeCart();
    initializeModal();
    initializeAnimations();
    
    console.log('Страница "Каталог услуг" загружена!');
});

// Данные об услугах
const servicesData = [
    {
        id: 1,
        name: "Развивающие занятия для малышей",
        category: "development",
        price: 800,
        duration: "45 минут",
        age: "1-3 года",
        group: "до 6 детей",
        image: "Развивающие занятия для малышей.jpeg",
        description: "Комплексные развивающие занятия для самых маленьких, направленные на развитие моторики, речи и сенсорного восприятия.",
        features: [
            "Развитие мелкой моторики",
            "Сенсорные игры",
            "Музыкальные паузы",
            "Творческие задания",
            "Развитие речи через игры",
            "Социальная адаптация"
        ],
        fullDescription: "Наши занятия для малышей построены на принципах бережного развития. Мы используем методики Монтессори и элементы вальдорфской педагогики. Каждое занятие включает разнообразные активности, которые способствуют гармоничному развитию ребенка. Занятия проходят в небольших группах, что позволяет уделить внимание каждому малышу."
    },
    {
        id: 2,
        name: "Творческая мастерская",
        category: "creative",
        price: 700,
        duration: "60 минут",
        age: "3-10 лет",
        group: "до 8 детей",
        image: "Творческая мастерская.webp",
        description: "Увлекательные занятия по рисованию, лепке и рукоделию, раскрывающие творческий потенциал ребенка.",
        features: [
            "Рисование разными техниками",
            "Лепка из глины и пластилина",
            "Аппликации и коллажи",
            "Работа с природными материалами",
            "Основы композиции и цвета",
            "Создание собственных проектов"
        ],
        fullDescription: "В нашей творческой мастерской дети знакомятся с различными художественными техниками и материалами. Под руководством опытного педагога они создают настоящие шедевры, развивая воображение и художественный вкус. Мы учим детей видеть красоту в окружающем мире и выражать свои эмоции через искусство."
    },
    {
        id: 3,
        name: "Подготовка к школе",
        category: "development",
        price: 900,
        duration: "60 минут",
        age: "5-7 лет",
        group: "до 6 детей",
        image: "Подготовка к школе.png",
        description: "Комплексная программа подготовки к школе: чтение, письмо, математика и развитие логического мышления.",
        features: [
            "Обучение чтению и письму",
            "Основы математики",
            "Развитие логики",
            "Подготовка руки к письму",
            "Развитие внимания и памяти",
            "Социальная готовность к школе"
        ],
        fullDescription: "Наша программа подготовки к школе помогает детям плавно адаптироваться к учебному процессу. Мы уделяем внимание не только академическим знаниям, но и развитию усидчивости, концентрации и социальных навыков. Дети учатся работать в группе, слушать педагога и выполнять задания самостоятельно."
    },
    {
        id: 4,
        name: "Детская йога",
        category: "sports",
        price: 600,
        duration: "45 минут",
        age: "4-10 лет",
        group: "до 10 детей",
        image: "Детская йога.jpeg",
        description: "Веселые занятия йогой в игровой форме, способствующие физическому развитию и эмоциональному равновесию.",
        features: [
            "Игровая форма занятий",
            "Развитие гибкости и силы",
            "Дыхательные упражнения",
            "Релаксационные техники",
            "Улучшение осанки",
            "Развитие координации"
        ],
        fullDescription: "Детская йога - это прекрасный способ развить гибкость, силу и координацию. В игровой форме дети осваивают асаны, учатся правильно дышать и расслабляться, что способствует их эмоциональному благополучию. Занятия помогают снять напряжение и улучшить концентрацию внимания."
    },
    {
        id: 5,
        name: "Музыкальные занятия",
        category: "creative",
        price: 750,
        duration: "50 минут",
        age: "2-8 лет",
        group: "до 8 детей",
        image: "Музыкальные занятия.jpeg",
        description: "Знакомство с миром музыки через пение, танцы и игру на детских музыкальных инструментах.",
        features: [
            "Развитие музыкального слуха",
            "Пение и ритмика",
            "Игра на инструментах",
            "Музыкальные игры",
            "Основы нотной грамоты",
            "Танцевальные движения"
        ],
        fullDescription: "На музыкальных занятиях дети погружаются в волшебный мир звуков. Мы учимся слушать музыку, петь, двигаться в ритме и играть на различных инструментах. Занятия развивают слух, чувство ритма и любовь к музыке. Дети учатся работать в ансамбле и развивают творческие способности."
    },
    {
        id: 6,
        name: "Няня на час",
        category: "care",
        price: 500,
        duration: "60 минут",
        age: "1-10 лет",
        group: "индивидуально",
        image: "Няня на час.webp",
        description: "Профессиональный присмотр за ребенком, пока родители отдыхают или занимаются своими делами.",
        features: [
            "Индивидуальный подход",
            "Развивающие игры",
            "Присмотр и безопасность",
            "Гибкий график",
            "Помощь с питанием",
            "Прогулки на свежем воздухе"
        ],
        fullDescription: "Наши профессиональные няни обеспечат качественный присмотр за вашим ребенком. Мы предлагаем индивидуальный подход, развивающие игры и полную безопасность. Вы можете быть спокойны за своего малыша! Няни имеют педагогическое образование и опыт работы с детьми разных возрастов."
    },
    {
        id: 7,
        name: "Спортивная гимнастика",
        category: "sports",
        price: 850,
        duration: "55 минут",
        age: "4-12 лет",
        group: "до 8 детей",
        image: "Спортивная гимнастика.jpeg",
        description: "Динамичные занятия, развивающие силу, гибкость, координацию и уверенность в себе.",
        features: [
            "Развитие физической силы",
            "Упражнения на гибкость",
            "Элементы акробатики",
            "Работа с оборудованием",
            "Развитие выносливости",
            "Страховка и безопасность"
        ],
        fullDescription: "Спортивная гимнастика - это отличная основа для любого вида спорта. На занятиях дети развивают физические качества, осваивают базовые элементы и учатся владеть своим телом. Тренер уделяет внимание технике выполнения и безопасности. Занятия проходят на современном оборудовании с соблюдением всех мер безопасности."
    },
    {
        id: 8,
        name: "Английский язык для детей",
        category: "development",
        price: 950,
        duration: "50 минут",
        age: "3-12 лет",
        group: "до 6 детей",
        image: "Английский язык для детей.jpeg",
        description: "Интерактивные занятия английским языком через игры, песни и творческие задания.",
        features: [
            "Игровая методика",
            "Разговорная практика",
            "Тематические занятия",
            "Интерактивные материалы",
            "Аудирование и произношение",
            "Подготовка к школе"
        ],
        fullDescription: "Мы учим английский язык весело и эффективно! Через игры, песни и творческие задания дети легко запоминают новые слова и начинают говорить на английском без страха и стеснения. Занятия ведут опытные педагоги с лингвистическим образованием. Мы используем коммуникативную методику, которая доказала свою эффективность в обучении детей."
    }
];

// Данные об абонементах
const subscriptionsData = {
    1: {
        id: 1,
        name: "Базовый абонемент",
        price: 4500,
        type: "subscription",
        description: "8 занятий в месяц, любые 2 направления"
    },
    2: {
        id: 2,
        name: "Оптимальный абонемент",
        price: 7800,
        type: "subscription", 
        description: "16 занятий в месяц, любые 4 направления"
    },
    3: {
        id: 3,
        name: "Премиум абонемент",
        price: 12000,
        type: "subscription",
        description: "Безлимитный доступ, все направления"
    }
};

// Корзина
let cart = JSON.parse(localStorage.getItem('vasilek_cart')) || [];

// Инициализация услуг
function initializeServices() {
    const container = document.getElementById('servicesContainer');
    
    if (!container) return;
    
    servicesData.forEach(service => {
        const card = createServiceCard(service);
        container.appendChild(card);
    });
}

// Создание карточки услуги
function createServiceCard(service) {
    const col = document.createElement('div');
    col.className = `col-lg-3 col-md-6 service-item ${service.category}`;
    
    const isInCart = cart.some(item => item.id === service.id && item.type !== 'subscription');
    
    col.innerHTML = `
        <div class="service-card">
            <img src="${service.image}" alt="${service.name}" class="service-image">
            <div class="service-content">
                <span class="service-category">${getCategoryName(service.category)}</span>
                <h3 class="service-title">${service.name}</h3>
                <p class="service-description">${service.description}</p>
                <div class="service-details">
                    <div class="service-detail">
                        <i class="bi bi-clock"></i>
                        <span>${service.duration}</span>
                    </div>
                    <div class="service-detail">
                        <i class="bi bi-person"></i>
                        <span>${service.age}</span>
                    </div>
                    <div class="service-detail">
                        <i class="bi bi-people"></i>
                        <span>Группа: ${service.group}</span>
                    </div>
                </div>
                <div class="service-price">${service.price} ₽</div>
                <div class="service-actions">
                    <button class="btn btn-details" onclick="openServiceModal(${service.id})">
                        Подробнее
                    </button>
                    <button class="btn btn-add-to-cart ${isInCart ? 'added' : ''}" onclick="toggleCart(${service.id})">
                        <i class="bi ${isInCart ? 'bi-check' : 'bi-cart-plus'}"></i>
                        ${isInCart ? 'В корзине' : 'В корзину'}
                    </button>
                </div>
            </div>
        </div>
    `;
    return col;
}

// Получение названия категории
function getCategoryName(category) {
    const categories = {
        'development': 'Развивающие',
        'creative': 'Творческие',
        'sports': 'Спортивные',
        'care': 'Присмотр'
    };
    return categories[category] || category;
}

// Инициализация фильтров
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterServices(filter);
        });
    });
}

// Фильтрация услуг
function filterServices(filter) {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Открытие модального окна с информацией об услуге
function openServiceModal(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    const modalBody = document.getElementById('serviceModalBody');
    
    if (!service || !modalBody) return;
    
    const featuresHtml = service.features.map(feature => 
        `<div class="service-modal-feature">
            <i class="bi bi-check-circle-fill"></i>
            <span>${feature}</span>
        </div>`
    ).join('');
    
    const isInCart = cart.some(item => item.id === service.id && item.type !== 'subscription');
    
    modalBody.innerHTML = `
        <div class="service-modal-content">
            <img src="${service.image}" alt="${service.name}" class="service-modal-image">
            <div class="service-modal-info">
                <h3 class="service-modal-title">${service.name}</h3>
                <span class="service-modal-category">${getCategoryName(service.category)}</span>
                <div class="service-modal-price">${service.price} ₽</div>
                
                <div class="service-modal-description">
                    ${service.fullDescription}
                </div>
                
                <div class="service-modal-details">
                    <div><strong>Продолжительность:</strong> ${service.duration}</div>
                    <div><strong>Возраст:</strong> ${service.age}</div>
                    <div><strong>Размер группы:</strong> ${service.group}</div>
                </div>
                
                <div class="service-modal-features">
                    <h6>Что включено в занятие:</h6>
                    ${featuresHtml}
                </div>
                
                <div class="service-modal-actions">
                    <button class="btn btn-details" data-bs-dismiss="modal">
                        Закрыть
                    </button>
                    <button class="btn btn-modal-add-to-cart ${isInCart ? 'added' : ''}" onclick="toggleCart(${service.id});">
                        <i class="bi ${isInCart ? 'bi-check' : 'bi-cart-plus'}"></i>
                        ${isInCart ? 'В корзине' : 'Добавить в корзину'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Показываем модальное окно
    const modal = new bootstrap.Modal(document.getElementById('serviceModal'));
    modal.show();
}

// Добавление абонемента в корзину
function addSubscriptionToCart(subscriptionId) {
    const subscription = subscriptionsData[subscriptionId];
    
    if (!subscription) return;
    
    // Проверяем, нет ли уже этого абонемента в корзине
    const existingItemIndex = cart.findIndex(item => 
        item.id === subscription.id && item.type === 'subscription'
    );
    
    if (existingItemIndex > -1) {
        // Уже в корзине
        showCartNotification(subscription.name, false);
        return;
    }
    
    // Добавляем в корзину
    cart.push({
        id: subscription.id,
        name: subscription.name,
        price: subscription.price,
        type: 'subscription',
        description: subscription.description,
        quantity: 1
    });
    
    // Сохраняем в localStorage
    localStorage.setItem('vasilek_cart', JSON.stringify(cart));
    
    updateCartCount();
    showCartNotification(subscription.name, true);
    updateSubscriptionButton(subscriptionId);
}

// Обновление кнопки абонемента
function updateSubscriptionButton(subscriptionId) {
    const button = document.querySelector(`.btn-subscription[onclick="addSubscriptionToCart(${subscriptionId})"]`);
    if (button) {
        button.classList.add('added');
        button.innerHTML = 'В корзине';
        button.disabled = true;
    }
}

// Инициализация корзины
function initializeCart() {
    updateCartCount();
    cart.forEach(item => {
        if (item.type === 'subscription') {
            updateSubscriptionButton(item.id);
        }
    });
}

// Добавление/удаление из корзины
function toggleCart(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    const existingItemIndex = cart.findIndex(item => 
        item.id === serviceId && item.type !== 'subscription'
    );
    
    if (existingItemIndex > -1) {
        // Удаляем из корзины
        cart.splice(existingItemIndex, 1);
    } else {
        // Добавляем в корзину
        cart.push({
            id: service.id,
            name: service.name,
            price: service.price,
            image: service.image,
            type: 'service',
            quantity: 1
        });
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('vasilek_cart', JSON.stringify(cart));
    
    updateCartButtons(serviceId);
    updateCartCount();
    showCartNotification(service.name, existingItemIndex === -1);
}

// Обновление кнопок корзины
function updateCartButtons(serviceId) {
    const isInCart = cart.some(item => 
        item.id === serviceId && item.type !== 'subscription'
    );
    
    // Обновляем кнопки в карточках
    const cardButtons = document.querySelectorAll(`.btn-add-to-cart[onclick="toggleCart(${serviceId})"]`);
    cardButtons.forEach(button => {
        button.classList.toggle('added', isInCart);
        button.innerHTML = `
            <i class="bi ${isInCart ? 'bi-check' : 'bi-cart-plus'}"></i>
            ${isInCart ? 'В корзине' : 'В корзину'}
        `;
    });
    
    // Обновляем кнопку в модальном окне
    const modalButton = document.querySelector('.btn-modal-add-to-cart');
    if (modalButton) {
        modalButton.classList.toggle('added', isInCart);
        modalButton.innerHTML = `
            <i class="bi ${isInCart ? 'bi-check' : 'bi-cart-plus'}"></i>
            ${isInCart ? 'В корзине' : 'Добавить в корзину'}
        `;
    }
}

// Обновление счетчика корзины
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Показ уведомления о добавлении в корзину
function showCartNotification(itemName, added) {
    const notification = document.createElement('div');
    notification.className = `alert ${added ? 'alert-success' : 'alert-warning'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
    `;
    notification.innerHTML = `
        ${added ? 
            `<i class="bi bi-check-circle-fill"></i> "${itemName}" добавлен в корзину` :
            `<i class="bi bi-info-circle-fill"></i> "${itemName}" удален из корзины`
        }
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Инициализация модального окна
function initializeModal() {
    const modal = document.getElementById('serviceModal');
    
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            document.getElementById('serviceModalBody').innerHTML = '';
        });
    }
}

// Анимации при скролле
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .subscription-card, .intro-text');
    
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

// Обработка ошибок загрузки изображений
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('service-image')) {
        e.target.src = 'images/services/default-service.jpg';
    }
}, true);

// Экспорт функций для глобального использования
window.openServiceModal = openServiceModal;
window.toggleCart = toggleCart;
window.addSubscriptionToCart = addSubscriptionToCart;