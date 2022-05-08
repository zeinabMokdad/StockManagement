'use strict';

CurrencyGrid.$inject = ['$q', 'CurrencyManagementAPIService', 'ModalService'];

function CurrencyGrid($q, CurrencyManagementAPIService, ModalService) {

    return {
        restrict: 'E',
        scope: {
            onReady: '='
        },
        controller: function ($scope) {
            var ctor = new CurrencyGridCtor($scope);
            ctor.initializeController();
        },
        templateUrl: '../Currency/CurrencyGrid.html'
    };

    function CurrencyGridCtor($scope) {
        this.initializeController = initializeController;

        var currencyNameFilter;
        function initializeController() {

            $scope.onEdit = function (currency) {
                ModalService.showModal("../Currency/CurrencyEditor.html", { onCurrencyUpdated: refresh, Id: currency.ID });
            }

            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function (payload) {
                $scope.currencies = [];

                var loadCurrenciesGridDeferred = $q.defer();
                currencyNameFilter = payload != undefined ? payload.currencyName : undefined;
                CurrencyManagementAPIService.getFilteredCurrencies(currencyNameFilter).then(function (response) {
                    $scope.currencies = response.data;
                    loadCurrenciesGridDeferred.resolve();
                });
                return loadCurrenciesGridDeferred.promise;
            };

            api.getData = function () {
                return $scope.departments;
            };

            if ($scope.onReady != undefined && typeof $scope.onReady == "function") {
                $scope.onReady(api);
            }
        }

        function refresh() {
            CurrencyManagementAPIService.getFilteredCurrencies(currencyNameFilter).then(function (response) {
                $scope.currencies = response.data;
            });
        }
    }
}

app.directive('currencyGrid', CurrencyGrid);