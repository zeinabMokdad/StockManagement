'use strict';

ProductSelector.$inject = ['$q', 'ProductManagementAPIService'];

function ProductSelector($q, ProductManagementAPIService) {
    return {
        restrict: 'E',
        scope: {
            onReady: '='
        },
        controller: function ($scope) {
            var ctor = new ProductSelectorCtor($scope);
            ctor.initializeController();
        },
        templateUrl: '../Product/ProductSelector.html'
    };

    function ProductSelectorCtor($scope) {
        this.initializeController = initializeController;

        function initializeController() {
            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function (payload) {

                $scope.selectedProduct = undefined;
                $scope.products = [];

                var loadDeferred = $q.defer();
                ProductManagementAPIService.getProductInfos().then(function (response) {
                    $scope.products = response.data;

                    if (payload != undefined && payload.selectedId != undefined) {
                        $scope.selectedProduct = getSelectedProduct(selectedId);
                    }
                    loadDeferred.resolve();
                });

                return loadDeferred.promise;
            }

            api.getSelectedId = function () {
                if ($scope.selectedProduct == undefined)
                    return null;

                return $scope.selectedProduct.ID;
            };

            if ($scope.onReady != undefined && typeof ($scope.onReady) == "function") {
                $scope.onReady(api);
            }
        }

        function getSelectedProduct(selectedId) {
            for (var i = 0; i < $scope.products.length; i++) {
                var currentProduct = $scope.products[i];
                if (currentProduct.ID == selectedId)
                    return currentProduct;
            }
            return null;
        }
    };
}

app.directive('productSelector', ProductSelector);