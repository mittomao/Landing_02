(function ($) {
    function ApiCaller() {

        const mockData = new MockApiContainer();

        ApiCaller.prototype.callApi = function (url, method, param, handleCallApiSuccess, handleCallApiFail) {
            if (url.search('http://localhost') !== -1) {
                callMockApi(url, param, handleCallApiSuccess, handleCallApiFail);
            }
            else {
                $.ajax({
                    contentType: method.toUpperCase() === 'POST' ? 'application/json' : '',
                    type: method || 'POST',
                    url: "url",
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: function (response) {
                        handleCallApiSuccess(response);
                    },
                    error: function (err) {
                        handleCallApiFail(err);
                    }
                });
            }
        }

        function callMockApi(url, param, handleCallApiSuccess, handleCallApiFail) {
            const response = mockData.call(param);

            if (response.status === 200) {
                handleCallApiSuccess(response);
            } else {
                handleCallApiFail(response);
            }
        }
    }

    function MockApiContainer() {

        MockApiContainer.prototype.call = function (param) {
            return getDataProduct(param);
        }

        function getDataProduct(param) {
            let result = {
                status: 200,
                items: [
                    {
                        id: 'cloth-1',
                        title: 'Áo thun',
                        image: 'somi-1.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'clothing',
                        gender: 'man'
                    },
                    {
                        id: 'cloth-2',
                        title: 'Áo phông',
                        image: 'somi-2.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'clothing',
                        gender: 'man'
                    },
                    {
                        id: 'cloth-3',
                        title: 'Thun trơn',
                        image: 'somi-3.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'clothing',
                        gender: 'man'
                    },
                    {
                        id: 'cloth-4',
                        title: 'Thun trơn',
                        image: 'somi-4.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'clothing',
                        gender: 'female'
                    },
                    {
                        id: 'cloth-5',
                        title: 'Thun trơn',
                        image: 'somi-5.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'clothing',
                        gender: 'female'
                    },
                    {
                        id: 'short-1',
                        title: 'Sóc ngắn',
                        image: 'quan-1.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shorts',
                        gender: 'man'
                    },
                    {
                        id: 'short-2',
                        title: 'Bò lửng',
                        image: 'quan-2.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shorts',
                        gender: 'man'
                    },
                    {
                        id: 'short-3',
                        title: 'Quần đùi',
                        image: 'quan-3.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shorts',
                        gender: 'man'
                    },
                    {
                        id: 'short-4',
                        title: 'Kaki chun',
                        image: 'quan-4.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shorts',
                        gender: 'man'
                    },
                    {
                        id: 'short-5',
                        title: 'Quần caro',
                        image: 'quan-5.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shorts',
                        gender: 'man'
                    },
                    {
                        id: 'hat-1',
                        title: 'Lưỡi trai',
                        image: 'mu-1.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'hat',
                        gender: 'man'
                    },
                    {
                        id: 'hat-2',
                        title: 'Mũ bò',
                        image: 'mu-2.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'hat',
                        gender: 'man'
                    },
                    {
                        id: 'hat-3',
                        title: 'Nón sơn',
                        image: 'mu-3.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'hat',
                        gender: 'man'
                    },
                    {
                        id: 'outlet-1',
                        title: 'Buberly',
                        image: 'tui-1.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'outlet',
                        gender: 'female'
                    },
                    {
                        id: 'outlet-2',
                        title: 'Chanel',
                        image: 'tui-2.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'outlet',
                        gender: 'female'
                    },
                    {
                        id: 'outlet-3',
                        title: 'Uk',
                        image: 'tui-3.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'outlet',
                        gender: 'female'
                    },
                    {
                        id: 'shoes-1',
                        title: 'Sneaker',
                        image: 'giay-1.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shoes',
                        gender: 'man'
                    },
                    {
                        id: 'shoes-2',
                        title: 'Jordan',
                        image: 'giay-2.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shoes',
                        gender: 'female'
                    },
                    {
                        id: 'shoes-3',
                        title: 'Balenciaga',
                        image: 'giay-3.png',
                        price: {
                            old: 20,
                            new: 10
                        },
                        category: 'shoes',
                        gender: 'man'
                    }
                ]
            }

            console.log('Param', param);

            let rs;

            if (param === undefined) {
                return result;

            } else {

               
                let g = param.gender ? 'man' : 'female';
                
                rs = result.items.filter( (item, i) => {
                    return item.gender === g;
                });

                
                if (param.title) {
                    rs = result.items.filter( (item, i) => {
                        return item.title.indexOf(param.title) !==-1;
                    });
                }

                if (param.category) {
                    rs = result.items.filter( (item, i) => {
                        return item.category.indexOf(param.category) !==-1;
                    });
                }
                
                if (param.category) {
                    rs = result.items.filter( (item, i) => {
                        return item.category.indexOf(param.category) !==-1;
                    });
                }

                console.log(rs);
                
                return {...result,items: rs};
            }   
        }
    }

    window.ApiCaller = window.ApiCaller || {};
    window.ApiCaller = new ApiCaller();
})(jQuery);