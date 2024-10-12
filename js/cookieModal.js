// Функция для инициализации модального окна
function initCookieModal() {
    var modal = $('#cookieModal');

    // Проверка, показывать ли модальное окно
    if (!sessionStorage.getItem('cookiesAccepted')) {
        // Показать модальное окно
        modal.modal('show');
    }

    // Обработка согласия
    document.getElementById('acceptCookies').onclick = function() {
        sessionStorage.setItem('cookiesAccepted', 'true');
    };
}
