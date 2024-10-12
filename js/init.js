window.onload = () => {
    isDarkTheme = localStorage.getItem('theme') === 'dark'; 
    updateTheme();
    initCookieModal();
};
