document.addEventListener('DOMContentLoaded', function() {
    initializeAccount();
    initializeLoginForm();
    initializeChildForm();
    checkAuthorization();
    
    console.log('Страница "Личный кабинет" загружена!');
});

// Данные пользователя
let userData = JSON.parse(localStorage.getItem('vasilek_user')) || null;
let childrenData = JSON.parse(localStorage.getItem('vasilek_children')) || [];
let visitsData = JSON.parse(localStorage.getItem('vasilek_visits')) || [];

// Проверка авторизации
function checkAuthorization() {
    const userDropdown = document.getElementById('userDropdown');
    const userName = document.getElementById('userName');
    const accountContent = document.querySelector('.account-content');
    
    if (!userData) {
        userName.textContent = 'Войти';
        accountContent.innerHTML = createUnauthorizedState();
    } else {
        userName.textContent = userData.firstName;
        initializeAuthorizedState();
    }
}

// Создание состояния для неавторизованного пользователя
function createUnauthorizedState() {
    return `
        <div class="unauthorized-state">
            <i class="bi bi-person-x"></i>
            <h3>Доступ к личному кабинету</h3>
            <p>Для просмотра и управления информацией необходимо войти в систему</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                <i class="bi bi-box-arrow-in-right"></i> Войти в систему
            </button>
            <div class="mt-3">
                <p>Нет аккаунта? <a href="registration.html" class="text-decoration-none">Зарегистрируйтесь</a></p>
            </div>
        </div>
    `;
}

// Показать форму регистрации
function showRegistrationForm() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    const registrationModal = new bootstrap.Modal(document.getElementById('registrationModal'));
    registrationModal.show();
}

// Показать форму авторизации
function showLoginForm() {
    const registrationModal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
    registrationModal.hide();
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

// Инициализация формы регистрации
function initializeRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('regFirstName').value;
            const lastName = document.getElementById('regLastName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            
            if (validateRegistrationForm(firstName, lastName, email, phone, password, confirmPassword)) {
                registerUser(firstName, lastName, email, phone, password);
            }
        });
    }
}

// Валидация формы регистрации
function validateRegistrationForm(firstName, lastName, email, phone, password, confirmPassword) {
    const errors = [];
    
    if (!firstName) errors.push('Введите имя');
    if (!lastName) errors.push('Введите фамилию');
    if (!email) errors.push('Введите email');
    if (!phone) errors.push('Введите телефон');
    if (!password) errors.push('Введите пароль');
    if (!confirmPassword) errors.push('Подтвердите пароль');
    
    if (errors.length > 0) {
        showAlert(errors.join(', '), 'danger');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Введите корректный email', 'danger');
        return false;
    }
    
    if (!isValidPhone(phone)) {
        showAlert('Введите корректный номер телефона', 'danger');
        return false;
    }
    
    if (password.length < 6) {
        showAlert('Пароль должен содержать минимум 6 символов', 'danger');
        return false;
    }
    
    if (password !== confirmPassword) {
        showAlert('Пароли не совпадают', 'danger');
        return false;
    }
    
    const existingUsers = JSON.parse(localStorage.getItem('vasilek_users')) || [];
    if (existingUsers.some(user => user.email === email)) {
        showAlert('Пользователь с таким email уже зарегистрирован', 'danger');
        return false;
    }
    
    return true;
}

// Проверка номера телефона
function isValidPhone(phone) {
    const phoneRegex = /^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Регистрация пользователя
function registerUser(firstName, lastName, email, phone, password) {
    const submitBtn = document.querySelector('#registrationForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Регистрация...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Сохраняем пользователя
        const newUser = {
            id: Date.now(),
            firstName,
            lastName,
            email,
            phone,
            password: btoa(password),
            address: '',
            registrationDate: new Date().toLocaleDateString('ru-RU'),
            role: 'parent'
        };
        
        // Сохраняем в список пользователей
        const existingUsers = JSON.parse(localStorage.getItem('vasilek_users')) || [];
        existingUsers.push(newUser);
        localStorage.setItem('vasilek_users', JSON.stringify(existingUsers));
        
        // Автоматически авторизуем пользователя
        userData = newUser;
        localStorage.setItem('vasilek_user', JSON.stringify(userData));
        
        // Обновляем интерфейс
        document.getElementById('userName').textContent = userData.firstName;
        document.querySelector('.account-content').innerHTML = getAuthorizedContent();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
        modal.hide();
        initializeAuthorizedState();
        
        showAlert('Регистрация прошла успешно! Добро пожаловать!', 'success');
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

function initializeAccount() {
    initializeLoginForm();
    initializeRegistrationForm(); 
    loadUserData();
}

function initializeAuthorizedState() {
    renderChildren();
    renderParentInfo();
    renderVisitsHistory();
}

// Инициализация аккаунта
function initializeAccount() {
    loadUserData();
}

// Загрузка данных пользователя
function loadUserData() {
    if (userData) {
        updateParentInfo();
    }
}

// Инициализация формы авторизации
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (validateLoginForm(email, password)) {
                loginUser(email, password);
            }
        });
    }
}

