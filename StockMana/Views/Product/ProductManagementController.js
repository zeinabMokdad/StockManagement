'use strict';

ProductManagementController.$inject = ['$scope', '$q', 'ModalService'];

function ProductManagementController($scope, $q, ModalService) {

    var productGridAPI;
    var productGridReadyDeferred = $q.defer();

    defineScope();

    function defineScope() {
        $scope.productName = null;

        $scope.onProductGridReady = function (api) {
            productGridAPI = api;
            productGridReadyDeferred.resolve();
        };

        $scope.onAdd = function () {
            ModalService.showModal("../Product/ProductEditor.html", { onProductAdded: refresh });
        }

        $scope.onSearch = function () {
            loadProductGrid();
        }
    }

    loadProductGrid();

    function loadProductGrid() {
        var productGridLoadDeferred = $q.defer();

        productGridReadyDeferred.promise.then(function () {
            var payload = undefined;
            if ($scope.productName)
                payload = { productName: $scope.productName };

            productGridAPI.load(payload).then(function () {
                productGridLoadDeferred.resolve();
            });
        });

        return productGridLoadDeferred.promise;
    }
    function refresh() {
        loadProductGrid();
    }
}

app.controller("ProductManagementController", ProductManagementController);