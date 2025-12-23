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