// Валидация формы авторизации
function validateLoginForm(email, password) {
    const errors = [];
    
    if (!email) errors.push('Введите email');
    if (!password) errors.push('Введите пароль');
    
    if (errors.length > 0) {
        showAlert(errors.join(', '), 'danger');
        return false;
    }
    
    if (!isValidEmail(email)) {
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

// Авторизация пользователя
function loginUser(email, password) {
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Вход...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const mockUser = {
            id: 1,
            firstName: 'Милена',
            lastName: 'Асташова',
            email: email,
            phone: '+7 (910) 186-38-17',
            address: 'г. Владимир, ул. Детская, 15, кв. 42',
            registrationDate: '22.05.2024',
            role: 'parent'
        };
        
        userData = mockUser;
        localStorage.setItem('vasilek_user', JSON.stringify(userData));
        
        // Обновляем интерфейс
        document.getElementById('userName').textContent = userData.firstName;
        document.querySelector('.account-content').innerHTML = getAuthorizedContent();
        
        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        
        initializeAuthorizedState();
        
        showAlert('Вы успешно вошли в систему!', 'success');
        
    }, 2000);
}

// Получение контента для авторизованного пользователя
function getAuthorizedContent() {
    return `
        <!-- Блок с информацией о ребенке -->
        <div class="row mb-5">
            <div class="col-12">
                <div class="section-header">
                    <h2 class="section-title">Информация о ребенке</h2>
                    <button class="btn btn-add-child" data-bs-toggle="modal" data-bs-target="#addChildModal">
                        <i class="bi bi-plus-circle"></i> Добавить ребенка
                    </button>
                </div>
            </div>
        </div>

        <div class="row" id="childrenContainer">
            <!-- Дети будут добавлены через JavaScript -->
        </div>

        <!-- Блок с информацией о родителе -->
        <div class="row mt-5">
            <div class="col-12">
                <h2 class="section-title">Информация о родителе</h2>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8 mx-auto">
                <div class="parent-card">
                    <div class="row align-items-center">
                        <div class="col-lg-4 text-center">
                            <div class="parent-photo-wrapper">
                                <img src="images/parents/default-parent.jpg" alt="Фото родителя" class="parent-photo" id="parentPhoto">
                                <button class="btn btn-change-photo" onclick="changeParentPhoto()">
                                    <i class="bi bi-camera"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="parent-details">
                                <h3 class="parent-name" id="parentName">Не указано</h3>
                                <div class="parent-role" id="parentRole">Родитель</div>
                                
                                <div class="info-grid">
                                    <div class="info-item">
                                        <i class="bi bi-telephone"></i>
                                        <div>
                                            <strong>Телефон</strong>
                                            <span id="parentPhone">Не указан</span>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <i class="bi bi-envelope"></i>
                                        <div>
                                            <strong>Email</strong>
                                            <span id="parentEmail">Не указан</span>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <i class="bi bi-geo-alt"></i>
                                        <div>
                                            <strong>Адрес</strong>
                                            <span id="parentAddress">Не указан</span>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <i class="bi bi-calendar"></i>
                                        <div>
                                            <strong>Дата регистрации</strong>
                                            <span id="parentRegDate">-</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="parent-preferences mt-4">
                                    <h6>Предпочтения по уведомлениям:</h6>
                                    <div class="preferences-list">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="emailNotifications">
                                            <label class="form-check-label" for="emailNotifications">
                                                Email уведомления
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="smsNotifications">
                                            <label class="form-check-label" for="smsNotifications">
                                                SMS уведомления
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="parent-actions mt-4">
                                    <button class="btn btn-edit" onclick="editParentInfo()">
                                        <i class="bi bi-pencil"></i> Редактировать данные
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- История посещений -->
        <div class="row mt-5">
            <div class="col-12">
                <h2 class="section-title">История посещений</h2>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="visits-card">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Ребенок</th>
                                    <th>Услуга</th>
                                    <th>Продолжительность</th>
                                    <th>Стоимость</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody id="visitsTable">
                                <!-- Данные будут добавлены через JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Рендер информации о детях
function renderChildren() {
    const container = document.getElementById('childrenContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (childrenData.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-people display-1 text-muted"></i>
                <h4 class="mt-3">Дети не добавлены</h4>
                <p class="text-muted">Добавьте информацию о вашем ребенке для удобного управления</p>
            </div>
        `;
        return;
    }
    
    childrenData.forEach((child, index) => {
        const childCard = createChildCard(child, index);
        container.appendChild(childCard);
    });
}

