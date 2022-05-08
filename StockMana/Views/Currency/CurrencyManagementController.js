'use strict';

CurrencyManagementController.$inject = ['$scope', '$q', 'ModalService'];

function CurrencyManagementController($scope, $q, ModalService) {

    var productGridAPI;
    var productGridReadyDeferred = $q.defer();

    defineScope();

    function defineScope() {
        $scope.currencyName = null;

        $scope.onCurrencyGridReady = function (api) {
            productGridAPI = api;
            productGridReadyDeferred.resolve();
        };

        $scope.onAdd = function () {
            ModalService.showModal("../Currency/CurrencyEditor.html", { onCurrencyAdded: refresh });
        }

        $scope.onSearch = function () {
            loadCurrencyGrid();
        }
    }

    loadCurrencyGrid();

    function loadCurrencyGrid() {
        var currencyGridLoadDeferred = $q.defer();

        productGridReadyDeferred.promise.then(function () {
            var payload = undefined;
            if ($scope.currencyName)
                payload = { currencyName: $scope.currencyName };

            productGridAPI.load(payload).then(function () {
                currencyGridLoadDeferred.resolve();
            });
        });

        return currencyGridLoadDeferred.promise;
    }
    function refresh() {
        loadCurrencyGrid();
    }
}

app.controller("CurrencyManagementController", CurrencyManagementController);