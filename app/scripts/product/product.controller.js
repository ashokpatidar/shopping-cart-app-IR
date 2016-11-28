(function () {
    'use-strict';
    angular.module('ax')
        .controller('productController', function ($scope, itemsModel) {
            $scope.greet = "Welcome to the Home Page";
            itemsModel.getData().then(function(response){
                $scope.productsList = response;
            });

        });
})();