// Проверка сохраненной темы при загрузке страницы
let isDarkTheme = localStorage.getItem('theme') === 'dark'; // По умолчанию светлая тема

function toggleTheme() {
    isDarkTheme = !isDarkTheme; // Переключаем тему
    console.log("Текущая тема:", isDarkTheme ? "темная" : "светлая"); // Лог текущей темы
    updateTheme();
}

// Функция для обновления темы
function updateTheme() {
    const body = document.body;
    const themeSections = document.querySelectorAll('.theme-section');
    const cardBodies = document.querySelectorAll('.card-body');
    const projectLinks = document.querySelectorAll('.theme-section a'); // Ссылки проектов
    const headings = document.querySelectorAll('.theme-section h3'); // Заголовки в секциях

    if (isDarkTheme) {
        body.classList.add('bg-dark', 'text-white');
        body.classList.remove('bg-light', 'text-dark');

        themeSections.forEach(section => {
            section.classList.add('bg-dark', 'text-white');
        });

        cardBodies.forEach(card => {
            card.classList.add('bg-dark', 'text-white');
        });

        projectLinks.forEach(link => {
            link.classList.add('text-white'); // Применяем стиль для ссылок
        });

        headings.forEach(heading => {
            heading.classList.remove('text-body'); // Убираем стандартный цвет
            heading.classList.add('text-light'); // Добавляем светлый цвет
        });

        localStorage.setItem('theme', 'dark'); // Сохраняем выбор темы
    } else {
        body.classList.add('bg-light', 'text-dark');
        body.classList.remove('bg-dark', 'text-white');

        themeSections.forEach(section => {
            section.classList.remove('bg-dark', 'text-white');
        });

        cardBodies.forEach(card => {
            card.classList.remove('bg-dark', 'text-white');
        });

        projectLinks.forEach(link => {
            link.classList.remove('text-white'); // Убираем стиль для ссылок
        });

        headings.forEach(heading => {
            heading.classList.remove('text-light'); // Убираем светлый цвет
            heading.classList.add('text-body'); // Возвращаем стандартный цвет
        });

        localStorage.setItem('theme', 'light'); // Сохраняем выбор темы
    }
}

// Применение сохраненной темы при загрузке страницы
window.onload = () => {
    isDarkTheme = localStorage.getItem('theme') === 'dark'; // Проверяем сохраненное значение
    updateTheme(); // Применяем тему
    console.log("Тема при загрузке:", isDarkTheme ? "темная" : "светлая"); // Лог при загрузке
};
