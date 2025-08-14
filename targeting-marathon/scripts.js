// Fallback for arcticModal if CDN fails
if (typeof $.fn.arcticmodal === 'undefined') {
    var script = document.createElement('script');
    script.src = '/js/jquery.arcticmodal-0.3.min.js';
    script.async = true;
    document.head.appendChild(script);
}

$(document).ready(function(){
    $('.openModal').click(function(){
        $('.modal-fallback').addClass('active');
        if (typeof $.arcticmodal === 'function') {
            $.arcticmodal({
                content: $('.box-modal')
            });
        } else {
            console.error('arcticModal не загружен, используется резервный метод.');
            $('.modal-fallback').css('display', 'flex');
        }
    });
    $('.box-modal_close').click(function(){
        $('.modal-fallback').removeClass('active').css('display', 'none');
        if (typeof $.arcticmodal === 'function') {
            $.arcticmodal('close');
        }
    });
    $('.gallery2').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false
    });
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        var s16Top = $('.s16').offset().top;
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight > s16Top) {
            $('.s16').addClass('visible');
        }
    });
    $('.accordion .title_block').click(function(){
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

    // Self-renewing timer until end of day
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
        $('.getting-started .min .dial').text(minutesstubborn.toString().padStart(2, '0'));
        $('.getting-started .sec .dial').text(seconds.toString().padStart(2, '0'));
    }

    updateTimer();
    setInterval(updateTimer, 1000);
});