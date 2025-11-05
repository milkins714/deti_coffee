document.addEventListener('DOMContentLoaded', function() {
    initializeCarousels();
    initializeStarRating();
    initializeReviewForm();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeNavigation();
    initializeFormHandlers();
    
    console.log('Детское пространство "Василёк" успешно загружено!');
});

// Глобальные переменные для управления каруселями
let mainCarousel;
let reviewsCarousel;

// Инициализация каруселей
function initializeCarousels() {
    // Главный слайдер
    const mainCarouselElement = document.getElementById('mainCarousel');
    if (mainCarouselElement) {
        mainCarousel = new bootstrap.Carousel(mainCarouselElement, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });
    }

    // Карусель отзывов
    const reviewsCarouselElement = document.getElementById('reviewsCarousel');
    if (reviewsCarouselElement) {
        reviewsCarousel = new bootstrap.Carousel(reviewsCarouselElement, {
            interval: 6000,
            wrap: true,
            pause: 'hover'
        });

        // Добавляем обработчики для паузы при наведении на отзывы
        const reviewCards = document.querySelectorAll('.review-card');
        reviewCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (reviewsCarousel) {
                    reviewsCarousel.pause();
                }
            });
            card.addEventListener('mouseleave', () => {
                if (reviewsCarousel) {
                    reviewsCarousel.cycle();
                }
            });
        });
    }
}

// Система звездного рейтинга
function initializeStarRating() {
    const stars = document.querySelectorAll('.star-rating .star');
    let currentRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            currentRating = index + 1;
            updateStars(currentRating);
        });
        
        star.addEventListener('mouseover', function() {
            highlightStars(index + 1);
        });
    });
    
    document.querySelectorAll('.star-rating').forEach(rating => {
        rating.addEventListener('mouseleave', function() {
            updateStars(currentRating);
        });
    });
    
    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Возвращение методов для использования в других функциях
    return {
        getRating: () => currentRating,
        setRating: (rating) => {
            currentRating = rating;
            updateStars(rating);
        },
        reset: () => {
            currentRating = 0;
            updateStars(0);
        }
    };
}

// Инициализация формы отзыва
function initializeReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    const starRating = initializeStarRating();
    
    if (reviewForm) {
        // Валидация возраста в реальном времени
        const ageInput = document.getElementById('childAge');
        if (ageInput) {
            ageInput.addEventListener('input', function() {
                const age = parseInt(this.value);
                if (age < 1 || age > 10) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        }
        
        // Обработка отправки формы
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewName').value.trim();
            const childName = document.getElementById('childName').value.trim();
            const childAge = document.getElementById('childAge').value;
            const text = document.getElementById('reviewText').value.trim();
            const rating = starRating.getRating();
            
            // Валидация полей
            if (!validateReviewForm(name, childName, childAge, text, rating)) {
                return;
            }
            
            // Добавление отзыва в карусель
            addReviewToCarousel(name, childName, childAge, text, rating);
            
            // Очистка формы и показ сообщения
            reviewForm.reset();
            starRating.reset();
            showSuccessMessage('Ваш отзыв успешно отправлен и будет добавлен после модерации!');
        });
    }
}

// Валидация формы отзыва
function validateReviewForm(name, childName, childAge, text, rating) {
    const errors = [];
    
    if (!name) errors.push('Укажите ваше имя');
    if (!childName) errors.push('Укажите имя ребенка');
    if (!childAge || childAge < 1 || childAge > 10) errors.push('Укажите корректный возраст ребенка (1-10 лет)');
    if (!text) errors.push('Напишите текст отзыва');
    if (rating === 0) errors.push('Поставьте оценку');
    if (text.length < 10) errors.push('Отзыв должен содержать минимум 10 символов');
    if (text.length > 500) errors.push('Отзыв не должен превышать 500 символов');
    
    if (errors.length > 0) {
        showErrorMessages(errors);
        return false;
    }
    
    return true;
}

function showErrorMessages(errors) {
    const existingAlerts = document.querySelectorAll('.alert-danger');
    existingAlerts.forEach(alert => alert.remove());
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger alert-dismissible fade show';
    errorAlert.innerHTML = `
        <strong>Ошибка заполнения формы:</strong>
        <ul class="mb-0 mt-2">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('reviewForm');
    if (form) {
        form.parentNode.insertBefore(errorAlert, form);
    }
}

function showSuccessMessage(message) {
    const existingAlerts = document.querySelectorAll('.alert-success');
    existingAlerts.forEach(alert => alert.remove());
    
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success alert-dismissible fade show';
    successAlert.innerHTML = `
        <strong>Спасибо!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('reviewForm');
    if (form) {
        form.parentNode.insertBefore(successAlert, form);
        
        setTimeout(() => {
            if (successAlert.parentNode) {
                const bsAlert = new bootstrap.Alert(successAlert);
                bsAlert.close();
            }
        }, 5000);
    }
}

