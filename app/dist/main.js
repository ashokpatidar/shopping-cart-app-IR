(function () {
    'use-strict';
    angular.module('ax', [
        'ui.router',
        'ngResource',
        'flash'
    ], function () {

    });
})();
(function () {
    'use-strict';
    angular.module('ax')
        .controller('shoppingAppController', function ($scope, cartService, $state) {

            $scope.totalItems = cartService.getTotalCartItems();

            $scope.$on('updatecart', function () {
                $scope.totalItems = cartService.getTotalCartItems();
            });


            $scope.gotoHomePage = function () {
                $state.go('product');
            }
        });
})();
(function(){
	'use-strict';
	angular.module('ax').constant('AX_CONSTANT', {
        rxurl: 'api/',
        //rxurl: 'http://localhost/shop/api/',
        persistantCart: true
    });
})();

(function() {
    'use-strict';
    angular.module('ax').config(['$stateProvider', '$urlRouterProvider',
        function config($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("product");
            
            $stateProvider
                .state('product', {
                    url: "/product",
                    templateUrl: "app/scripts/product/product.html",
                    controller: 'productController'
                })
                .state('productDetail/', {
                    url: '/productDetail/:id',
                    templateUrl: 'app/scripts/product/product.detail.html',
                    controller: 'productDetailController'
                })
                .state('cart', {
                    url: "/cart",
                    templateUrl: "app/scripts/cart/cart.html",
                    controller: 'cartController'
                });
        }
    ]);
})();
(function () {
    'use-strict';
    angular.module('ax')
        .service('itemsModel', itemsModel);

    itemsModel.$inject = ['$http', '$q'];

    function itemsModel($http, $q) {
        var productList = [];
        this.getData = function () {

            if(!productList.length){
               return $http.get("app/assets/MOCK_DATA.json").then(function (response) {
                    productList = response.data;
                    return response.data;
                });
            } else {
                return $q.when(productList);
            }
        };
    };


})();
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
(function () {
    'use-strict';
    angular.module('ax').directive('productItem', function () {
        return{
            restrict:'E',
            scope:{
                productInfo:'='
            },
            templateUrl:'app/scripts/product/product.item.view.html',
            controller:'productItemController'
        }

    });
})();
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
(function(){
	'use-strict';
	angular.module('ax')
		.controller('cartController', function($scope, cartService, $state, Flash) {
			$scope.list = cartService.getCartItem();

			$scope.getTotalBillAmount = function () {
				var total = 0;
				_.forEach($scope.list,function(item){
					total += Number(item.price);
				});

				return total;
			};

			$scope.placeOrder = function(){
				cartService.removeAll();
				$scope.$emit('updatecart');
				$state.go('product');
				var message = '<strong>Well done!</strong> Your order has been placed.';
				Flash.create('success', message);
			};

			$scope.deleteCartItem = function(item){
				cartService.removeItem(item);
				$scope.$emit('updatecart');
			};

			$scope.continueShopping = function(){
				$state.go('product');
			};
		});
})();
(function () {
    'use-strict';
    angular.module('ax')
        .service('cartService', function () {

            var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            this.addItem = function (item) {
                cartItems.push(item);
               localStorage.setItem('cartItems', JSON.stringify(cartItems));
            };

            this.removeItem = function (item) {
                _.remove(cartItems, function(currentObject) {
                    return currentObject.id === item.id;
                });
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                return cartItems;
            };

            this.getTotalCartItems = function () {
                return cartItems.length || 0;
            };

            this.getCartItem = function () {
                return cartItems;
            };

            this.removeAll = function(){
                localStorage.removeItem('cartItems');
                cartItems=[];
            }
        });
})();