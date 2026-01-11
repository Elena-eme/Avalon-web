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

});

/* ================= ORÁCULO + TEXTO ================= */
$(function () {
    const $cards = $('.oracle-card');
    const $btn = $('.circle-img img');

    const $modal = $('#oracle-modal');
    const $panel = $modal.find('.oracle-modal__panel');
    const $backdrop = $modal.find('.oracle-modal__backdrop');
    const $close = $modal.find('.oracle-modal__close');

    const $title = $('#oracle-title');
    const $text = $('#oracle-text');
    const $preview = $('#oracle-preview');

if (!$cards.length || !$btn.length || !$modal.length) return;

let lastIndex = -1;

const ORACLE_CONTENT = {
    moon: {
        title: "THE MOON · LA LUNA",
        text: "Bajo la Luna, la silueta se vuelve secreto: un velo que deja pasar lo justo. La intuición manda y lo visible se vuelve secundario. Hay belleza en lo que no se explica, en lo que se insinúa. La sombra no oculta: protege, delimita, crea aura. Cada pliegue es un susurro, cada transparencia una decisión. Avalon nace en la penumbra, donde el misterio se convierte en presencia."
    },
    sun: {
        title: "THE SUN · EL SOL",
        text: "El Sol revela sin pedir permiso: estructura, claridad y piel luminosa. No hay duda, solo forma: líneas limpias y intención. La presencia se sostiene sin exceso, como una corona silenciosa. La luz no perdona, pero también ennoblece lo esencial. Vestir el día es elegir potencia con calma. Avalon es el resplandor que convierte lo cotidiano en rito."
    },
    star: {
        title: "THE STAR · LA ESTRELLA",
        text: "La Estrella guía cuando todo calla: un brillo mínimo, pero exacto. Promesa, renacimiento, delicadeza que protege como una armadura suave. Hay futuro en los detalles: puntadas, transparencias, destellos. La noche se vuelve mapa cuando encuentras tu constelación. No es suerte: es dirección, paciencia y fe en la propia forma. Avalon viste la esperanza, como si la oscuridad también tuviera camino."
    }
};

function getCardImageSrc($card){
    const fromBack = $card.find('.card-back img').attr('src');
    if (fromBack) return fromBack;

    const anyImg = $card.find('img').first().attr('src');
    return anyImg || "";
}

function positionPanelNearCard($card){
    if (window.innerWidth <= 720) {
        $panel.css({ left: '', top: '', transform: '' });
        return;
    }

    const margin = 24;
    const rect = $card[0].getBoundingClientRect();

    const panelRect = $panel[0].getBoundingClientRect();

    let left = rect.right + margin;

    if (left + panelRect.width > window.innerWidth - margin) {
        left = rect.left - margin - panelRect.width;
    }

    left = Math.max(margin, Math.min(left, window.innerWidth - margin - panelRect.width));

    let top = rect.top + (rect.height - panelRect.height) / 2;
    top = Math.max(margin, Math.min(top, window.innerHeight - margin - panelRect.height));

    $panel.css({
        left: left + 'px',
        top: top + 'px',
        transform: 'none'
    });
}

function openOracleModal(key, $card){
    const content = ORACLE_CONTENT[key] || { title: "ORÁCULO", text: "…" };

    $title.text(content.title);
    $text.text(content.text);
    $preview.attr('src', getCardImageSrc($card));

    $modal.addClass('is-open').attr('aria-hidden', 'false');
    $('body').css('overflow', 'hidden');

    requestAnimationFrame(() => positionPanelNearCard($card));
}

function closeOracleModal(){
    $modal.removeClass('is-open').attr('aria-hidden', 'true');
    $('body').css('overflow', '');
    // opcional: reset al centro
    $panel.css({ left: '', top: '', transform: '' });
}

    $close.off('click.oracle').on('click.oracle', closeOracleModal);
    $backdrop.off('click.oracle').on('click.oracle', closeOracleModal);

$(document).off('keydown.oracle').on('keydown.oracle', function (e) {
    if (e.key === 'Escape' && $modal.hasClass('is-open')) closeOracleModal();
});

$cards.off('click.oracle').on('click.oracle', function () {
    const $card = $(this);
    $card.toggleClass('flip');

    if ($card.hasClass('flip')) {
        openOracleModal($card.data('oracle'), $card);
    }
});

$btn.off('click.oracle').on('click.oracle', function () {
    $cards.removeClass('raised flip');

    const available = $cards.map((i) => (i !== lastIndex ? i : null)).get();
    const randomIndex = available[Math.floor(Math.random() * available.length)];
    const $selected = $cards.eq(randomIndex);

    $selected.addClass('raised');
    setTimeout(() => {
        $selected.addClass('flip');
        openOracleModal($selected.data('oracle'), $selected);
    }, 300);

    lastIndex = randomIndex;
});

    $(window).off('resize.oracle').on('resize.oracle', function(){
        if (!$modal.hasClass('is-open')) return;
        const key = $title.text();
        const $raised = $cards.filter('.raised');
        if ($raised.length) positionPanelNearCard($raised);
    });
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

 /* ================= CATALOGO ================= */
$(document).ready(function () {
    const $grid = $(".catalog-grid");
    const $btns = $(".view-btn");
    if (!$grid.length || !$btns.length) return;

    $btns.on("click", function () {
        const view = $(this).data("view");

        $btns.removeClass("active");
        $(this).addClass("active");

        $grid.removeClass("view-2 view-3 view-4").addClass(view);

        if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 80);
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


/* ================= PRODUCTOS CON SKU ================= */
(function ($) {
"use strict";

  /* ====== DATOS DE LOS PRODUCTOS ====== */
    const PRODUCTS = {
    "excalibur-veil": {
        sku: "excalibur-veil",
        name: "The Excalibur Veil",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/1200x/b2/cb/89/b2cb89c5152aedc3ec64323c81e7a6f5.jpg",
        "img/excalibur-veil2.png",
        "img/excalibur-veil3.png"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Una reliquia contemporánea: transparencia y estructura para vestir el mito."
    },

    "lady-of-the-lake-skin": {
        sku: "lady-of-the-lake-skin",
        name: "Lady of the Lake Skin",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/736x/f2/6c/63/f26c630378288001fb8bb386d0ba4b11.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Ligera, etérea, diseñada como una segunda piel."
    },

    "avalon-dusk-dress": {
        sku: "avalon-dusk-dress",
        name: "Avalon Dusk Dress",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/736x/28/7a/9c/287a9c9d2aae357b872b94f9793f1445.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Un vestido para el crepúsculo: silencio, presencia y aura."
    },

    "morgana-sheer-armor": {
        sku: "morgana-sheer-armor",
        name: "Morgana Sheer Armor",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/1200x/14/ef/cd/14efcdb55143374cb2d902d62e5d0cca.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Armadura sutil: protección simbólica con estética oscura."
    },

    "guinevere-second-skin": {
        sku: "guinevere-second-skin",
        name: "Guinevere Second Skin",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/736x/aa/17/5f/aa175f48b185277cb799fbaadb1a1720.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Minimalismo místico con ajuste preciso."
    },

    "round-table-silhouette": {
        sku: "round-table-silhouette",
        name: "Round Table Silhouette",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/736x/34/eb/59/34eb59c24afb32bc98d0e7f0721442eb.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Geometría limpia. Silueta con autoridad."
    },

    "merlins-whisper-mesh": {
        sku: "merlins-whisper-mesh",
        name: "Merlin’s Whisper Mesh",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/1200x/a4/93/ed/a493edf8fc1ed23d347f00701fd31f56.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Transparencia y misterio: un susurro que se ve."
    },

    "lakeborn-transparency": {
        sku: "lakeborn-transparency",
        name: "Lakeborn Transparency",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/736x/cc/3a/d6/cc3ad6cb26cdeb2fd8503f59412f0237.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Nacida del lago: luz, velo y piel."
    },

    "exile-of-camelot": {
        sku: "exile-of-camelot",
        name: "Exile of Camelot",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/736x/2b/1b/71/2b1b71173a9be2cabeb7708cf4de97a1.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Una pieza para la huida elegante."
    },

    "sword-in-the-stone": {
        sku: "sword-in-the-stone",
        name: "Sword in the Stone",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/1200x/c2/cf/8c/c2cf8c1d1927083c0608e1d909a6e5b5.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Presencia firme. La prueba de merecerla."
    },

    "veil-of-the-fallen-king": {
        sku: "veil-of-the-fallen-king",
        name: "Veil of the Fallen King",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/1200x/ba/f4/01/baf4014a89f8e30eed0baa8418273c09.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "Un velo como corona caída: belleza y duelo."
    },

    "avalon-afterlight": {
        sku: "avalon-afterlight",
        name: "Avalon Afterlight",
        price: 32,
        currency: "€",
        images: [
        "https://i.pinimg.com/1200x/6b/b5/a6/6bb5a6233d91b55a6055c4e6d2f604cb.jpg"
        ],
        sizes: ["XS", "S", "M", "L"],
        description: "La luz que queda cuando todo se apaga."
    }
};

window.PRODUCTS = PRODUCTS;

const CART_KEY = "avalon_cart_v1";

function money(n, cur) {
    const val = Number(n || 0);
    return `${val}${cur || "€"}`;
}

function getSkuFromUrl() {
    try {
        const params = new URLSearchParams(window.location.search);
        return params.get("sku");
    } catch {
    return null;
    }
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
    return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartTotal(cart) {
    return cart.reduce((sum, line) => {
    const p = PRODUCTS[line.sku];
    if (!p) return sum;
      return sum + p.price * (line.qty || 1);
    }, 0);
}

function openCartUI() {
    $("#cart-popup").addClass("active");
    $(".overlay").addClass("active");
}


function initCatalogLinks() {
    const $cards = $(".product-card[data-sku]");
    if (!$cards.length) return;

    $cards
    .css("cursor", "pointer")
    .off("click.avalon")
    .on("click.avalon", function (e) {
        e.preventDefault();
        const sku = $(this).data("sku");
        window.location.href = `product.html?sku=${encodeURIComponent(sku)}`;
    });
}

  /* ====== PRODUCTOS SEGÚN SKU ====== */
function initProductPage() {
    if (!$("#add-to-cart").length) return;

    const sku = getSkuFromUrl();
    const p = PRODUCTS[sku];

    if (!sku || !p) {
    /* ====== SIN SKU ====== */
    $("#product-title").text("Producto no encontrado");
    return;
    }

    $("#product-title").text(p.name);
    $("#product-price").text(money(p.price, p.currency));
    $("#product-desc").text(p.description || "");

    if (p.images && p.images.length) {
    $("#product-main-image").attr("src", p.images[0]);

    const $thumbs = $("#product-thumbs");
    if ($thumbs.length) {
        $thumbs.empty();

        p.images.forEach((src, idx) => {
        const active = idx === 0 ? "is-active" : "";
        const $btn = $(`
            <button type="button" class="thumb ${active}">
            <img src="${src}" alt="">
            </button>
        `);
        $thumbs.append($btn);
        });
    }
    }

    $("#product-thumbs")
    .off("click.avalon")
    .on("click.avalon", ".thumb", function () {
        const $thumb = $(this);
        const src = $thumb.find("img").attr("src");

        $("#product-thumbs .thumb").removeClass("is-active");
        $thumb.addClass("is-active");

        if (src) $("#product-main-image").attr("src", src);
    });

    let selectedSize = null;
    const $sizePicker = $("#size-picker");

    if ($sizePicker.length) {
    $sizePicker.empty();
    (p.sizes || []).forEach((size) => {
        $sizePicker.append(`<button type="button" class="size-btn" data-size="${size}">${size}</button>`);
    });
    }

    /* ====== TALLA ====== */
    $("#size-picker")
    .off("click.avalon")
    .on("click.avalon", ".size-btn", function () {
        $("#size-picker .size-btn").removeClass("is-selected");
        $(this).addClass("is-selected");
        selectedSize = $(this).data("size") || null;
    });

    /* ====== CANTIDAD ====== */
    $("#qty-minus").off("click.avalon").on("click.avalon", function () {
    const $input = $("#qty-input");
    const current = parseInt($input.val(), 10) || 1;
    $input.val(Math.max(1, current - 1));
    });

    $("#qty-plus").off("click.avalon").on("click.avalon", function () {
    const $input = $("#qty-input");
    const current = parseInt($input.val(), 10) || 1;
    $input.val(current + 1);
    });

    /* ====== AÑADIR AL CARRITO ====== */
    $("#add-to-cart").off("click.avalon").on("click.avalon", function () {
    const qty = Math.max(1, parseInt($("#qty-input").val(), 10) || 1);

    /* ====== REQUERIR TALLA ====== */
    if ((p.sizes || []).length && !selectedSize) {
        alert("Selecciona una talla");
        return;
    }

    const cart = getCart();
    const key = `${sku}__${selectedSize || ""}`;
    const existing = cart.find(x => x.key === key);

    if (existing) existing.qty += qty;
    else cart.push({ key, sku, size: selectedSize || null, qty });

    saveCart(cart);
    renderCart();
    openCartUI();
    });
}

/* ====== CARRITO ====== */
function renderCart() {
    const $items = $("#cart-popup .cart-items");
    const $total = $("#cart-total");
    if (!$items.length) return;

    const cart = getCart();
    $items.empty();

    cart.forEach(line => {
        const p = PRODUCTS[line.sku];
        if (!p) return;

        const img = (p.images && p.images[0]) ? p.images[0] : "";
        const sizeText = line.size ? `Size: ${line.size}` : "Size: —";

        const $row = $(`
        <div class="cart-item" data-key="${line.key}">
            <img src="${img}" alt="">
            <div class="item-info">
                <span class="item-name">${p.name}</span>
                <span class="item-size">${sizeText}</span>
                <span class="item-price">${money(p.price, p.currency)} × ${line.qty}</span>
            </div>
            <button class="remove-item" type="button">×</button>
        </div>
    `);

    $items.append($row);
    });

    if ($total.length) {
        $total.text(money(cartTotal(cart), "€"));
    }
}

function bindCartRemove() {
    $(document).on("click", "#cart-popup .remove-item", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const $row = $(this).closest(".cart-item");
        const key = $row.data("key");

        const cart = getCart().filter(x => x.key !== key);
        saveCart(cart);

        $row.remove();
        $("#cart-total").text(money(cartTotal(cart), "€"));
    });
}

$(document).ready(function () {
    initCatalogLinks();
    initProductPage();
    bindCartRemove();
    renderCart();
});

})(jQuery);

$(document).ready(function () {
$(document).on('click', '.close-menu', function (e) {
    e.preventDefault();
    e.stopPropagation();

    $('.side-menu').removeClass('open').css('left', '-250px');

    if (!$('#cart-popup').hasClass('active')) {
    $('.overlay').css({
        opacity: 0,
        pointerEvents: 'none'
    }).removeClass('active');
    }
});
});

/* ==== CHECKOUT + CONFIRMACIÓN ==== */

(function ($) {
    "use strict";

const CART_KEY = "avalon_cart_v1";
const LAST_ORDER_KEY = "avalon_last_order_v1";

function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function money(n, cur) {
    return `${Number(n || 0)}${cur || "€"}`;
}

function getProductsSafe() {
    if (window.PRODUCTS) return window.PRODUCTS;

    return null;
}

$(document).on("click", ".checkout-btn", function (e) {
    e.preventDefault();
    window.location.href = "checkout.html";
});

function renderCheckout() {
    if (!$("#checkout-items").length) return;

    const PRODUCTS = getProductsSafe();
    const cart = getCart();

    const $items = $("#checkout-items");
    const $empty = $("#checkout-empty");

    $items.empty();

    if (!cart.length || !PRODUCTS) {
        $empty.show();
        $("#place-order").prop("disabled", true);
    return;
    }

    $empty.hide();
    $("#place-order").prop("disabled", false);

    let subtotal = 0;
    let currency = "€";

    cart.forEach(line => {
    const p = PRODUCTS[line.sku];
        if (!p) return;

    currency = p.currency || currency;
    const lineTotal = (p.price || 0) * (line.qty || 1);
    subtotal += lineTotal;

    $items.append(`
        <div class="checkout-item">
            <img class="checkout-thumb" src="${(p.images && p.images[0]) ? p.images[0] : 'img/placeholder.png'}" alt="${p.name}">
            <div class="checkout-info">
            <div class="checkout-name">${p.name}</div>
            <div class="checkout-meta">Talla: ${line.size || "—"} · Cantidad: ${line.qty || 1}</div>
            </div>
            <div class="checkout-price">${money(lineTotal, currency)}</div>
        </div>
        `);

    });

    const shipping = subtotal > 0 ? 4 : 0; 
    const total = subtotal + shipping;

    $("#checkout-subtotal").text(money(subtotal, currency));
    $("#checkout-shipping").text(money(shipping, currency));
    $("#checkout-total").text(money(total, currency));
}

  /* ==== CONFIRMACIÓN ==== */
function renderConfirmation() {
    if (!$("#order-summary").length) return;

let order = null;
try { order = JSON.parse(localStorage.getItem(LAST_ORDER_KEY)); } catch {}

    if (!order) {
        $("#order-id").text("No hay pedido guardado.");
    return;
    }

$("#order-id").text(`Pedido: ${order.id} · Total: ${money(order.total, order.currency)}`);

    const PRODUCTS = getProductsSafe() || {};

    const linesHtml = (order.items || []).map(it => {
    const p = PRODUCTS[it.sku];
    const img = (p && p.images && p.images[0]) ? p.images[0] : "img/placeholder.png";

    return `
        <div class="checkout-item">
            <img class="checkout-thumb" src="${img}" alt="${it.name}">
            <div class="checkout-info">
            <div class="checkout-name">${it.name}</div>
            <div class="checkout-meta">Talla: ${it.size || "—"} · Cantidad: ${it.qty}</div>
            </div>
            <div class="checkout-price">${money(it.lineTotal, order.currency)}</div>
        </div>
    `;
}).join("");

$("#order-summary").html(linesHtml);
}


  /* ==== CHECKOUT ==== */
$(document).on("submit", "#checkout-form", function (e) {
    e.preventDefault();

    const PRODUCTS = getProductsSafe();
    const cart = getCart();

    if (!PRODUCTS || !cart.length) {
        alert("Tu carrito está vacío.");
        return;
    }

    const requiredIds = ["#ship-name", "#ship-email", "#ship-address", "#ship-city", "#ship-zip", "#ship-country", "#card-number", "#card-exp", "#card-cvv"];
    for (const id of requiredIds) {
        const v = $(id).val();
        if (!v || !String(v).trim()) {
            alert("Completa todos los campos para continuar.");
        return;
        }
    }

    // Construir pedido
    let subtotal = 0;
    let currency = "€";

    const items = cart.map(line => {
    const p = PRODUCTS[line.sku];
        if (!p) return null;
        currency = p.currency || currency;

    const qty = line.qty || 1;
    const lineTotal = (p.price || 0) * qty;
    subtotal += lineTotal;

    return {
        sku: line.sku,
        name: p.name,
        size: line.size || null,
        qty,
        lineTotal
    };
    }).filter(Boolean);

    const shipping = subtotal > 0 ? 4 : 0;
    const total = subtotal + shipping;

    const order = {
        id: "AVL-" + Date.now(),
        createdAt: new Date().toISOString(),
        customer: {
            name: $("#ship-name").val().trim(),
            email: $("#ship-email").val().trim(),
            address: $("#ship-address").val().trim(),
            city: $("#ship-city").val().trim(),
            zip: $("#ship-zip").val().trim(),
            country: $("#ship-country").val().trim()
    },
        items,
        subtotal,
        shipping,
        total,
        currency
    };

    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    saveCart([]); // vaciar carrito

    window.location.href = "confirmacion.html";
});

$(document).ready(function () {
    renderCheckout();
    renderConfirmation();
});

})(jQuery);

/* ================= CONTACTO ORÁCULO ================= */

const oracleYes = document.querySelector(".oracle-yes");
const oracleNo = document.querySelector(".oracle-no");
const oracleQuestion = document.getElementById("oracleQuestion");
const oracleForm = document.getElementById("oracleForm");

/* ================= EFECTO DESCIFRADO LENTO ================= */

/* ================= DESCIFRADO SUAVE ================= */

function decipherText(element, speed = 55){
    const original = element.innerText;
    const chars = "⟁⌖⌁⧫✦";

    let revealed = original.split("").map(c => ({
        char: c,
        done: c === " "
    }));

    let progress = 0;

    const interval = setInterval(() => {
        revealed = revealed.map((item, index) => {
            if(item.done) return item;

            // Probabilidad de fijarse rápido
            if(Math.random() < 0.08 + progress * 0.015){
                return { char: original[index], done: true };
            }

            return {
                char: chars[Math.floor(Math.random() * chars.length)],
                done: false
            };
        });

        element.innerText = revealed.map(r => r.char).join("");

        progress++;

        if(revealed.every(r => r.done)){
            clearInterval(interval);
            element.innerText = original;
        }
    }, speed);
}


/* Descifrado inicial */
window.addEventListener("load", () => {
    const title = document.querySelector(".oracle-text h1");
    if(title){
        decipherText(title, 80); // ⏳ lento y ceremonial
    }
});

/* ================= ACEPTAR MISIÓN ================= */

if(oracleYes){
    oracleYes.addEventListener("click", () => {
        oracleQuestion.classList.add("hidden");
        oracleForm.classList.remove("hidden");

        const formTitle = oracleForm.querySelector("h2");
        if(formTitle){
            decipherText(formTitle, 75);
        }
    });
}

/* ================= RECHAZAR MISIÓN ================= */

if(oracleNo){
    oracleNo.addEventListener("click", () => {
        document.body.style.transition = "opacity 1.2s";
        document.body.style.opacity = 0;

        setTimeout(() => {
            window.location.href = "https://www.google.com";
        }, 1200);
    });
}

/* ================= PARTÍCULAS MÁGICAS ================= */

const particlesContainer = document.querySelector(".magic-particles");

if(particlesContainer){
    for(let i = 0; i < 55; i++){
        const p = document.createElement("span");

        const size = Math.random() * 3 + 2;
        p.style.width = size + "px";
        p.style.height = size + "px";

        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = (Math.random() * 14 + 10) + "s";
        p.style.animationDelay = Math.random() * 12 + "s";

        particlesContainer.appendChild(p);
    }
}

/* ================= GSAP ================= */
document.addEventListener("DOMContentLoaded", () => {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // ===== INDEX: Editorial =====
    const editorialEls = gsap.utils.toArray(".editorial .ed-img, .editorial .ed-text");
    if (editorialEls.length) {
        gsap.set(editorialEls, { autoAlpha: 0, y: 50 });

        ScrollTrigger.batch(editorialEls, {
        start: "top 85%",
        onEnter: (batch) =>
            gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,       // más rápido que 1.2
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
            }),
        onEnterBack: (batch) =>
            gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.06,
            overwrite: true,
            }),
        });
    }

    // ===== CATALOGO: solo si existe =====
    const grid = document.querySelector(".catalog-grid");
    if (grid) {
        const title = document.querySelector(".catalog-title");
        if (title) gsap.from(title, { y: 20, opacity: 0, duration: 0.9, ease: "power2.out" });

        const cards = gsap.utils.toArray(".catalog-grid .reveal");
        if (cards.length) {
        gsap.set(cards, { autoAlpha: 0, y: 26 });

        ScrollTrigger.batch(cards, {
            start: "top 88%",
            onEnter: (batch) =>
            gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                stagger: 0.08,
                overwrite: true,
            }),
            onEnterBack: (batch) =>
            gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.06,
                overwrite: true,
            }),
        });
        }

        document.querySelectorAll(".view-btn").forEach((btn) => {
        btn.addEventListener("click", () => setTimeout(() => ScrollTrigger.refresh(), 80));
        });
    }

    // ===== Refresh cuando terminen de cargar imágenes (reduce “entra tarde”) =====
    let pending = 0;
    const imgs = Array.from(document.images);
    const done = () => {
        pending--;
        if (pending <= 0) ScrollTrigger.refresh();
    };

    imgs.forEach((img) => {
        if (!img.complete) {
        pending++;
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
        }
    });

    if (pending === 0) ScrollTrigger.refresh();
});
