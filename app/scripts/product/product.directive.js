(function () {
    'use-strict';
    angular.module('ax').directive('productItem', function () {
        return{
            restrict:'E',
            scope:{
                productInfo:'='
            },
            templateUrl:'app/scripts/product/product-item.view.html',
            controller:'productItemController'
        }
    });
})();