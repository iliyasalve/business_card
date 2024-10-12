window.onload = () => {
    // Применение сохраненной темы при загрузке страницы
    isDarkTheme = localStorage.getItem('theme') === 'dark'; // Проверяем сохраненное значение
    updateTheme(); // Применяем тему
    console.log("Тема при загрузке:", isDarkTheme ? "темная" : "светлая"); // Лог при загрузке

    // Инициализация модального окна
    initCookieModal();
};