// Создание карточки ребенка
function createChildCard(child, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-6 col-12';
    
    const age = calculateAge(child.birthdate);
    const preferences = child.preferences || [];
    
    col.innerHTML = `
        <div class="child-card">
            <div class="row align-items-center">
                <div class="col-lg-4 text-center">
                    <div class="child-photo-wrapper">
                        <img src="${child.photo || 'images/child/default-child.jpg'}" alt="${child.firstName}" class="child-photo">
                        <button class="btn btn-change-photo" onclick="changeChildPhoto(${index})">
                            <i class="bi bi-camera"></i>
                        </button>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="child-details">
                        <h3 class="child-name">${child.firstName} ${child.lastName}</h3>
                        <div class="child-age">${age}</div>
                        
                        <div class="info-grid">
                            <div class="info-item">
                                <i class="bi bi-calendar"></i>
                                <div>
                                    <strong>Дата рождения</strong>
                                    <span>${formatDate(child.birthdate)}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-heart-pulse"></i>
                                <div>
                                    <strong>Состояние здоровья</strong>
                                    <span>${child.health || 'Здоров'}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-exclamation-triangle"></i>
                                <div>
                                    <strong>Аллергии</strong>
                                    <span>${child.allergies || 'Нет'}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-cup-straw"></i>
                                <div>
                                    <strong>Питание</strong>
                                    <span>${child.diet || 'Обычное'}</span>
                                </div>
                            </div>
                        </div>

                        ${preferences.length > 0 ? `
                        <div class="child-preferences mt-4">
                            <h6>Интересы:</h6>
                            <div class="preferences-tags">
                                ${preferences.map(pref => `<span class="preference-tag">${getPreferenceText(pref)}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}

                        <div class="child-actions mt-4">
                            <button class="btn btn-edit" onclick="editChildInfo(${index})">
                                <i class="bi bi-pencil"></i> Редактировать
                            </button>
                            <button class="btn btn-delete" onclick="deleteChild(${index})">
                                <i class="bi bi-trash"></i> Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Расчет возраста
function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age === 0) {
        const months = today.getMonth() - birthDate.getMonth() + (12 * (today.getFullYear() - birthDate.getFullYear()));
        return `${months} ${getMonthText(months)}`;
    }
    
    return `${age} ${getYearText(age)}`;
}

// Получение текста для лет/год/года
function getYearText(age) {
    if (age % 10 === 1 && age % 100 !== 11) return 'год';
    if (age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 10 || age % 100 >= 20)) return 'года';
    return 'лет';
}

// Получение текста для месяцев
function getMonthText(months) {
    if (months % 10 === 1 && months % 100 !== 11) return 'месяц';
    if (months % 10 >= 2 && months % 10 <= 4 && (months % 100 < 10 || months % 100 >= 20)) return 'месяца';
    return 'месяцев';
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Получение текста предпочтения
function getPreferenceText(pref) {
    const preferences = {
        'drawing': 'Рисование',
        'music': 'Музыка',
        'sports': 'Спорт',
        'dancing': 'Танцы',
        'reading': 'Чтение',
        'construction': 'Конструирование'
    };
    return preferences[pref] || pref;
}

// Инициализация формы добавления ребенка
function initializeChildForm() {
}

// Сохранение информации о ребенке
function saveChildInfo() {
    const form = document.getElementById('addChildForm');
    const firstName = document.getElementById('childFirstName').value;
    const lastName = document.getElementById('childLastName').value;
    const birthdate = document.getElementById('childBirthdate').value;
    const gender = document.getElementById('childGender').value;
    const health = document.getElementById('childHealth').value;
    const diet = document.getElementById('childDiet').value;
    
    // Сбор интересов
    const interests = [];
    if (document.getElementById('interestDrawing').checked) interests.push('drawing');
    if (document.getElementById('interestMusic').checked) interests.push('music');
    if (document.getElementById('interestSports').checked) interests.push('sports');
    if (document.getElementById('interestDancing').checked) interests.push('dancing');
    if (document.getElementById('interestReading').checked) interests.push('reading');
    if (document.getElementById('interestConstruction').checked) interests.push('construction');
    
    if (!firstName || !lastName || !birthdate) {
        showAlert('Пожалуйста, заполните обязательные поля', 'danger');
        return;
    }
    
    const newChild = {
        id: Date.now(),
        firstName,
        lastName,
        birthdate,
        gender,
        health: health || 'Здоров',
        diet: diet || 'Обычное',
        preferences: interests,
        photo: null
    };
    
    childrenData.push(newChild);
    localStorage.setItem('vasilek_children', JSON.stringify(childrenData));
    
    // Закрываем модальное окно
    const modal = bootstrap.Modal.getInstance(document.getElementById('addChildModal'));
    modal.hide();
    
    renderChildren();
    showAlert('Информация о ребенке успешно сохранена!', 'success');
    form.reset();
}

// Обновление информации о родителе
function updateParentInfo() {
    if (!userData) return;
    
    document.getElementById('parentName').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('parentPhone').textContent = userData.phone || 'Не указан';
    document.getElementById('parentEmail').textContent = userData.email;
    document.getElementById('parentAddress').textContent = userData.address || 'Не указан';
    document.getElementById('parentRegDate').textContent = userData.registrationDate || '-';
}

// Рендер информации о родителе
function renderParentInfo() {
    updateParentInfo();
}

// Рендер истории посещений
function renderVisitsHistory() {
    const container = document.getElementById('visitsTable');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (visitsData.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    <i class="bi bi-calendar-x text-muted"></i>
                    <p class="mt-2 text-muted">Нет данных о посещениях</p>
                </td>
            </tr>
        `;
        return;
    }
    
    visitsData.forEach(visit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(visit.date)}</td>
            <td>${visit.childName}</td>
            <td>${visit.service}</td>
            <td>${visit.duration}</td>
            <td>${visit.price} ₽</td>
            <td><span class="status-badge status-${visit.status}">${getStatusText(visit.status)}</span></td>
        `;
        container.appendChild(row);
    });
}

// Получение текста статуса
function getStatusText(status) {
    const statuses = {
        'completed': 'Завершено',
        'upcoming': 'Запланировано',
        'cancelled': 'Отменено'
    };
    return statuses[status] || status;
}

// Вспомогательные функции
function changeChildPhoto(childIndex) {
    showAlert('Функция изменения фото будет доступна в полной версии', 'info');
}
function changeParentPhoto() {
    showAlert('Функция изменения фото будет доступна в полной версии', 'info');
}
function editChildInfo(childIndex) {
    showAlert('Функция редактирования будет доступна в полной версии', 'info');
}
function editParentInfo() {
    showAlert('Функция редактирования будет доступна в полной версии', 'info');
}
function deleteChild(childIndex) {
    if (confirm('Вы уверены, что хотите удалить информацию о ребенке?')) {
        childrenData.splice(childIndex, 1);
        localStorage.setItem('vasilek_children', JSON.stringify(childrenData));
        renderChildren();
        showAlert('Информация о ребенке удалена', 'success');
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
    }, 5000);
}

// Экспорт функций для глобального использования
window.changeChildPhoto = changeChildPhoto;
window.changeParentPhoto = changeParentPhoto;
window.editChildInfo = editChildInfo;
window.editParentInfo = editParentInfo;
window.deleteChild = deleteChild;
window.saveChildInfo = saveChildInfo;