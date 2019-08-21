$(window).load(function () {
    $('#preload').fadeOut(500);
    $('body').addClass('loaded');
    new WOW().init();
});

$(function () {
    // swiper
    if ($('.js-hero').length) {
        var heroSwiper = new Swiper('.js-hero .swiper-container', {
            // effect: 'fade',
            slidesPerView: 1,
            speed: 1000,
            // autoplay: {
            //     disableOnInteraction: false,
            //     delay: 6000,
            // },
            loop: true,
            followFinger: false,
            // pagination: {
            //     el: '.js-hero .swiper-pagination',
            //     clickable: true,
            // }
        });
    }

    if ($('.js-process').length) {
        var processAmountSwiper = new Swiper('.p-process_amount .swiper-container', {
            effect: 'fade',
            slidesPerView: 1,
            speed: 500,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            allowTouchMove: false
        });

        var processTopSwiper = new Swiper('.p-process_main .swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 500,
            centeredSlides: true,
            // autoplay: {
            //     disableOnInteraction: false,
            //     delay: 6000,
            // },
            // loop: true,
            navigation: {
                nextEl: '.p-process_main .swiper-btn--next',
                prevEl: '.p-process_main .swiper-btn--prev',
            },
            thumbs: {
                swiper: processAmountSwiper,
            },
            breakpoints: {
                576: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 2,
                },
            }
        });
    }

    var taboffset;
    // tab 切換內容
    if ($('.js-tab').length) {

        var isAnimation = false;

        $('.m-tab_item:nth-child(1)').addClass('active');
        $('.m-tab_content:nth-child(1)').fadeIn();

        $('.m-tab_link').on('click', function (e) {
            e.preventDefault();
            var href = $(this).attr('data-href');

            $('.m-tab_item').removeClass('active');
            $(this).closest('.m-tab_item').addClass('active');

            if (!isAnimation) {
                isAnimation = true;
                $('.' + href).siblings().fadeOut(function () {
                    $('.' + href).fadeIn();
                    isAnimation = false;
                    if ($('.p-history').length) {
                        taboffset = $('.p-history_header').offset().top;
                    }
                });
            }
            // var index = $(this).closest('.m-tab_item').index();

            // $('.m-tab_item').removeClass('active');
            // $(this).closest('.m-tab_item').addClass('active');

            // if(!isAnimation) {
            //     isAnimation = true;
            //     $('.m-tab_content').not('.m-tab_content:eq(' + index + ')').fadeOut(function(){
            //         $('.m-tab_content:eq(' + index + ')').fadeIn();
            //         isAnimation = false;
            //         // 點擊切換之後必須重新取得 p-history_header 的位置
            //         if($('.p-history').length) {
            //             taboffset = $('.p-history_header').offset().top;
            //         }
            //     });
            // }
        });
    }

    if ($('.p-history').length) {
        var taboffset = $('.p-history_header').offset().top;
        // 取得最新的年份
        var activeYear = $('.p-history_item:eq(0)').data('year');
        $(window).on('scroll', function () {
            var scrollPos = $(window).scrollTop();

            // 滑動到沿革大事記時固定在上方，並且出現年份
            if (scrollPos > taboffset) {
                $('.p-history_header').addClass('fixed');
            } else {
                $('.p-history_header').removeClass('fixed');
            }
            if (scrollPos + 200 > taboffset) {
                $('.p-history_year').addClass('active');
            } else {
                $('.p-history_year').removeClass('active');
            }

            // 滑動到各個區塊時切換年份
            $('.p-history_item').each(function () {
                var target = $(this);
                var targetPos = $(target).offset().top;
                var targetHeight = $(target).outerHeight();

                var year = $(this).data('year');
                var yearPos = $('.p-history_year').offset().top;
                var yearHeight = $('.p-history_year').outerHeight();

                var historyPos = $('.p-history').offset().top;
                var historyHeight = $('.p-history').outerHeight();

                if (targetPos <= yearPos && (targetPos + targetHeight) > yearPos && activeYear !== year) {
                    $('.p-history_year h2').fadeOut(300, function () {
                        $('.p-history_year h2').text(year).fadeIn(300);
                    });
                    activeYear = year;
                }

                // 當年份碰到最底部時，沿革大事記及年份消失
                if ((yearPos + yearHeight) > (historyPos + historyHeight)) {
                    $('.p-history_header').addClass('hide');
                    $('.p-history_year').removeClass('active');
                } else {
                    $('.p-history_header').removeClass('hide');
                }
            });
        });
    }

    // faq
    $('.p-faq_inner').on('click', function () {
        $(this).addClass('active');
        $('.p-faq_overlay').addClass('active');
        $(this).siblings('.p-faq_info').addClass('active');
    });
    $('.p-faq_overlay').on('click', function () {
        $(this).removeClass('active');
        $('.p-faq_inner').removeClass('active');
        $('.p-faq_info').removeClass('active');
    });
});