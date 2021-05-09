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
        root.ListArchive = factory(root.jQuery);
    }
}(window, function ($) {

    function ListArchive($el, options) {
        const _self = this;
        _self.$el = $($el);
        _self.options = options;

        _self.$aricleContent = _self.$el.find('.js-aricle-content');

        ListArchive.prototype.render = function (data) {
            const _self = this;

            const temple = ` <div class="tab-pane fade active show" id="new">${renderTabAricle(data.new)}</div>
                    <div class="tab-pane fade" id="best">${renderTabAricle(data.best)}</div>
                    <div class="tab-pane fade" id="archive">${renderTabAricle(data.archive)}</div>`;

            _self.$aricleContent.html(temple); 
        }

        function renderTabAricle(data) { 
            return data.reduce((str, item, i) => {
                str += `<a href="${item.link}" class="aricle-item">
                            <div class="aricle-image">
                                <img src="./image/${item.image}" alt="Image aricle">
                            </div>
                            <div class="aricle-text">
                                <h5>${item.title}</h5>
                                <div class='date'>${item.dateTimes}</div>
                                <div class='desc'>${item.description}</div>
                            </div>
                        </a>`;
                return str;
            }, '');
        }
    }

    $.fn.ListArchive = function () {
        const _ = this;
        const options = arguments[0];
        const args = Array.prototype.slice.call(arguments, 1);
        const length = _.length;

        for (let i = 0; i < length; i++) {
            if (typeof options === 'object' || typeof options === 'undefined') {
                _[i].ListArchive = new ListArchive(_[i], options);
            } else {
                // options is string
                return _[i].ListArchive[options].apply(_[i].ListArchive, args);
            }
        }

        return _;
    };

    return ListArchive;
}));