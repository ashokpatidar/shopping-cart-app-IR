(function () {
    'use-strict';
    angular.module('ax')
        .controller('productItemController', function ($scope, cartService) {
            $scope.addItem = function(item){
                cartService.addItem(item);
                $scope.$emit('updatecart');
            }
        });
})();