document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    initializeEventListeners();
    updateCartDisplay();
    loadRecommendedProducts();
    
    console.log('Страница "Корзина" загружена!');
});

// Данные корзины
let cart = JSON.parse(localStorage.getItem('vasilek_cart')) || [];
let appliedPromoCode = null;

// Рекомендуемые товары
const recommendedProducts = [
    {
        id: 101,
        name: "Набор цветных карандашей",
        price: 450,
        image: "pencils.jpg",
        category: "creative"
    },
    {
        id: 102,
        name: "Детская книга 'Приключения'",
        price: 890,
        image: "adventure-book.jpg",
        category: "books"
    },
    {
        id: 103,
        name: "Развивающая игра 'Мемори'",
        price: 670,
        image: "memory-game.jpg",
        category: "education"
    },
    {
        id: 104,
        name: "Набор для творчества",
        price: 1200,
        image: "creative-set.jpg",
        category: "creative"
    }
];

// Инициализация корзины
function initializeCart() {
    updateCartCount();
}

// Инициализация обработчиков событий
function initializeEventListeners() {
    document.getElementById('giftWrap').addEventListener('change', updateOrderSummary);
    document.getElementById('personalCard').addEventListener('change', updateOrderSummary);
    
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', updateOrderSummary);
    });
    
    document.getElementById('promoCode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyPromoCode();
        }
    });
}

// Обновление отображения корзины
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const recommendedSection = document.getElementById('recommendedSection');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.style.display = 'block';
        recommendedSection.style.display = 'none';
        updateOrderSummary();
        return;
    }
    
    emptyCart.style.display = 'none';
    recommendedSection.style.display = 'block';
    
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        cartItems.appendChild(cartItem);
    });
    
    updateOrderSummary();
}

// Создание элемента товара в корзине
function createCartItem(item, index) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    const itemType = getItemType(item);
    const itemCategory = getItemCategory(item);
    
    div.innerHTML = `
        <img src="${item.image || 'images/products/default-product.jpg'}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-category">${itemCategory}</div>
            <span class="cart-item-type">${itemType}</span>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${index}, this.value)">
                <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} ₽</div>
            <button class="btn-remove-item" onclick="removeFromCart(${index})">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    `;
    
    return div;
}

// Получение типа товара
function getItemType(item) {
    const types = {
        'product': 'Товар',
        'service': 'Услуга',
        'subscription': 'Абонемент',
        'special_offer': 'Спецпредложение'
    };
    return types[item.type] || item.type;
}

// Получение категории товара
function getItemCategory(item) {
    if (item.type === 'service') return 'Услуга';
    if (item.type === 'subscription') return 'Абонемент';
    if (item.type === 'special_offer') return 'Спецпредложение';
    return item.category || 'Товар';
}

// Изменение количества
function changeQuantity(index, change) {
    const item = cart[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    
    if (newQuantity > 10) {
        showAlert('Максимальное количество товара - 10 штук', 'warning');
        return;
    }
    
    item.quantity = newQuantity;
    saveCart();
    updateCartDisplay();
}

// Обновление количества через input
function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    
    if (isNaN(quantity) || quantity < 1) {
        updateCartDisplay(); 
        return;
    }
    
    if (quantity > 10) {
        showAlert('Максимальное количество товара - 10 штук', 'warning');
        updateCartDisplay(); 
        return;
    }
    
    cart[index].quantity = quantity;
    saveCart();
    updateCartDisplay();
}

// Удаление из корзины
function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    showAlert(`"${itemName}" удален из корзины`, 'success');
}

// Очистка корзины
function clearCart() {
    const modal = new bootstrap.Modal(document.getElementById('clearCartModal'));
    modal.show();
}

// Подтверждение очистки корзины
function confirmClearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    appliedPromoCode = null;
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('clearCartModal'));
    modal.hide();
    
    showAlert('Корзина очищена', 'success');
}

