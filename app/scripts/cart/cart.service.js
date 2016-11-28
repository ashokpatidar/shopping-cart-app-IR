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