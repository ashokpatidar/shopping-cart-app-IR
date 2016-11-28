(function () {
    'use-strict';
    angular.module('ax')
        .service('itemsModel', itemsModel);

    itemsModel.$inject = ['$http', '$q'];

    function itemsModel($http, $q) {
        var productList = [];
        this.getData = function () {

            if(!productList.length){
               return $http.get("app/assets/json/MOCK_DATA.json").then(function (response) {
                    productList = response.data;
                    return response.data;
                });
            } else {
                return $q.when(productList);
            }
        };
    };


})();