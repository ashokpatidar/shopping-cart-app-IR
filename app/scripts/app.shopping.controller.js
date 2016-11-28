(function () {
    'use-strict';
    angular.module('ax')
        .controller('shoppingAppController', function ($scope, cartService, $state) {

            $scope.totalItems = cartService.getTotalCartItems();

            $scope.$on('updatecart', function () {
                $scope.totalItems = cartService.getTotalCartItems();
            });

        });
})();