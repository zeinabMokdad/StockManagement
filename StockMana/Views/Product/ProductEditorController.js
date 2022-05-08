'use strict';

ProductEditorController.$inject = ['$scope', '$q', 'ProductManagementAPIService'];

function ProductEditorController($scope, $q, ProductManagementAPIService) {
    var context = $scope.context;
    var product;

    var currencySelectorAPI;
    var currencySelectorReadyDeferred = $q.defer();

    defineScope();
    load();

    function defineScope() {
        $scope.onCurrencyReady = function (api) {
            currencySelectorAPI = api;
            currencySelectorReadyDeferred.resolve();
        };

        $scope.onSaveClicked = function () {
            if (!$scope.edit) {
                product = { Name: $scope.Name, Barcode: $scope.Barcode, Price: $scope.Price, CurrencyID: currencySelectorAPI.getSelectedId(), Quantity: $scope.Quantity };
                onProductAdded(product);
            } else {
                product = { ID: context.Id, Name: $scope.Name, Barcode: $scope.Barcode, Price: $scope.Price, CurrencyID: currencySelectorAPI.getSelectedId(), Quantity: $scope.Quantity };
                onProductUpdated(product);
            }
            $scope.close();
        };

        $scope.onCancelClicked = function () {
            $scope.close();
        };
    }

    function load() {

        $scope.isLoading = true;
        $scope.edit = context.Id != undefined;

        var loadProductPromise = undefined;
        if ($scope.edit) {
            loadProductPromise = getProduct(context.Id);
        }
        else {
            var loadProductPromiseDeferred = $q.defer();
            loadProductPromise = loadProductPromiseDeferred.promise;
            loadProductPromiseDeferred.resolve();
        }

        var loadCurrencySelectorPromise = loadCurrencySelector();

        loadCurrencySelectorPromise.then(function () {
            $scope.isLoading = false;
        });

        function loadCurrencySelector() {
            var currencySelectorLoadDeferred = $q.defer();

            loadProductPromise.then(function () {
                currencySelectorReadyDeferred.promise.then(function () {
                    var payload = undefined;
                    if ($scope.edit) {
                        payload = { selectedId: product.CurrencyID };
                    }

                    currencySelectorAPI.load(payload).then(function () {
                        currencySelectorLoadDeferred.resolve();
                    });
                });
            });

            return currencySelectorLoadDeferred.promise;
        }
    }

    function getProduct(id) {
        return ProductManagementAPIService.getProduct(id).then(function (response) {
            product = response.data;
            $scope.Name = product.Name;
            $scope.Barcode = product.Barcode;
            $scope.Price = product.Price;
            $scope.Quantity = product.Quantity;
        });
    }

    function onProductAdded(product) {
        ProductManagementAPIService.addProduct(product).then(function () {
            context.onProductAdded();
        });
    }

    function onProductUpdated(product) {
        ProductManagementAPIService.editProduct(product).then(function () {
            context.onProductUpdated();
        });
    }
}

app.controller("ProductEditorController", ProductEditorController);