document.addEventListener('DOMContentLoaded', function() {
    initializeStaffCards();
    initializeRequestForm();
    initializeModal();
    initializeAnimations();
    
    console.log('Страница "Наши помощницы" загружена!');
});

// Данные о сотрудниках
const staffData = [
    {
        id: 1,
        name: "Анна Петрова",
        position: "Старший педагог",
        experience: "8 лет опыта",
        photo: "zensina-srednego-rosta-s-bloknotami.jpg",
        skills: ["Развитие речи", "Подготовка к школе", "Арт-терапия"],
        education: "Высшее педагогическое образование, МПГУ",
        specialization: "Дошкольная педагогика и психология",
        languages: "Английский язык",
        bio: "Анна обладает уникальным подходом к каждому ребенку. Специализируется на подготовке детей к школе и развитии творческих способностей. Регулярно проходит курсы повышения квалификации.",
        features: [
            "Опыт работы с детьми от 1 года",
            "Сертификат Монтессори-педагогики",
            "Курс детской психологии"
        ]
    },
    {
        id: 2,
        name: "Мария Сидорова",
        position: "Педагог-психолог",
        experience: "6 лет опыта",
        photo: "zensina-derzasaa-dokumenty-i-stoasaa-izolirovana-na-sinem.jpg",
        skills: ["Детская психология", "Коррекционные занятия", "Сказкотерапия"],
        education: "Высшее психологическое образование, МГУ",
        specialization: "Детская и семейная психология",
        languages: "Французский язык",
        bio: "Мария помогает детям справляться с эмоциональными трудностями и адаптироваться в коллективе. Использует современные методики арт-терапии и игровые техники.",
        features: [
            "Сертифицированный детский психолог",
            "Опыт работы с особыми детьми",
            "Автор развивающих программ"
        ]
    },
    {
        id: 3,
        name: "Елена Козлова",
        position: "Воспитатель",
        experience: "5 лет опыта",
        photo: "krasivaa-zensina-delaet-makiaz-doma.jpg",
        skills: ["Раннее развитие", "Логопедические упражнения", "Музыкальные занятия"],
        education: "Среднее специальное педагогическое образование",
        specialization: "Дошкольное воспитание",
        languages: "-",
        bio: "Елена создает теплую и дружескую атмосферу для самых маленьких посетителей. Специализируется на развитии моторики и сенсорного восприятия у детей 1-3 лет.",
        features: [
            "Курсы по раннему развитию",
            "Медицинская подготовка",
            "Первая помощь детям"
        ]
    },
    {
        id: 4,
        name: "Ольга Новикова",
        position: "Педагог по творчеству",
        experience: "7 лет опыта",
        photo: "4.png",
        skills: ["Рисование", "Лепка", "Рукоделие", "Театральные постановки"],
        education: "Художественно-графический факультет, МПГУ",
        specialization: "Изобразительное искусство",
        languages: "Английский язык",
        bio: "Ольга раскрывает творческий потенциал каждого ребенка через различные виды искусства. Проводит увлекательные мастер-классы и творческие занятия.",
        features: [
            "Член союза художников",
            "Автор методик арт-терапии",
            "Опыт работы в детских студиях"
        ]
    },
    {
        id: 5,
        name: "Ирина Волкова",
        position: "Музыкальный руководитель",
        experience: "4 года опыта",
        photo: "5.jpeg",
        skills: ["Музыкальные игры", "Пение", "Ритмика", "Игра на инструментах"],
        education: "Музыкальное училище им. Гнесиных",
        specialization: "Музыкальное образование",
        languages: "Немецкий язык",
        bio: "Ирина знакомит детей с миром музыки через игровые методики. Развивает музыкальный слух, чувство ритма и любовь к искусству у детей всех возрастов.",
        features: [
            "Диплом по классу фортепиано",
            "Курсы Орф-педагогики",
            "Опыт работы с вокальными ансамблями"
        ]
    },
    {
        id: 6,
        name: "Светлана Морозова",
        position: "Инструктор по физкультуре",
        experience: "5 лет опыта",
        photo: "6.png",
        skills: ["Детский фитнес", "Йога для детей", "Подвижные игры", "ЛФК"],
        education: "Институт физической культуры",
        specialization: "Физическое воспитание",
        languages: "-",
        bio: "Светлана проводит динамичные и веселые занятия, способствующие физическому развитию и укреплению здоровья детей. Особое внимание уделяет правильной осанке и координации.",
        features: [
            "Сертификат детского фитнеса",
            "Курсы по ЛФК для детей",
            "Опыт работы в спортивных секциях"
        ]
    }
];

