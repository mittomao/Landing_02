$(function () {
    const $wrapperSlider = $('.js-wrapper-slider');
    const $filterBox = $('.js-wrapper-filter');
    const $categoryBox = $('.js-wrapper-categorys');

    $wrapperSlider.listProduct();
    $filterBox.FilterBox();
    $categoryBox.categoryBox();

    $filterBox.on('product-filter-change', function (event, data) {
        $wrapperSlider.listProduct('unSlick');
        callApiListing(data);
    });

    $categoryBox.on('product-category-change', function (event, data) {
        $wrapperSlider.listProduct('unSlick');
        callApiListing(data);
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
        $wrapperSlider.listProduct('render', res.items);
    }

    function handleCallApiFail(err) {
        console.error('Call Api Error', err);
    }

    callApiListing();
});