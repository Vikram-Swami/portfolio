// =========================slickslider-script_1========================= //

$('.centermode').slick({
    slidesToShow: 3,
    dots: true,
    prevArrow: '.prev',
    autoplay: true,
    nextArrow: '.next',
    responsive: [{
            breakpoint: 992,
            settings: {
                dots: true,
                prevArrow: '.prev',
                nextArrow: '.next',
                slidesToShow: 2
            }
        },
        {
            breakpoint: 576,
            settings: {
                dots: true,
                prevArrow: '.prev',
                nextArrow: '.next',
                slidesToShow: 2
            }
        }
    ]
});

// =========================slickslider-script_2========================= //

$('.centermode2').slick({
    slidesToShow: 4,
    dots: true,
    autoplay: true,
    arrows: false,
    responsive: [{
            breakpoint: 992,
            settings: {
                dots: true,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 576,
            settings: {
                dots: true,
                slidesToShow: 2
            }
        }
    ]
});

// =========================slickslider-script_3========================= //

$('.centermode3').slick({
    slidesToShow: 4,
    autoplay: true,
    arrows: false,
    responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                arrows: false,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
                arrows: false,
            }
        }
    ]
});

// ==========================scroll to top========================== //

let calcscrollvalue = () => {
    let scrollProgress = document.getElementById("progress_bar");
    let progressValue = document.getElementById("progress_value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    console.log(scrollValue);
    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#f51842 ${scrollValue}%, #000000 ${scrollValue}%)`;
}
window.onscroll = calcscrollvalue;
window.onload = calcscrollvalue;

$(document).ready(function () {

    $("a").on('click', function (event) {
        if (this.hash !== "") {

            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1500, function () {
                window.location.hash = hash;
            });
        }
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() >= 70) {
        $('#progress_bar').fadeIn("fast");
    } else {
        $('#progress_bar').fadeOut("fast");
    }
});
$('#progress_bar').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 2500);
});

// ============================= preloder=============================  //
document.body.onload = function () {
    /*The onload event occurs when an object has been loaded*/
    setTimeout(function () {
        var preloader = document.getElementById('page-preloader'); {
            preloader.classList.add('done');
        }
    }, 10000);
}

// ==========================gsap Animation========================== //
function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -200;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 200;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {
        x: x,
        y: y,
        autoAlpha: 0
    }, {
        duration: 2,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, {
        autoAlpha: 0
    });
}

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            onEnter: function () {
                animateFrom(elem)
            },
            onEnterBack: function () {
                animateFrom(elem, -1)
            },
            onLeave: function () {
                hide(elem)
            } // assure that the element is hidden when scrolled into view
        });
    });
});

// ==========================custem curser========================== //

const outerCursor = document.querySelector(".pointer-outer");
const innerCursor = document.querySelector(".pointer-inner");
const outerCursorBox = outerCursor.getBoundingClientRect();
const hover = document.querySelector(".hover");
const offset = 75;
let outerCursorSpeed = .5;
let clientX = -100;
let clientY = -100;
let showCursor = false;
let isStuck = false;

const cursorHidden = true;

initCursor();

function initCursor() {
    if (cursorHidden) {
        document.body.classList.add('cursor-hidden');
    }

    const unveilCursor = () => {
        TweenMax.set(innerCursor, {
            x: clientX,
            y: clientY
        });

        TweenMax.set(outerCursor, {
            x: clientX - outerCursorBox.width / 2,
            y: clientY - outerCursorBox.height / 2
        });

        showCursor = true;
    };

    document.addEventListener("mousemove", unveilCursor, false);

    document.addEventListener("mousemove", e => {
        clientX = e.clientX;
        clientY = e.clientY;

        let distance = getDistanceBetweenElements(innerCursor, hover);

        if (distance <= offset) {
            outerCursor.classList.add('is-hover');
            innerCursor.classList.add('is-hover');
        } else {
            outerCursor.classList.remove('is-hover');
            innerCursor.classList.remove('is-hover');
        }

        document.querySelector(".distance").innerHTML = Math.floor(distance);
    }, false);

    const render = () => {
        TweenMax.set(innerCursor, {
            x: clientX,
            y: clientY
        });

        if (!isStuck) {
            TweenMax.to(outerCursor, outerCursorSpeed, {
                x: clientX - outerCursorBox.width / 2,
                y: clientY - outerCursorBox.height / 2
            });
        }

        if (showCursor) {
            document.removeEventListener("mousemove", unveilCursor);
        }

        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}


function getPositionAtCenter(element) {
    const {
        top,
        left,
        width,
        height
    } = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2
    };
}

function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);
    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y, );
}

// ===========================customscript=========================== //

const navBar = document.querySelector(".nav_bar");
const navBar3 = document.querySelector(".side_bar2");
const iconNone = document.querySelector(".left_none");
const logo = document.querySelector(".width");
const navBar2 = document.querySelector(".nav_bar2");
const bgBlack = document.querySelector(".bg_black");
const menuIcon = document.getElementById("menu_icon");
const line4 = document.querySelector(".line_4");
const line5 = document.querySelector(".line_5");
const line1 = document.querySelector(".line_1");
const line3 = document.querySelector(".line_3");

function myfunction() {
    navBar.classList.toggle("left");
    navBar3.classList.toggle("left3");
    iconNone.classList.toggle("d_none");
    logo.classList.toggle("w_94");
    line4.classList.toggle("line4");
    line5.classList.toggle("line5");
}

function myfunction2() {
    bgBlack.classList.toggle("bg-black");
    navBar2.classList.toggle("left2");
    menuIcon.classList.toggle("menu");
    line1.classList.toggle("line1");
    line3.classList.toggle("line3");
}

function myfunction5() {
    bgBlack.classList.remove("bg-black");
    navBar2.classList.remove("left2");
    menuIcon.classList.toggle("menu");
    line1.classList.remove("line1");
    line3.classList.remove("line3");
}

// ==========================scroll-timeline========================== //

var items = $(".timeline li"),
    timelineHeight = $(".timeline ul").height(),
    greyLine = $('.default-line'),
    lineToDraw = $('.draw-line');

if (lineToDraw.length) {
    $(window).on('scroll', function () {

        var redLineHeight = lineToDraw.height(),
            greyLineHeight = greyLine.height(),
            windowDistance = $(window).scrollTop(),
            windowHeight = $(window).height() / 2,
            timelineDistance = $(".timeline").offset().top;

        if (windowDistance >= timelineDistance - windowHeight) {
            line = windowDistance - timelineDistance + windowHeight;

            if (line <= greyLineHeight) {
                lineToDraw.css({
                    'height': line + -20 + 'px'
                });
            }
        }

        var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true);
        items.each(function (index) {
            var circlePosition = $(this).offset();

            if (bottom > circlePosition.top) {
                $(this).addClass('in-view');
            } else {
                $(this).removeClass('in-view');
            }
        });
    });
}