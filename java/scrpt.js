$(document).ready(function () {

    // HAMBURGER
    if ($('.hamburger').length && $('.side-menu').length && $('.overlay').length) {
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
    }

    // FLIP CARDS
    if ($('.card').length) {
        $('.card').click(function () {
            $(this).toggleClass('flip');
        });
    }

});

$(document).ready(function () {

    // LUPA
    if ($('.search-icon').length && $('.search-container').length) {
        $('.search-icon').on('click', function (e) {
            e.stopPropagation();
            $('.search-container').toggleClass('active');
            $('.search-input').focus();
        });

        $(document).on('click', function () {
            $('.search-container').removeClass('active');
        });
    }

});

// CÍRCULO → CARTA ALEATORIA
if ($('.circle-img img').length && $('.card').length) {
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

/* ================= SLIDESHOW ================= */
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

/* ================= EDITORIAL SCROLL ================= */
$(window).on("scroll", function () {
    const editorial = $(".editorial");
    if (editorial.length) {
        const trigger = editorial.offset().top - $(window).height() + 200;
        if ($(window).scrollTop() > trigger) {
            $(".ed-img, .ed-text").addClass("visible");
        }
    }
});

/* ================= CATALOGO ================= */
$(document).ready(function () {

    const $grid = $('.catalog-grid');
    if (!$grid.length || !$('.view-btn').length) return;

    $('.view-btn').on('click', function () {

        const cols = $(this).data('cols');

        $('.view-btn').removeClass('active');
        $(this).addClass('active');

        $grid.removeClass('view-1 view-2 view-3 view-4 view-5');

        if (cols === 2) $grid.addClass('view-1');
        if (cols === 3) $grid.addClass('view-2');
        if (cols === 4) $grid.addClass('view-3');
        if (cols === 5) $grid.addClass('view-4');
        if (cols === 6) $grid.addClass('view-5');
    });

});

$(document).ready(function () {

    $('.view-btn').on('click', function () {
        const view = $(this).data('view');

        // botón activo
        $('.view-btn').removeClass('active');
        $(this).addClass('active');

        // cambiar clase del grid
        $('.catalog-grid')
            .removeClass('view-2 view-4 view-6')
            .addClass(view);
    });

});


/* ================= ESPADA OCULTA ================= */
$(document).ready(function () {

    const sword = $('#avalon-sword');
    const modal = $('#sword-modal');

    if (!sword.length || !modal.length) return;

    function placeSword() {

        const docWidth = $(document).width();
        const docHeight = $(document).height();

        const x = Math.random() * (docWidth - 100);
        const y = Math.random() * (docHeight - 120);

        sword.css({ left: x + 'px', top: y + 'px' });
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

/* ================= JUEGO ARTURO ================= */
$(function () {

    if (!$('.artifact').length || !$('#arturo-win').length) return;

    const correctOrder = [1, 3, 4, 5, 2];
    const $win = $('#arturo-win');

    $('.artifact').draggable({
        containment: 'body',
        scroll: false,
        stop: function () {
            checkWin();
        }
    });

    function checkWin() {

        const items = $('.artifact');
        if (items.length !== correctOrder.length) return;

        const sorted = items.toArray()
            .sort((a, b) => $(a).offset().left - $(b).offset().left)
            .map(el => parseInt($(el).data('order'), 10));

        if (JSON.stringify(sorted) === JSON.stringify(correctOrder)) {
            $win.addClass('active');
        }
    }

    $('.close-postcard').on('click', function () {
        $win.removeClass('active');
    });

});

/* ================= GLOW ================= */
document.addEventListener("DOMContentLoaded", function () {
    const glowContainer = document.querySelector('.magic-glow');
    if (!glowContainer) return;

    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.style.top = Math.random() * 100 + '%';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDuration = (2 + Math.random() * 3) + 's';
        span.style.animationDelay = Math.random() * 3 + 's';
        glowContainer.appendChild(span);
    }
});

/* ================= ABOUT SWORDS ================= */
$(window).on("scroll", function () {
    if (!$('.about-swords').length) return;

    const trigger = $(".about-swords").offset().top - $(window).height() / 2;
    if ($(window).scrollTop() > trigger) {
        $(".sword-left").css("transform", "translate(-200%, -50%) rotate(-45deg)");
        $(".sword-right").css("transform", "translate(100%, -50%) rotate(45deg)");
        $(".about-text").css("opacity", "1");
    }
});

/* ================= ABOUT PUZZLE ================= */
const container = document.querySelector('.swords-puzzle');
if (container) {

    const correctPositions = {
        'piece-left-top': { top: 50, left: 50 },
        'piece-left-bottom': { top: 50, left: 200 },
        'piece-right-top': { top: 200, left: 50 },
        'piece-right-bottom': { top: 200, left: 200 }
    };

    container.addEventListener('mouseenter', () => {
        for (const [id, pos] of Object.entries(correctPositions)) {
            const piece = document.getElementById(id);
            if (piece) {
                piece.style.top = pos.top + 'px';
                piece.style.left = pos.left + 'px';
            }
        }
    });

    container.addEventListener('mouseleave', () => {
        const pieces = document.querySelectorAll('.puzzle-piece');
        const maxX = container.clientWidth - 150;
        const maxY = container.clientHeight - 150;

        pieces.forEach(piece => {
            piece.style.top = Math.random() * maxY + 'px';
            piece.style.left = Math.random() * maxX + 'px';
        });
    });
}

/* ================= CARRITO ================= */
$(document).ready(function () {

    const cart = $('#cart-popup');
    const overlay = $('.overlay');

    // ABRIR carrito
    $('#cart-icon').on('click', function (e) {
        e.preventDefault();
        cart.addClass('active');
        overlay.addClass('active');
    });

    // CERRAR carrito (X)
    $('#cart-close').on('click', function () {
        cart.removeClass('active');
        overlay.removeClass('active');
    });

    // CERRAR haciendo click fuera
    overlay.on('click', function () {
        cart.removeClass('active');
        overlay.removeClass('active');
    });

});
$(document).ready(function () {

    // Eliminar item del carrito
    $(document).on('click', '.remove-item', function () {
        $(this).closest('.cart-item').remove();
    });

});
$(document).on('click', '.remove-item', function () {
    $(this).closest('.cart-item').slideUp(200, function () {
        $(this).remove();
    });
});

