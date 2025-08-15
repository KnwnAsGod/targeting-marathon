console.log('scripts.js загружен');

$(document).ready(function() {
    console.log('jQuery готов, версия:', jQuery.fn.jquery);

    // Проверка загрузки библиотек
    if (typeof $.fn.slick === 'undefined') {
        console.error('Slick Carousel не загружен');
    } else {
        console.log('Slick Carousel загружен');
    }
    if (typeof $.fn.arcticmodal === 'undefined') {
        console.error('ArcticModal не загружен');
    } else {
        console.log('ArcticModal загружен');
    }

    // Модальное окно
    $('.openM').click(function() {
        console.log('Клик по .openM');
        if (typeof $.fn.arcticmodal !== 'undefined') {
            $('.box-modal').arcticmodal({
                overlay: {
                    css: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            });
        } else {
            console.warn('ArcticModal недоступен, используется fallback');
            $('.modal-fallback').css('display', 'flex');
        }
    });

    $('.box-modal_close').click(function() {
        console.log('Клик по .box-modal_close');
        if (typeof $.fn.arcticmodal !== 'undefined') {
            $.arcticmodal('close');
        }
        $('.modal-fallback').css('display', 'none');
    });

    // Слайдер для отзывов
    if (typeof $.fn.slick !== 'undefined') {
        $('.gallery2').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            adaptiveHeight: true
        });
        console.log('Слайдер .gallery2 инициализирован');
    }

    // Анимация секции .s16 при прокрутке
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var s16Top = $('.s16').offset().top;
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight > s16Top) {
            $('.s16').addClass('visible');
        }
    });

    // Аккордеон с плавной анимацией
    $('.accordion .title_block').click(function() {
        console.log('Клик по аккордеону');
        var $parent = $(this).parent();
        var $info = $parent.find('.info');

        if ($parent.hasClass('active_block')) {
            $parent.removeClass('active_block');
            $info.css('max-height', '0');
        } else {
            $('.accordion .active_block').removeClass('active_block');
            $('.accordion .info').css('max-height', '0');
            $parent.addClass('active_block');
            $info.css('max-height', $info[0].scrollHeight + 40 + 'px');
        }
    });

    // Таймер до конца дня
    function updateTimer() {
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);
        let timeLeft = endOfDay - now;

        if (timeLeft <= 0) {
            endOfDay.setDate(endOfDay.getDate() + 1);
            timeLeft = endOfDay - now;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        $('.getting-started .hr .dial').text(hours.toString().padStart(2, '0'));
        $('.getting-started .min .dial').text(minutes.toString().padStart(2, '0'));
        $('.getting-started .sec .dial').text(seconds.toString().padStart(2, '0'));
    }

    updateTimer();
    setInterval(updateTimer, 1000);
    console.log('Таймер запущен');
});