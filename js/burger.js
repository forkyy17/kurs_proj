
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerOverlay = document.getElementById('burgerOverlay');
    const closeBurger = document.querySelector('.close-burger');
    const modalLinks = document.querySelectorAll('.modal-nav-links a');

    if (burgerMenu && burgerOverlay) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            burgerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeBurger && burgerOverlay) {
        closeBurger.addEventListener('click', function() {
            burgerOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    // Закрытие по клику вне окна
    if (burgerOverlay) {
        burgerOverlay.addEventListener('click', function(e) {
            if (e.target === burgerOverlay) {
                burgerOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    // Закрытие по клику на ссылку
    modalLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}); 