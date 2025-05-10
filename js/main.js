// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен');
    const sliderContent = document.querySelector('.slider-content img');
    const prevButton = document.querySelector('.slider-arrow.left');
    const nextButton = document.querySelector('.slider-arrow.right');

    // Массив с путями к изображениям
    const images = [
        'images/funny/обезьяна.jpg',
        'images/funny/fun2.jpeg',
        'images/funny/fun3.jpg',
        'images/funny/fun1.jpg',
        'images/funny/fun4.jpg'
    ];

    let currentImageIndex = 0;

    // Функция для обновления изображения
    function updateImage() {
        sliderContent.src = images[currentImageIndex];
        sliderContent.alt = `Фото животного ${currentImageIndex + 1}`;
    }

    // Инициализация первого изображения
    updateImage();

    // Обработчик для кнопки "предыдущее"
    prevButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    // Обработчик для кнопки "следующее"
    nextButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });
}); 