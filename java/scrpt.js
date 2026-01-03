$(document).ready(function () {

    // HAMBURGER
  $('.hamburger').click(function () {
    $('.side-menu').addClass('open').css('left', '0');
    $('.overlay').css({
        opacity: 1,
        pointerEvents: 'all'
    });
});

$('.overlay').click(function () {
    $('.side-menu').removeClass('open').css('left', '-250px');
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
if ($('.circle-img img').length) {
    $('.circle-img img').on('click', function () {

        const cards = $('.card');
        cards.removeClass('raised flip');

        const randomIndex = Math.floor(Math.random() * cards.length);
        const selectedCard = $(cards[randomIndex]);

        selectedCard.addClass('raised');

        setTimeout(() => {
            selectedCard.addClass('flip');
        }, 300);
    });
}


const galleryImages = document.querySelectorAll('.g-img');
const overlay = document.querySelector('.slideshow-overlay');
const overlayImg = document.querySelector('.slideshow-img');
const closeBtn = document.querySelector('.close-slideshow');

if (galleryImages.length && overlay && overlayImg && closeBtn) {

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            overlayImg.src = img.src;
            overlay.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

}


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

// CATALOGO

$(document).ready(function () {

    const $grid = $('.catalog-grid');

    $('.view-btn').on('click', function () {

        const cols = $(this).data('cols');

        // Botones
        $('.view-btn').removeClass('active');
        $(this).addClass('active');

        // Limpiar vistas
        $grid.removeClass('view-1 view-2 view-3 view-4 view-5');

        // Aplicar vista correcta
        if (cols === 2) $grid.addClass('view-1');
        if (cols === 3) $grid.addClass('view-2');
        if (cols === 4) $grid.addClass('view-3');
        if (cols === 5) $grid.addClass('view-4');
        if (cols === 6) $grid.addClass('view-5');
    });

});

// JUEGO ESPADA OCULTA (posición libre en TODO el documento)
$(document).ready(function () {

    const sword = $('#avalon-sword');
    const modal = $('#sword-modal');

    if (!sword.length || !modal.length) return;

    function placeSword() {

        const docWidth = $(document).width();
        const docHeight = $(document).height();

        const x = Math.random() * (docWidth - 100);
        const y = Math.random() * (docHeight - 120);

        sword.css({
            left: x + 'px',
            top: y + 'px'
        });
    }

    placeSword();
    sword.fadeIn();

    sword.on('click', function () {
        modal.addClass('active');
    });

    $('.close-sword').on('click', function () {
        modal.removeClass('active');
    });

    $('#claim-sword').on('click', function () {
        const email = $('#sword-email').val();
        if (!email) {
            alert('Introduce tu correo');
            return;
        }

        modal.removeClass('active');
        sword.fadeOut();
    });

});


// JUEGO ARTURO
document.addEventListener('DOMContentLoaded', () => {
    const artifacts = document.querySelectorAll('.artifact');
    const container = document.querySelector('.arturo-game');

    // Posiciones iniciales aleatorias + rotaciones
    artifacts.forEach(item => {
        const containerRect = container.getBoundingClientRect();
        const x = Math.random() * (containerRect.width - item.offsetWidth);
        const y = Math.random() * (containerRect.height - item.offsetHeight);
        const rotate = (Math.random() * 20) - 10; // rotación entre -10° y +10°

        item.style.left = x + 'px';
        item.style.top = y + 'px';
        item.style.transform = `rotate(${rotate}deg)`;
    });

    let dragged = null;
    let offsetX = 0;
    let offsetY = 0;

    artifacts.forEach(item => {
        item.addEventListener('mousedown', e => {
            dragged = item;
            const rect = dragged.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            dragged.style.zIndex = 1000;
        });
    });

    document.addEventListener('mousemove', e => {
        if (!dragged) return;

        const containerRect = container.getBoundingClientRect();
        let x = e.clientX - containerRect.left - offsetX;
        let y = e.clientY - containerRect.top - offsetY;

        // Limitar dentro del contenedor
        x = Math.max(0, Math.min(containerRect.width - dragged.offsetWidth, x));
        y = Math.max(0, Math.min(containerRect.height - dragged.offsetHeight, y));

        dragged.style.left = x + 'px';
        dragged.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (dragged) {
            dragged.style.zIndex = 10;
            dragged = null;
        }
    });
});




