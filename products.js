document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeFilters();
    initializeSearch();
    initializeCart();
    initializeModal();
    initializeDeliveryForm();
    initializeAnimations();
    
    console.log('Страница "Каталог товаров" загружена!');
});

// Данные о товарах
const productsData = [
    {
        id: 1,
        name: "Развивающий конструктор 'Умный город'",
        category: "toys",
        price: 2450,
        originalPrice: 2890,
        discount: 15,
        age: "3-8 лет",
        material: "Пластик, дерево",
        pieces: 128,
        image: "Развивающий конструктор 'Умный город'.jpeg",
        description: "Яркий конструктор для развития пространственного мышления и творческих способностей.",
        fullDescription: "Этот увлекательный конструктор поможет вашему ребенку построить собственный город с домами, дорогами и машинами. Набор развивает мелкую моторику, логическое мышление и воображение. Все детали изготовлены из безопасных материалов и легко соединяются между собой.",
        features: [
            "128 разноцветных деталей",
            "Инструкция с примерами построек",
            "Безопасные материалы",
            "Развитие моторики и логики",
            "Совместимость с другими наборами"
        ],
        inStock: true,
        badge: null
    },
    {
        id: 2,
        name: "Детские книги 'Сказки народов мира'",
        category: "books",
        price: 1890,
        originalPrice: null,
        discount: 0,
        age: "2-6 лет",
        material: "Бумага, картон",
        pieces: 5,
        image: "Детские книги 'Сказки народов мира'.jpeg",
        description: "Красочный сборник сказок с иллюстрациями для детей дошкольного возраста.",
        fullDescription: "В этот прекрасный сборник вошли самые известные сказки народов мира. Книги напечатаны на качественной мелованной бумаге с яркими иллюстрациями. Крупный шрифт удобен для первого самостоятельного чтения.",
        features: [
            "5 книг в наборе",
            "Крупный шрифт",
            "Яркие иллюстрации",
            "Твердая обложка",
            "Развитие речи и воображения"
        ],
        inStock: true,
        badge: "new"
    },
    {
        id: 3,
        name: "Набор для творчества 'Волшебная мозаика'",
        category: "creative",
        price: 1250,
        originalPrice: 1500,
        discount: 17,
        age: "4-10 лет",
        material: "Картон, пластик",
        pieces: 1,
        image: "Набор для творчества 'Волшебная мозаика'.jpeg",
        description: "Создавайте яркие картины с помощью разноцветных стикеров-мозаики.",
        fullDescription: "Набор для творчества включает 6 картин-основ и более 1000 разноцветных стикеров. Дети с удовольствием создают красивые мозаичные картины, развивая усидчивость, внимание и цветовосприятие.",
        features: [
            "6 картин-основ",
            "1000+ стикеров",
            "Разные уровни сложности",
            "Развитие мелкой моторики",
            "Готовые рамки для картин"
        ],
        inStock: true,
        badge: null
    },
    {
        id: 4,
        name: "Обучающий планшет 'Английский алфавит'",
        category: "education",
        price: 3200,
        originalPrice: null,
        discount: 0,
        age: "3-7 лет",
        material: "Пластик",
        pieces: 1,
        image: "Обучающий планшет 'Английский алфавит'.jpeg",
        description: "Интерактивный планшет для изучения английского языка в игровой форме.",
        fullDescription: "Яркий и функциональный планшет поможет вашему ребенку в игровой форме выучить английский алфавит, цифры и первые слова. Голосовое сопровождение и веселые мелодии делают обучение увлекательным.",
        features: [
            "8 обучающих режимов",
            "Русский и английский языки",
            "Регулировка громкости",
            "Автоматическое отключение",
            "Работа от батареек"
        ],
        inStock: true,
        badge: "popular"
    },
    {
        id: 5,
        name: "Деревянные пазлы 'Животные фермы'",
        category: "toys",
        price: 890,
        originalPrice: 1100,
        discount: 19,
        age: "2-5 лет",
        material: "Дерево",
        pieces: 12,
        image: "Деревянные пазлы 'Животные фермы'.webp",
        description: "Набор деревянных пазлов с изображениями домашних животных.",
        fullDescription: "Экологичные деревянные пазлы с крупными деталями идеально подходят для самых маленьких. Яркие изображения животных фермы развивают зрительное восприятие и логическое мышление.",
        features: [
            "12 разных животных",
            "Крупные деревянные детали",
            "Экологичные материалы",
            "Развитие логики",
            "Удобные ручки для малышей"
        ],
        inStock: true,
        badge: null
    },
    {
        id: 6,
        name: "Набор для лепки 'Цветная глина'",
        category: "creative",
        price: 1560,
        originalPrice: null,
        discount: 0,
        age: "5-12 лет",
        material: "Глина, пластик",
        pieces: 24,
        image: "Набор для лепки 'Цветная глина'.avif",
        description: "Полный набор для лепки с натуральной глиной и инструментами.",
        fullDescription: "Набор включает 12 цветов натуральной глины, инструменты для лепки и инструкцию с идеями для творчества. Глина легко разминается, не пачкает руки и сохраняет форму после высыхания.",
        features: [
            "12 цветов глины",
            "6 инструментов для лепки",
            "Книга с идеями",
            "Натуральные материалы",
            "Не пачкает руки"
        ],
        inStock: true,
        badge: "new"
    },
    {
        id: 7,
        name: "Энциклопедия 'Мир динозавров'",
        category: "books",
        price: 2100,
        originalPrice: 2600,
        discount: 19,
        age: "6-12 лет",
        material: "Бумага",
        pieces: 1,
        image: "Энциклопедия 'Мир динозавров'.jpeg",
        description: "Иллюстрированная энциклопедия с самыми интересными фактами о динозаврах.",
        fullDescription: "Эта увлекательная энциклопедия откроет для вашего ребенка удивительный мир динозавров. Книга содержит подробные описания, красочные иллюстрации и интересные факты о древних ящерах.",
        features: [
            "200 страниц с иллюстрациями",
            "3D-изображения",
            "Интересные факты",
            "Словарь терминов",
            "Твердая обложка"
        ],
        inStock: true,
        badge: null
    },
    {
        id: 8,
        name: "Набор для опытов 'Юный химик'",
        category: "education",
        price: 2890,
        originalPrice: null,
        discount: 0,
        age: "8-14 лет",
        material: "Пластик, химические реактивы",
        pieces: 1,
        image: "Набор для опытов 'Юный химик'.jpeg",
        description: "Безопасные химические эксперименты для детей под присмотром взрослых.",
        fullDescription: "Набор позволяет провести 50 увлекательных химических экспериментов. Все реактивы безопасны для детей, а подробная инструкция поможет разобраться в науке весело и интересно.",
        features: [
            "50 безопасных экспериментов",
            "Полный набор реактивов",
            "Защитные очки и перчатки",
            "Подробная инструкция",
            "Сертификат безопасности"
        ],
        inStock: false,
        badge: "popular"
    }
];

