(function () {
    'use-strict';
    angular.module('ax')
        .controller('productDetailController', function ($scope, $stateParams, itemsModel, cartService) {
            $scope.greet ="Welcome To Detail Page";

            itemsModel.getData().then(function(response){
                $scope.productsList = response;
                getProduct();
            });

            function getProduct(){
                $scope.product = _.find($scope.productsList, function(item) {
                    return item.id == Number($stateParams.id);
                });
            }
            $scope.addItem = function(item){
                cartService.addItem(item);
                $scope.$emit('updatecart');
            }
        });
})();