// Обновление сводки заказа
function updateOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const subtotalPrice = document.getElementById('subtotalPrice');
    const discountAmount = document.getElementById('discountAmount');
    const finalPrice = document.getElementById('finalPrice');
    const checkoutPrice = document.getElementById('checkoutPrice');
    const giftWrapPrice = document.getElementById('giftWrapPrice');
    const cardPrice = document.getElementById('cardPrice');
    
    // Рассчитываем стоимость товаров
    let subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Добавляем дополнительные услуги
    const giftWrap = document.getElementById('giftWrap').checked;
    const personalCard = document.getElementById('personalCard').checked;
    
    const giftWrapCost = giftWrap ? 300 : 0;
    const cardCost = personalCard ? 150 : 0;
    
    giftWrapPrice.textContent = giftWrapCost + ' ₽';
    cardPrice.textContent = cardCost + ' ₽';
    
    subtotal += giftWrapCost + cardCost;
    
    // Применяем скидку по промокоду
    let discount = 0;
    if (appliedPromoCode) {
        discount = calculateDiscount(subtotal, appliedPromoCode);
    }
    
    const total = subtotal - discount;
    
    // Обновляем отображение
    summaryItems.innerHTML = '';
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span class="summary-item-name">${item.name}</span>
            <span class="summary-item-quantity">×${item.quantity}</span>
            <span class="summary-item-price">${(item.price * item.quantity).toLocaleString()} ₽</span>
        `;
        summaryItems.appendChild(summaryItem);
    });
    
    subtotalPrice.textContent = subtotal.toLocaleString() + ' ₽';
    discountAmount.textContent = '-' + discount.toLocaleString() + ' ₽';
    finalPrice.textContent = total.toLocaleString() + ' ₽';
    checkoutPrice.textContent = total.toLocaleString() + ' ₽';
    
    updateCartCount();
}

// Расчет скидки по промокоду
function calculateDiscount(subtotal, promoCode) {
    const promoCodes = {
        'VASILEK10': 0.1,  
        'VASILEK500': 500, 
        'WELCOME15': 0.15 
    };
    
    const discount = promoCodes[promoCode];
    if (!discount) return 0;
    
    if (typeof discount === 'number' && discount < 1) {
        return Math.round(subtotal * discount);
    } else {
        return Math.min(discount, subtotal);
    }
}

// Применение промокода
function applyPromoCode() {
    const promoCodeInput = document.getElementById('promoCode');
    const promoMessage = document.getElementById('promoMessage');
    const code = promoCodeInput.value.trim().toUpperCase();
    
    if (!code) {
        promoMessage.textContent = 'Введите промокод';
        promoMessage.className = 'promo-message promo-error';
        return;
    }
    
    const validPromoCodes = ['VASILEK10', 'VASILEK500', 'WELCOME15'];
    
    if (validPromoCodes.includes(code)) {
        appliedPromoCode = code;
        promoMessage.textContent = 'Промокод успешно применен!';
        promoMessage.className = 'promo-message promo-success';
        updateOrderSummary();
    } else {
        appliedPromoCode = null;
        promoMessage.textContent = 'Неверный промокод';
        promoMessage.className = 'promo-message promo-error';
        updateOrderSummary();
    }
}

// Загрузка рекомендованных товаров
function loadRecommendedProducts() {
    const container = document.getElementById('recommendedProducts');
    
    recommendedProducts.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6';
        
        col.innerHTML = `
            <div class="recommended-product-card">
                <img src="${product.image}" alt="${product.name}" class="recommended-product-image">
                <div class="recommended-product-name">${product.name}</div>
                <div class="recommended-product-price">${product.price.toLocaleString()} ₽</div>
                <button class="btn btn-add-recommended" onclick="addRecommendedProduct(${product.id})">
                    <i class="bi bi-cart-plus"></i> Добавить в корзину
                </button>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Добавление рекомендованного товара
function addRecommendedProduct(productId) {
    const product = recommendedProducts.find(p => p.id === productId);
    
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId && item.type === 'product');
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            type: 'product',
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    showAlert(`"${product.name}" добавлен в корзину`, 'success');
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        showAlert('Добавьте товары в корзину перед оформлением заказа', 'warning');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').id;
    
    const order = {
        id: Date.now(),
        items: [...cart],
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(calculateSubtotal(), appliedPromoCode),
        total: calculateTotal(),
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    const orders = JSON.parse(localStorage.getItem('vasilek_orders')) || [];
    orders.push(order);
    localStorage.setItem('vasilek_orders', JSON.stringify(orders));
    
    cart = [];
    saveCart();
    appliedPromoCode = null;
    
    showOrderSuccess(order);
}

// Расчет промежуточного итога
function calculateSubtotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const giftWrap = document.getElementById('giftWrap').checked;
    const personalCard = document.getElementById('personalCard').checked;
    
    return subtotal + (giftWrap ? 300 : 0) + (personalCard ? 150 : 0);
}

// Расчет итоговой суммы
function calculateTotal() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal, appliedPromoCode);
    return subtotal - discount;
}

// Показ успешного оформления заказа
function showOrderSuccess(order) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1060;
        min-width: 400px;
    `;
    alertDiv.innerHTML = `
        <h5><i class="bi bi-check-circle-fill"></i> Заказ оформлен успешно!</h5>
        <p><strong>Номер заказа:</strong> #${order.id}</p>
        <p><strong>Сумма:</strong> ${order.total.toLocaleString()} ₽</p>
        <p><strong>Способ получения:</strong> Самовывоз</p>
        <p class="mb-0"><strong>Статус:</strong> Ожидает подтверждения</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    updateCartDisplay();
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
        window.location.href = 'index.html';
    }, 5000);
}

// Сохранение корзины
function saveCart() {
    localStorage.setItem('vasilek_cart', JSON.stringify(cart));
    updateCartCount();
}

// Обновление счетчика корзины
function updateCartCount() {
    const cartCount = document.getElementById('headerCartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
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
    }, 4000);
}

// Экспорт функций для глобального использования
window.changeQuantity = changeQuantity;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.confirmClearCart = confirmClearCart;
window.applyPromoCode = applyPromoCode;
window.addRecommendedProduct = addRecommendedProduct;
window.checkout = checkout;