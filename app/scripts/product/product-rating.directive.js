(function () {
    'use-strict';
    angular.module('ax').directive('productRating', function () {
        return{
            restrict:'E',
            scope:{
                rating:'='
            },
            templateUrl:'app/scripts/product/product.rating.html'
        }

    });
})();