// Специальные предложения
const specialOffers = [
    {
        id: 101,
        name: "Подарочный набор 'Творческий старт'",
        description: "Включает набор для лепки, мозаику и книгу сказок",
        price: 4200,
        originalPrice: 5300,
        discount: 21
    },
    {
        id: 102,
        name: "Образовательный комплект 'Юный гений'",
        description: "Планшет, энциклопедия и набор для опытов со скидкой",
        price: 6800,
        originalPrice: 8190,
        discount: 17
    }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('vasilek_cart')) || [];

// Настройки пагинации
const productsPerPage = 8;
let currentPage = 1;

// Инициализация товаров
function initializeProducts() {
    renderProducts();
    renderSpecialOffers();
}

// Рендер товаров
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const pagination = document.getElementById('pagination');
    
    if (!container) return;
    container.innerHTML = '';
    
    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    productsToShow.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
    
    renderPagination(totalPages);
}

// Создание карточки товара
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = `col-lg-3 col-md-6 product-item ${product.category}`;
    
    const isInCart = cart.some(item => item.id === product.id && item.type === 'product');
    
    col.innerHTML = `
        <div class="product-card">
            ${product.badge ? `<div class="product-badge ${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
            ${product.discount > 0 ? `<div class="product-badge sale">-${product.discount}%</div>` : ''}
            
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-details">
                    <div class="product-detail">
                        <i class="bi bi-person"></i>
                        <span>${product.age}</span>
                    </div>
                    <div class="product-detail">
                        <i class="bi bi-puzzle"></i>
                        <span>${product.pieces} ${getPiecesText(product.pieces)}</span>
                    </div>
                    ${product.inStock ? 
                        '<div class="product-detail"><i class="bi bi-check-circle"></i><span>В наличии</span></div>' :
                        '<div class="product-detail"><i class="bi bi-x-circle"></i><span>Нет в наличии</span></div>'
                    }
                </div>
                
                <div class="product-price">
                    <span class="current-price">${product.price} ₽</span>
                    ${product.originalPrice ? 
                        `<span class="original-price">${product.originalPrice} ₽</span>` : 
                        ''
                    }
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-details" onclick="openProductModal(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        Подробнее
                    </button>
                    <button class="btn btn-add-to-cart ${isInCart ? 'added' : ''}" 
                            onclick="toggleCart(${product.id})" 
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="bi ${isInCart ? 'bi-check' : 'bi-cart-plus'}"></i>
                        ${isInCart ? 'В корзине' : (product.inStock ? 'В корзину' : 'Нет в наличии')}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Получение текста для бейджа
function getBadgeText(badge) {
    const badges = {
        'popular': 'Популярный',
        'new': 'Новинка',
    };
    return badges[badge] || badge;
}

// Получение названия категории
function getCategoryName(category) {
    const categories = {
        'toys': 'Игрушки',
        'books': 'Книги',
        'creative': 'Творчество',
        'education': 'Образование'
    };
    return categories[category] || category;
}

// Получение текста для количества штук
function getPiecesText(pieces) {
    if (pieces === 1) return 'шт';
    return 'шт';
}

// Инициализация фильтров
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentPage = 1;
            renderProducts();
        });
    });
}

