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
      root.OrderBoxs = factory(root.jQuery);
    }
  }(window, function ($) {
  
    const EVENTNAME = {
      categoryChange: 'product-category-change',
    }
  
    function OrderBoxs($el, options) {
      const _self = this;
      _self.$el = $($el);
      _self.options = options;

      _self.$bodyOrders = _self.$el.find('.js-body-orders');

      OrderBoxs.prototype.render = function (data) { 
        const _self = this;

        const temple = data.reduce((str, item, i) => {
            str += `<div class="tr">
                        <div class="td">${i + 1}</div>
                        <div class="td">
                        <div class="list-img">
                            <div style="background-image: url('./image/${item.image}');"></div>
                        </div>
                        </div>
                        <div class="td">${item.dateTimes}</div>
                        <div class="td">${item.price.new}$</div>
                    </div>`;
            return str;
        }, '');

        _self.$bodyOrders.html(temple);
       }
    }
  
    $.fn.orderBoxs = function () {
      const _ = this;
      const options = arguments[0];
      const args = Array.prototype.slice.call(arguments, 1);
      const length = _.length;
  
      for (let i = 0; i < length; i++) {
        if (typeof options === 'object' || typeof options === 'undefined') {
          _[i].OrderBoxs = new OrderBoxs(_[i], options);
        } else {
          // options is string
          return _[i].OrderBoxs[options].apply(_[i].OrderBoxs, args);
        }
      }
  
      return _;
    };
  
    return OrderBoxs;
  }));