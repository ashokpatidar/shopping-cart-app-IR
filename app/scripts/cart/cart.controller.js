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