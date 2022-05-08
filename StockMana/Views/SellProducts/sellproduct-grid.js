'use strict';

//SellProductGrid.$inject = ['$q'];

function SellProductGrid() {

    return {
        restrict: 'E',
        scope: {
            onReady: '='
        },
        controller: function ($scope) {
            var ctor = new ProductGridCtor($scope);
            ctor.initializeController();
        },
        templateUrl: '../SellProducts/SellProductGrid.html'
    };

    function ProductGridCtor($scope) {
        this.initializeController = initializeController;

        $scope.products = [];
        $scope.totalsByCurrency = [];

        function initializeController() {

            $scope.onRemove = function (product) {
                $scope.products.splice($scope.products.indexOf(product), 1);
                updateTotals(product.CurrencyDescription, -1 * product.TotalPrice);
            };

            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.addProduct = function (product) {
                $scope.products.push(product);
                updateTotals(product.CurrencyDescription, product.TotalPrice);
            };

            api.getData = function () {
                return $scope.products;
            };

            api.clearData = function () {
                $scope.products.length = 0;
                $scope.totalsByCurrency.length = 0;
            };

            if ($scope.onReady != undefined && typeof $scope.onReady == "function") {
                $scope.onReady(api);
            }
        }

        function updateTotals(currency, price) {
            if ($scope.totalsByCurrency.length == 0) {
                $scope.totalsByCurrency.push({ currency: currency, amount: price });
                return;
            }

            for (var x = 0; x < $scope.totalsByCurrency.length; x++) {
                var currentItem = $scope.totalsByCurrency[x];
                if (currentItem.currency == currency) {
                    currentItem.amount += price;

                    if (currentItem.amount == 0) {
                        $scope.totalsByCurrency.splice($scope.totalsByCurrency.indexOf(currentItem), 1);
                    }
                    return;
                }
            }
            $scope.totalsByCurrency.push({ currency: currency, amount: price });
        }
    }
}

app.directive('sellproductGrid', SellProductGrid);