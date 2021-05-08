(function (root, factory) {
    // eslint-disable-next-line no-undef
    if (typeof define === 'function' && define.amd) {
        // eslint-disable-next-line no-undef
        define(['jquery'], function (jquery) {
            if (!jquery.fn) jquery.fn = {};
            return factory(jquery);
        });
    } else if (typeof module === 'object' && module.exports) {
        var jQuery = (typeof window !== 'undefined') ? window.jQuery : undefined;
        if (!jQuery) {
            jQuery = require('jquery');
            if (!jQuery.fn) jQuery.fn = {};
        }
        module.exports = factory(jQuery);
    } else {
        root.ListProduct = factory(root.jQuery);
    }
}(window, function ($) {

    const EVENTNAME = {
        getIdProductHeart: 'get-id-product-heart',
      }

    function ListProduct($el, options) {
        const _self = this;
        _self.$el = $($el);
        _self.options = options;

        _self.$listProducts = _self.$el.find('.js-product-lists');

        ListProduct.prototype.render = function (data) {
            const _self = this;

            const temple = data.reduce((str, item, i) => {
                str += `<div class="slide-item js-slide-item slide-item--${item.category}" data-id = "${item.id}">
                            <div class="sale">
                                <span class="old">${item.price.old}$</span>
                                <span class="new">${item.price.new}$</span>
                            </div>
                            <h5 class='title'>${item.title}</h5>
                            <img src="./image/${item.image}" alt="Image">
                            <div class="interactive">
                            <a href="#" class='js-button-heart'>
                                <i class="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <a href="#">
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            </a>
                            </div>
                            <div class="size">
                                ${renderChooseSize(item.category, i)}
                            </div>   
                        </div>`;
                return str;
            }, '');

            _self.$el.html(temple);
           
            _self.$el.slick({
                slidesToScroll: 1,
                iinfinite: true,
                variableWidth: true
            });    

            hanldeChageOptionSlide();

            const $buttonHearts = _self.$el.find('.js-button-heart');
            const $listSlides = _self.$el.find('.js-slide-item');

            $buttonHearts.on('click', function (e) { 
                e.preventDefault();

                const $slideItem = $(this).closest('.slide-item');

                $slideItem.append('<span class="fa fa-heart test"></span>');

                let idProduct = $slideItem.data('id');

                _self.$el.trigger(EVENTNAME.getIdProductHeart, { idProduct: idProduct });

                setTimeout(() => {
                    $slideItem.find('span.test').remove();
                }, 1000);
            });
           
        }

        ListProduct.prototype.unSlick = function () { 
            const _self = this;
            _self.$el.slick('unslick');
        }

        function renderChooseSize(category, i) {
            let formCheckbox = '';
            if (category === 'clothing') {
                formCheckbox = `<form action="#">
                                    <p>
                                    <input type="radio" id="test-${(i * 50)}" name="radio-group-${i}" checked>
                                    <label for="test-${(i * 50)}">S</label>
                                    </p>
                                    <p>
                                    <input type="radio" id="test-${(i * 50 + 1)}" name="radio-group-${i}">
                                    <label for="test-${(i * 50 + 1)}">M</label>
                                    </p>
                                    <p>
                                    <input type="radio" id="test-${(i * 50 + 2)}" name="radio-group-${i}">
                                    <label for="test-${(i * 50 + 2)}">L</label>
                                    </p>
                                </form>`;
            }

            return formCheckbox;
        }

        $(window).resize(hanldeChageOptionSlide);

        function hanldeChageOptionSlide() {
            let w =  _self.$el.width();
            let slideToShow = Math.floor(w / 360);

            _self.$el.slick('slickSetOption', 'slidesToShow', slideToShow, true);
        }
    }

    $.fn.listProduct = function () {
        const _ = this;
        const options = arguments[0];
        const args = Array.prototype.slice.call(arguments, 1);
        const length = _.length;

        for (let i = 0; i < length; i++) {
            if (typeof options === 'object' || typeof options === 'undefined') {
                _[i].ListProduct = new ListProduct(_[i], options);
            } else {
                // options is string
                return _[i].ListProduct[options].apply(_[i].ListProduct, args);
            }
        }

        return _;
    };

    return ListProduct;
}));