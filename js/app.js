$(function () {
    const $wrapperSlider = $('.js-wrapper-slider');
    const $filterBox = $('.js-wrapper-filter');
    const $categoryBox = $('.js-wrapper-categorys');
    let arrId = [];
    let state = {
        items: []
    }

    $wrapperSlider.listProduct();
    $filterBox.FilterBox();
    $categoryBox.categoryBox();

    $( "[data-toggle='dropdown']" ).dropdown();

    $filterBox.on('product-filter-change', function (event, data) {
        $wrapperSlider.listProduct('unSlick');
        callApiListing(data);
    });

    $categoryBox.on('product-category-change', function (event, data) {
        $wrapperSlider.listProduct('unSlick');
        callApiListing(data);
    });

    $wrapperSlider.on('get-id-product-heart', function (event, data) {
        arrId.push(data.idProduct);
        let dataFilter  = state.items.filter( (item, i) => {
            return arrId.indexOf(item.id) !== -1;
        });

        $filterBox.FilterBox('renderProductHeart', dataFilter);
    });

    function callApiListing(param) {
        const url = 'http://localhost:5500/get-data';

        const gender = $filterBox.FilterBox('getStatusGender');
        const requestData = {
            gender: gender,
            title: '',
            category:'',
            ...param
        }

        window.ApiCaller.callApi(url, 'POST', requestData, handleCallApiSucces, handleCallApiFail);
    }

    function handleCallApiSucces(res) {
        state.items = res.items;
        $wrapperSlider.listProduct('render', res.items);
    }

    function handleCallApiFail(err) {
        console.error('Call Api Error', err);
    }

    callApiListing();
});