// Получение отфильтрованных товаров
function getFilteredProducts() {
    const activeFilter = document.querySelector('.btn-filter.active').getAttribute('data-filter');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    return productsData.filter(product => {
        const matchesFilter = activeFilter === 'all' || product.category === activeFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        
        return matchesFilter && matchesSearch;
    });
}

// Инициализация поиска
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentPage = 1;
            renderProducts();
        });
    }
}

// Рендер пагинации
function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Назад</a>`;
    pagination.appendChild(prevLi);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(pageLi);
    }
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Вперед</a>`;
    pagination.appendChild(nextLi);
}

function changePage(page) {
    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
    
    document.querySelector('.products-catalog').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Рендер специальных предложений
function renderSpecialOffers() {
    const container = document.getElementById('specialOffersContainer');
    
    if (!container) return;
    
    specialOffers.forEach(offer => {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-md-12';
        
        col.innerHTML = `
            <div class="special-offer-card">
                <div class="special-offer-badge">Спецпредложение</div>
                <div class="special-offer-content">
                    <h3 class="special-offer-title">${offer.name}</h3>
                    <p class="special-offer-description">${offer.description}</p>
                    <div class="special-offer-price">
                        ${offer.price} ₽ <small style="opacity: 0.8; text-decoration: line-through; margin-left: 10px;">${offer.originalPrice} ₽</small>
                    </div>
                    <button class="btn btn-add-to-cart" onclick="addSpecialOfferToCart(${offer.id})">
                        <i class="bi bi-cart-plus"></i>
                        Добавить в корзину
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Открытие модального окна с информацией о товаре
function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    const modalBody = document.getElementById('productModalBody');
    
    if (!product || !modalBody) return;
    
    const featuresHtml = product.features.map(feature => 
        `<div class="product-modal-feature">
            <i class="bi bi-check-circle-fill"></i>
            <span>${feature}</span>
        </div>`
    ).join('');
    
    const isInCart = cart.some(item => item.id === product.id && item.type === 'product');
    
    modalBody.innerHTML = `
        <div class="product-modal-content">
            <img src="${product.image}" alt="${product.name}" class="product-modal-image">
            <div class="product-modal-info">
                <h3 class="product-modal-title">${product.name}</h3>
                <span class="product-modal-category">${getCategoryName(product.category)}</span>
                
                <div class="product-modal-price">
                    <span class="product-modal-current-price">${product.price} ₽</span>
                    ${product.originalPrice ? 
                        `<span class="product-modal-original-price">${product.originalPrice} ₽</span>
                        <span class="product-modal-discount">-${product.discount}%</span>` : 
                        ''
                    }
                </div>
                
                <div class="product-modal-description">
                    ${product.fullDescription}
                </div>
                
                <div class="product-modal-details">
                    <div><strong>Возраст:</strong> ${product.age}</div>
                    <div><strong>Материал:</strong> ${product.material}</div>
                    <div><strong>Количество:</strong> ${product.pieces} ${getPiecesText(product.pieces)}</div>
                    <div><strong>Наличие:</strong> ${product.inStock ? 'В наличии' : 'Нет в наличии'}</div>
                </div>
                
                <div class="product-modal-features">
                    <h6>Особенности товара:</h6>
                    ${featuresHtml}
                </div>
                
                ${product.inStock ? `
                <div class="quantity-selector">
                    <span>Количество:</span>
                    <div class="d-flex align-items-center gap-2">
                        <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="10" id="productQuantity">
                        <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                    </div>
                </div>
                ` : ''}
                
                <div class="product-modal-actions">
                    <button class="btn btn-details" data-bs-dismiss="modal">
                        Закрыть
                    </button>
                    ${product.inStock ? `
                    <button class="btn btn-modal-add-to-cart ${isInCart ? 'added' : ''}" 
                            onclick="addToCartFromModal(${product.id})">
                        <i class="bi ${isInCart ? 'bi-check' : 'bi-cart-plus'}"></i>
                        ${isInCart ? 'В корзине' : 'Добавить в корзину'}
                    </button>
                    ` : `
                    <button class="btn btn-modal-add-to-cart" disabled>
                        <i class="bi bi-x-circle"></i>
                        Нет в наличии
                    </button>
                    `}
                </div>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Изменение количества товара
function changeQuantity(change) {
    const quantityInput = document.getElementById('productQuantity');
    if (!quantityInput) return;
    
    let quantity = parseInt(quantityInput.value) + change;
    quantity = Math.max(1, Math.min(10, quantity));
    quantityInput.value = quantity;
}

// Добавление в корзину из модального окна
function addToCartFromModal(productId) {
    const quantityInput = document.getElementById('productQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    toggleCart(productId, quantity);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();
}

// Добавление специального предложения в корзину
function addSpecialOfferToCart(offerId) {
    const offer = specialOffers.find(o => o.id === offerId);
    
    if (!offer) return;
    
    const existingItemIndex = cart.findIndex(item => 
        item.id === offer.id && item.type === 'special_offer'
    );
    
    if (existingItemIndex > -1) {
        showCartNotification(offer.name, false);
        return;
    }
    
    cart.push({
        id: offer.id,
        name: offer.name,
        price: offer.price,
        type: 'special_offer',
        description: offer.description,
        quantity: 1
    });
    
    // Сохраняем в localStorage
    localStorage.setItem('vasilek_cart', JSON.stringify(cart));
    
    updateCartCount();
    showCartNotification(offer.name, true);
}

// Инициализация корзины
function initializeCart() {
    updateCartCount();
}

// Добавление/удаление из корзины
function toggleCart(productId, quantity = 1) {
    const product = productsData.find(p => p.id === productId);
    
    if (!product || !product.inStock) return;
    
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && item.type === 'product'
    );
    
    if (existingItemIndex > -1) {
        cart.splice(existingItemIndex, 1);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            type: 'product',
            quantity: quantity
        });
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('vasilek_cart', JSON.stringify(cart));
    
    updateCartButtons(productId);
    updateCartCount();
    showCartNotification(product.name, existingItemIndex === -1);
}

// Обновление кнопок корзины
function updateCartButtons(productId) {
    const isInCart = cart.some(item => 
        item.id === productId && item.type === 'product'
    );
    
    // Обновляем кнопки в карточках
    const cardButtons = document.querySelectorAll(`.btn-add-to-cart[onclick="toggleCart(${productId})"]`);
    cardButtons.forEach(button => {
        button.classList.toggle('added', isInCart);
        button.innerHTML = `
            <i class="bi ${isInCart ? 'bi-check' : 'bi-cart-plus'}"></i>
            ${isInCart ? 'В корзине' : 'В корзину'}
        `;
    });
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
    const modal = document.getElementById('productModal');
    
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            document.getElementById('productModalBody').innerHTML = '';
        });
    }
}

// Анимации при скролле
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.product-card, .special-offer-card, .delivery-card');
    
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
    if (e.target.tagName === 'IMG' && e.target.classList.contains('product-image')) {
        e.target.src = 'images/products/default-product.jpg';
    }
}, true);

// Экспорт функций для глобального использования
window.openProductModal = openProductModal;
window.toggleCart = toggleCart;
window.addSpecialOfferToCart = addSpecialOfferToCart;
window.changeQuantity = changeQuantity;
window.changePage = changePage;