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
    root.FilterBox = factory(root.jQuery);
  }
}(window, function ($) {

  const EVENTNAME = {
    filterChange: 'product-filter-change',
    tabChange: 'product-tab-change',
    idClear: 'filter-box-get-id-clear'
  }

  function FilterBox($el, options) {
    const _self = this;
    _self.$el = $($el);
    _self.options = options;

    _self.$searchTitle = _self.$el.find('.js-search-title');
    _self.$chooseGender = _self.$el.find('.js-choose-gender input[type="checkbox"]');
    _self.$listHeartProduct = _self.$el.find('.js-list-heart-product');
    _self.$countHeart = _self.$el.find('.js-heart-count');

    _self.count = 0;

    _self.$searchTitle.on('input propertychange', handleChangeInputSearch);

    _self.$chooseGender.on('change', handleChangeGender);

    function handleChangeInputSearch(e) {
      const param = getFilterInfo();
      _self.$el.trigger(EVENTNAME.filterChange, param);
    }

    function handleChangeGender(e) {
      const param = getFilterInfo();

      if (!_self.$chooseGender.is(':checked')) {
        _self.$chooseGender.closest('.js-choose-gender').addClass('is-female');
      } else  {
        _self.$chooseGender.closest('.js-choose-gender').removeClass('is-female');
      }
      _self.$el.trigger(EVENTNAME.filterChange, param);
    }

    function getFilterInfo() {
      let filters = {};
      filters.title = _self.$searchTitle.val();
      filters.gender = _self.$chooseGender.is(':checked');

      return filters;
    }


    FilterBox.prototype.getStatusGender = function () {
      const _self = this;
      return _self.$chooseGender.is(':checked');
    }

    FilterBox.prototype.renderProductHeart = function (data) {
      const _self = this;
      _self.count = data.length;

      if (data.length === 0) {
        _self.$listHeartProduct.append('<h3>No Product Heart</h3>');
        _self.$countHeart.html(0);
      } else {
        const temple = data.reduce((str, item, i) => {
          str += `<div class="heart-item" data-id='${item.id}'>
                            <div class="heart-item__img">
                              <img src="./image/${item.image}" alt="">
                            </div>
                            <div class="heart-item__title">${item.title}</div>
                            <div class="heart-item__price">${item.price.new}$</div> 
                            <div class="heart-item__cls js-clear-heart">
                              <i class="fa fa-close" aria-hidden="true"></i>
                            </div>
                        </div>`;
          return str;
        }, '');
  
        _self.$countHeart.html(_self.count);
  
        _self.$listHeartProduct.html(temple);
  
        const $clearHeart =  _self.$listHeartProduct.find('.js-clear-heart');
  
        $clearHeart.on('click', function () { 
          $(this).closest('.heart-item').remove(); 
      
          const idClear = $(this).closest('.heart-item').data('id');
          _self.$el.trigger(EVENTNAME.idClear, idClear);
        });
      }
    }
  }

  $.fn.FilterBox = function () {
    const _ = this;
    const options = arguments[0];
    const args = Array.prototype.slice.call(arguments, 1);
    const length = _.length;

    for (let i = 0; i < length; i++) {
      if (typeof options === 'object' || typeof options === 'undefined') {
        _[i].FilterBox = new FilterBox(_[i], options);
      } else {
        // options is string
        return _[i].FilterBox[options].apply(_[i].FilterBox, args);
      }
    }

    return _;
  };

  return FilterBox;
}));