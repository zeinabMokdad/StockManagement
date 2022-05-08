'use strict';

CustomerSelector.$inject = ['$q', 'CustomerManagementAPIService'];

function CustomerSelector($q, CustomerManagementAPIService) {
    return {
        restrict: 'E',
        scope: {
            onReady: '='
        },
        controller: function ($scope) {
            var ctor = new CustomerSelectorCtor($scope);
            ctor.initializeController();
        },
        templateUrl: '../Customer/CustomerSelector.html'
    };

    function CustomerSelectorCtor($scope) {
        this.initializeController = initializeController;

        function initializeController() {
            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function (payload) {

                $scope.selectedCustomer = undefined;
                $scope.customers = [];

                var loadDeferred = $q.defer();
                CustomerManagementAPIService.getCustomerInfos().then(function (response) {
                    $scope.customers = response.data;

                    if (payload != undefined && payload.selectedId != undefined) {
                        $scope.selectedCustomer = getSelectedCustomer(selectedId);
                    }
                    loadDeferred.resolve();
                });

                return loadDeferred.promise;
            }

            api.getSelectedId = function () {
                if ($scope.selectedCustomer == undefined)
                    return null;

                return $scope.selectedCustomer.ID;
            };

            if ($scope.onReady != undefined && typeof ($scope.onReady) == "function") {
                $scope.onReady(api);
            }
        }

        function getSelectedCustomer(selectedId) {
            for (var i = 0; i < $scope.customers.length; i++) {
                var currentCustomer = $scope.customers[i];
                if (currentCustomer.ID == selectedId)
                    return currentCustomer;
            }
            return null;
        }
    };
}

app.directive('customerSelector', CustomerSelector);