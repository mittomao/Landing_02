$(function () {
    const $wrapperSlider = $('.js-wrapper-slider');
    const $filterBox = $('.js-wrapper-filter');
    const $categoryBox = $('.js-wrapper-categorys');
    const $aricle = $('.js-aricle');
    let state = {
        arrId: [],
        items: [],
        isInitarticle : false
    }

    $wrapperSlider.listProduct();
    $filterBox.FilterBox();
    $categoryBox.categoryBox();
    $aricle.ListArchive();

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
        state.arrId.push(data.idProduct);
        let dataFilter  = filterData(state.items);

        $filterBox.FilterBox('renderProductHeart', dataFilter);
    });

    $filterBox.on('filter-box-get-id-clear', function (event, data) {
        const arrIdNew = state.arrId.filter((item) => item !== data);
        state.arrId = arrIdNew;

        let dataFilter  = filterData(state.items);
        $filterBox.FilterBox('renderProductHeart', dataFilter);
    });

    function filterData(data) { 
        return data.filter( (item, i) => {
            return state.arrId.indexOf(item.id) !== -1;
        });
    }

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