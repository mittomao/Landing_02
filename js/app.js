$(function () {
    const $wrapperSlider = $('.js-wrapper-slider');

    // Slider

    $wrapperSlider.slick({
        slidesToScroll: 1,
        iinfinite: true,
        variableWidth: true
    });

    $(window).resize(hanldeChageOptionSlide);

    function hanldeChageOptionSlide() {
        let w = $wrapperSlider.width();
        let slideToShow = Math.floor(w / 360);

        let slides = $wrapperSlider.slick('slickGetOption', 'slidesToShow');

        $wrapperSlider.slick('slickSetOption', 'slidesToShow', slideToShow, true);
    }

    hanldeChageOptionSlide();

    // Pagination

    
})