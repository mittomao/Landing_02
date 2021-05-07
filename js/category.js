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
      root.CategoryBox = factory(root.jQuery);
    }
  }(window, function ($) {
  
    const EVENTNAME = {
      categoryChange: 'product-category-change',
    }
  
    function CategoryBox($el, options) {
      const _self = this;
      _self.$el = $($el);
      _self.options = options;

      _self.$listCategorys = _self.$el.find('.js-category-item');

      _self.$listCategorys.on('click', handleClickCategory);

  
      function handleClickCategory(e) {
        e.preventDefault();
        let category = $(this).data('category');

        _self.$listCategorys.each( (i, item) => {
            $(item).removeClass('active');
        });

        $(this).addClass('active');

        _self.$el.trigger(EVENTNAME.categoryChange, { category: category });
      }
    }
  
    $.fn.categoryBox = function () {
      const _ = this;
      const options = arguments[0];
      const args = Array.prototype.slice.call(arguments, 1);
      const length = _.length;
  
      for (let i = 0; i < length; i++) {
        if (typeof options === 'object' || typeof options === 'undefined') {
          _[i].CategoryBox = new CategoryBox(_[i], options);
        } else {
          // options is string
          return _[i].CategoryBox[options].apply(_[i].CategoryBox, args);
        }
      }
  
      return _;
    };
  
    return CategoryBox;
  }));