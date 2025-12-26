$(document).ready(function () {

    // HAMBURGER
    $('.hamburger').click(function () {
        $('.side-menu').css('left', '0');
        $('.overlay').css({
            opacity: 1,
            pointerEvents: 'all'
        });
    });

    $('.overlay').click(function () {
        $('.side-menu').css('left', '-250px');
        $('.overlay').css({
            opacity: 0,
            pointerEvents: 'none'
        });
    });

    // FLIP CARDS
    $('.card').click(function () {
        $(this).toggleClass('flip');
    });

});

$(document).ready(function () {

    // LUPA DESENFUNDA
    $('.search-icon').on('click', function (e) {
        e.stopPropagation();
        $('.search-container').toggleClass('active');
        $('.search-input').focus();
    });

    // CERRAR AL CLICAR FUERA
    $(document).on('click', function () {
        $('.search-container').removeClass('active');
    });

});

// CÍRCULO → CARTA ALEATORIA
// CÍRCULO → ELEVA Y GIRA CARTA ALEATORIA
$('.circle-img img').on('click', function () {

    const cards = $('.card');

    // Resetear todas
    cards.removeClass('raised flip');

    // Elegir índice aleatorio
    const randomIndex = Math.floor(Math.random() * cards.length);

    // Carta elegida
    const selectedCard = $(cards[randomIndex]);

    // Elevar
    selectedCard.addClass('raised');

    // Pequeño delay para dramatismo antes del giro
    setTimeout(() => {
        selectedCard.addClass('flip');
    }, 300);

});

const galleryImages = document.querySelectorAll('.g-img');
const overlay = document.querySelector('.slideshow-overlay');
const overlayImg = document.querySelector('.slideshow-img');
const closeBtn = document.querySelector('.close-slideshow');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        overlayImg.src = img.src;
        overlay.classList.add('active');
    });
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
});

$(window).on("scroll", function () {
    const trigger = $(".editorial").offset().top - $(window).height() + 200;

    if ($(window).scrollTop() > trigger) {
        $(".ed-img, .ed-text").addClass("visible");
    }
});

