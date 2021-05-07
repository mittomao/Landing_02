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
      tabChange: 'product-tab-change'
    }
  
    function FilterBox($el, options) {
      const _self = this;
      _self.$el = $($el);
      _self.options = options;

      _self.$searchTitle = _self.$el.find('.js-search-title');
      _self.$chooseGender = _self.$el.find('.js-choose-gender input[type="checkbox"]');
  
      _self.$searchTitle.on('input propertychange', handleChangeInputSearch);

      _self.$chooseGender.on('change', handleChangeGender);

      function handleChangeInputSearch(e) {
        const valInput = $(e.target).val();
        _self.$el.trigger(EVENTNAME.filterChange, { title: valInput });
      }
  
      function handleChangeGender(e) {
        let valGender = $(e.target).is(':checked');
        _self.$el.trigger(EVENTNAME.filterChange, { gender: valGender });
      }


      FilterBox.prototype.getStatusGender = function () { 
        const _self = this;
        return _self.$chooseGender.is(':checked');
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