
function initCookieModal() {
    var modal = $('#cookieModal');


    if (!sessionStorage.getItem('cookiesAccepted')) {

        modal.modal('show');
    }


    document.getElementById('acceptCookies').onclick = function() {
        sessionStorage.setItem('cookiesAccepted', 'true');
    };
}
