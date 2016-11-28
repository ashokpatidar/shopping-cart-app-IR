(function() {
    'use-strict';
    angular.module('ax').config(['$stateProvider', '$urlRouterProvider',
        function config($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("product");
            
            $stateProvider
                .state('product', {
                    url: "/product",
                    templateUrl: "app/scripts/product/product.view.html",
                    controller: 'productController'
                })
                .state('productDetail/', {
                    url: '/productDetail/:id',
                    templateUrl: 'app/scripts/product/product-detail.view.html',
                    controller: 'productDetailController'
                })
                .state('cart', {
                    url: "/cart",
                    templateUrl: "app/scripts/cart/cart.view.html",
                    controller: 'cartController'
                });
        }
    ]);
})();