// Инициализация карточек сотрудников
function initializeStaffCards() {
    const container = document.getElementById('staffContainer');
    
    if (!container) return;
    
    staffData.forEach(staff => {
        const card = createStaffCard(staff);
        container.appendChild(card);
    });
}

// Создание карточки сотрудника
function createStaffCard(staff) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    
    const skillsHtml = staff.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    col.innerHTML = `
        <div class="staff-card" data-staff-id="${staff.id}">
            <div class="staff-photo-wrapper">
                <img src="${staff.photo}" alt="${staff.name}" class="staff-photo">
            </div>
            <div class="staff-info">
                <h4 class="staff-name">${staff.name}</h4>
                <div class="staff-position">${staff.position}</div>
                <div class="staff-experience">${staff.experience}</div>
                <div class="staff-skills">
                    ${skillsHtml}
                </div>
                <button class="btn btn-details" data-bs-toggle="modal" data-bs-target="#staffModal" onclick="openStaffModal(${staff.id})">
                    Подробнее
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Открытие модального окна с информацией о сотруднике
function openStaffModal(staffId) {
    const staff = staffData.find(s => s.id === staffId);
    const modalBody = document.getElementById('staffModalBody');
    
    if (!staff || !modalBody) return;
    
    const featuresHtml = staff.features.map(feature => 
        `<div class="detail-feature">
            <i class="bi bi-check-circle-fill"></i>
            <span>${feature}</span>
        </div>`
    ).join('');
    
    const skillsHtml = staff.skills.map(skill => 
        `<span class="skill-tag-large">${skill}</span>`
    ).join('');
    
    modalBody.innerHTML = `
        <div class="staff-detail-content">
            <img src="${staff.photo}" alt="${staff.name}" class="staff-detail-photo">
            <div class="staff-detail-info">
                <h3 class="staff-detail-name">${staff.name}</h3>
                <div class="staff-detail-position">${staff.position}</div>
                
                <div class="staff-detail-experience">
                    <strong>Стаж работы:</strong> ${staff.experience}
                </div>
                
                <div class="detail-features">
                    ${featuresHtml}
                </div>
                
                <div class="staff-detail-skills">
                    <h6>Навыки и специализация:</h6>
                    <div class="skills-grid">
                        ${skillsHtml}
                    </div>
                </div>
                
                <div class="staff-detail-education mb-3">
                    <strong>Образование:</strong> ${staff.education}
                </div>
                
                <div class="staff-detail-specialization mb-3">
                    <strong>Специализация:</strong> ${staff.specialization}
                </div>
                
                ${staff.languages !== '-' ? `
                <div class="staff-detail-languages mb-3">
                    <strong>Иностранные языки:</strong> ${staff.languages}
                </div>
                ` : ''}
                
                <div class="staff-detail-bio">
                    <strong>О себе:</strong> ${staff.bio}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('staffModalLabel').textContent = staff.name;
}

// Инициализация модального окна
function initializeModal() {
    const modal = document.getElementById('staffModal');
    
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            document.getElementById('staffModalBody').innerHTML = '';
        });
    }
}

// Анимации при скролле
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.staff-card, .request-card, .team-photo-wrapper');
    
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
    if (e.target.tagName === 'IMG' && e.target.classList.contains('staff-photo')) {
        e.target.src = 'images/staff/default-avatar.jpg';
    }
}, true);

// Экспорт функций для глобального использования
window.openStaffModal = openStaffModal;