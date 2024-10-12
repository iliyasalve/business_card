window.onload = () => {
    isDarkTheme = localStorage.getItem('theme') === 'dark'; 
    updateTheme();
    console.log("Тема при загрузке:", isDarkTheme ? "темная" : "светлая"); 
    initCookieModal();
};