// Добавление отзыва в карусель 
function addReviewToCarousel(name, childName, childAge, text, rating) {
    const reviewsCarouselElement = document.getElementById('reviewsCarousel');
    if (!reviewsCarouselElement) return;
    
    const carouselInner = reviewsCarouselElement.querySelector('.carousel-inner');
    if (!carouselInner) return;
    
    // Получаем текущие элементы карусели
    const existingItems = carouselInner.querySelectorAll('.carousel-item');
    
    // Создаем новый элемент отзыва
    const starsHtml = Array(5).fill(0).map((_, index) => 
        `<span class="star ${index < rating ? 'active' : ''}">★</span>`
    ).join('');
    
    const currentDate = new Date().toLocaleDateString('ru-RU');
    const parentRole = getParentRole(name, childName);
    const ageSuffix = getAgeSuffix(childAge);
    
    const newReview = document.createElement('div');
    newReview.className = 'carousel-item'; 
    newReview.innerHTML = `
        <div class="review-card">
            <div class="review-header">
                <div class="review-rating">
                    ${starsHtml}
                    <span class="rating-value">${rating}.0</span>
                </div>
                <div class="review-date">${currentDate}</div>
            </div>
            <div class="review-text">
                "${text}"
            </div>
            <div class="review-author">
                <div class="author-main">
                    <i class="bi bi-person-circle"></i>
                    <div>
                        <strong class="parent-name">${name}</strong>
                        <div class="child-info">
                            <i class="bi bi-arrow-return-right"></i>
                            <span class="child-name">${parentRole}</span>
                            <span class="child-age">(${childAge} ${ageSuffix})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем новый отзыв в конец
    carouselInner.appendChild(newReview);
    
    updateCarouselIndicators();
    reinitializeReviewsCarousel();
    
    // Показываем новый отзыв
    showNewReview(existingItems.length);
}

// Функция для показа нового отзыва
function showNewReview(newItemIndex) {
    if (!reviewsCarousel) return;
    
    // Переключаемся на новый отзыв
    reviewsCarousel.to(newItemIndex);
}

// Переинициализация карусели отзывов
function reinitializeReviewsCarousel() {
    const reviewsCarouselElement = document.getElementById('reviewsCarousel');
    if (!reviewsCarouselElement) return;
    
    // Уничтожаем старую карусель
    if (reviewsCarousel) {
        reviewsCarousel.dispose();
    }
    
    // Создаем новую карусель
    reviewsCarousel = new bootstrap.Carousel(reviewsCarouselElement, {
        interval: 6000,
        wrap: true,
        pause: 'hover'
    });
    
    // Добавляем обработчики для новых карточек
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        // Удаляем старые обработчики
        card.replaceWith(card.cloneNode(true));
    });
    
    // Добавляем новые обработчики
    const newReviewCards = document.querySelectorAll('.review-card');
    newReviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (reviewsCarousel) {
                reviewsCarousel.pause();
            }
        });
        card.addEventListener('mouseleave', () => {
            if (reviewsCarousel) {
                reviewsCarousel.cycle();
            }
        });
    });
}

// Обновление индикаторов карусели 
function updateCarouselIndicators() {
    const reviewsCarouselElement = document.getElementById('reviewsCarousel');
    if (!reviewsCarouselElement) return;
    
    const carouselInner = reviewsCarouselElement.querySelector('.carousel-inner');
    const indicatorsContainer = reviewsCarouselElement.querySelector('.carousel-indicators');
    
    if (!carouselInner || !indicatorsContainer) return;
    
    const items = carouselInner.querySelectorAll('.carousel-item');
    
    // Очищаем существующие индикаторы
    indicatorsContainer.innerHTML = '';
    
    // Создаем новые индикаторы
    items.forEach((_, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('data-bs-target', '#reviewsCarousel');
        button.setAttribute('data-bs-slide-to', index.toString());
        if (index === 0) {
            button.classList.add('active');
            button.setAttribute('aria-current', 'true');
        }
        
        button.addEventListener('click', function() {
            // Обновляем активный класс у индикаторов
            indicatorsContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
                btn.removeAttribute('aria-current');
            });
            this.classList.add('active');
            this.setAttribute('aria-current', 'true');
        });
        
        indicatorsContainer.appendChild(button);
    });
}

// Определение роли родителя по имени
function getParentRole(parentName, childName) {
    if (!parentName) return `родитель ${childName}`;
    
    const name = parentName.trim();
    const femaleEndings = ['а', 'я', 'ья', 'на', 'та', 'ва'];
    const maleEndings = ['й', 'ь', 'н', 'р', 'т', 'с'];
    
    const lastNameChar = name.slice(-1).toLowerCase();
    
    if (femaleEndings.includes(lastNameChar)) {
        return `мама ${childName}`;
    } else if (maleEndings.includes(lastNameChar)) {
        return `папа ${childName}`;
    } else {
        return `родитель ${childName}`;
    }
}

// Функция для правильного склонения возраста
function getAgeSuffix(age) {
    age = parseInt(age);
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'лет';
    }
    
    switch (lastDigit) {
        case 1:
            return 'год';
        case 2:
        case 3:
        case 4:
            return 'года';
        default:
            return 'лет';
    }
}

// Плавная прокрутка
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#!')) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Анимации при скролле
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.fact-card, .feature-item, .review-card, .add-review, .faq-accordion .accordion-item'
    );
    
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
    
    // Анимация для карточек фактов
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Навигация с подсветкой активного раздела
function initializeNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Обработчики для других форм
function initializeFormHandlers() {
    document.querySelectorAll('form:not(#reviewForm)').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showSuccessMessage('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            }, 2000);
        });
    });
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

window.addEventListener('resize', debounce(() => {
    initializeScrollAnimations();
}, 250));

window.VasilekApp = {
    initializeStarRating,
    initializeReviewForm,
    addReviewToCarousel,
    showSuccessMessage
};