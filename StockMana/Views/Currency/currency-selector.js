'use strict';

CurrencySelector.$inject = ['$q', 'CurrencyManagementAPIService'];

function CurrencySelector($q, CurrencyManagementAPIService) {
    return {
        restrict: 'E',
        scope: {
            onReady: '='
        },
        controller: function ($scope) {
            var ctor = new CurrencySelectorCtor($scope);
            ctor.initializeController();
        },
        templateUrl: '../Currency/CurrencySelector.html'
    };

    function CurrencySelectorCtor($scope) {
        this.initializeController = initializeController;

        function initializeController() {
            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function (payload) {

                $scope.selectedCurrency = undefined;
                $scope.currencies = [];

                var loadDeferred = $q.defer();

                CurrencyManagementAPIService.getCurrencyInfos().then(function (response) {
                    $scope.currencies = response.data;

                    if (payload != undefined && payload.selectedId != undefined) {
                        $scope.selectedCurrency = getSelectedCurrency(payload.selectedId);
                    }
                    loadDeferred.resolve();
                });

                return loadDeferred.promise;
            }

            api.getSelectedId = function () {
                if ($scope.selectedCurrency == undefined)
                    return null;

                return $scope.selectedCurrency.ID;
            };

            if ($scope.onReady != undefined && typeof ($scope.onReady) == "function") {
                $scope.onReady(api);
            }
        };

        function getSelectedCurrency(selectedId) {
            for (var i = 0; i < $scope.currencies.length; i++) {
                var currentCurrency = $scope.currencies[i];
                if (currentCurrency.ID == selectedId)
                    return currentCurrency;
            }
            return null;
        }
    }
}

app.directive('currencySelector', CurrencySelector);