$(function () {
    const $wrapperSlider = $('.js-wrapper-slider');
    const $filterBox = $('.js-wrapper-filter');
    const $categoryBox = $('.js-wrapper-categorys');
    const $aricle = $('.js-aricle');
    const $orderBoxs = $('.js-orders-box');

    let state = {
        arrIdHeart: [],
        arrIdCart: [],
        items: [],
        isInitarticle: false
    }

    $wrapperSlider.listProduct();
    $filterBox.FilterBox();
    $categoryBox.categoryBox();
    $aricle.ListArchive();
    $orderBoxs.orderBoxs();

    $("[data-toggle='dropdown']").dropdown();

    $filterBox.on('product-filter-change', function (event, data) {
        $wrapperSlider.listProduct('unSlick');
        callApiListing(data);
    });

    $categoryBox.on('product-category-change', function (event, data) {
        $wrapperSlider.listProduct('unSlick');
        callApiListing(data);
    });

    $wrapperSlider.on('get-id-product-heart', function (event, data) {
        if (data.type === 'heart') {
            state.arrIdHeart.push(data.idProduct);
            let dataFilter = filterData(state.items, state.arrIdHeart);
            $filterBox.FilterBox('renderProductHeart', dataFilter);
        } else {
            state.arrIdCart.push(data.idProduct);
            let dataOrders = mergeDateInArray(filterData(state.items, state.arrIdCart));

            console.log('1', dataOrders, state.items);
            $orderBoxs.orderBoxs('render', dataOrders);
        }
    });

    $filterBox.on('filter-box-get-id-clear', function (event, data) {
        const arrIdNew = state.arrIdHeart.filter((item) => item !== data);
        state.arrIdHeart = arrIdNew;

        let dataFilter = filterData(state.items, state.arrIdHeart);
        $filterBox.FilterBox('renderProductHeart', dataFilter);
    });

    function filterData(data, arrId) {
        return data.filter((item, i) => {
            return arrId.indexOf(item.id) !== -1;
        });
    }

    function mergeDateInArray(data) {
        let today = new Date();
        let dateNow = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        return data.map((item, i) => {
            return { ...item, dateTimes: dateNow }
        });
    }

    function callApiListing(param) {
        const url = 'http://localhost:5500/get-data';

        const gender = $filterBox.FilterBox('getStatusGender');
        const requestData = {
            gender: gender,
            title: '',
            category: '',
            ...param
        }

        window.ApiCaller.callApi(url, 'POST', requestData, handleCallApiSucces, handleCallApiFail);
    }

    function handleCallApiSucces(res) {
        state.items = res.items;
        $wrapperSlider.listProduct('render', res.items);

        if (!state.isInitarticle) {
            $aricle.ListArchive('render', res.articles);
            state.isInitarticle = true;
        }
    }

    function handleCallApiFail(err) {
        console.error('Call Api Error', err);
    }

    callApiListing();
});