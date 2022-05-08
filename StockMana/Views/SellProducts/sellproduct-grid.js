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
        function initializeController() {

            $scope.onRemove = function (product) {
                $scope.products.splice($scope.products.indexOf(product), 1);
            };

            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.addProduct = function (product) {
                $scope.products.push(product);
            };

            api.getData = function () {
                return $scope.products;
            };

            api.clearData = function () {
                $scope.products.length = 0;
            };

            if ($scope.onReady != undefined && typeof $scope.onReady == "function") {
                $scope.onReady(api);
            }
        }
    }
}

app.directive('sellproductGrid', SellProductGrid);