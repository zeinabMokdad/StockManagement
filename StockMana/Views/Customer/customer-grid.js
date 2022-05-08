'use strict';

CustomerGrid.$inject = ['$q', 'CustomerManagementAPIService', 'ModalService'];

function CustomerGrid($q, CustomerManagementAPIService, ModalService) {

    return {
        restrict: 'E',
        scope: {
            onReady: '='
        },
        controller: function ($scope) {
            var ctor = new CustomerGridCtor($scope);
            ctor.initializeController();
        },
        templateUrl: '../Customer/CustomerGrid.html'
    };

    function CustomerGridCtor($scope) {
        this.initializeController = initializeController;

        var customersPerPage = 10;
        var customerNameFilter;
        var phoneNumberFilter;

        function initializeController() {

            $scope.onEdit = function (customer) {
                ModalService.showModal("../Customer/CustomerEditor.html", { onCustomerUpdated: refresh, Id: customer.ID });
            }

            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function (payload) {
                $scope.customers = [];

                var loadCustomersGridDeferred = $q.defer();
                customerNameFilter = payload != undefined ? payload.customerName : undefined;
                phoneNumberFilter = payload != undefined ? payload.phoneNumber : undefined;

                CustomerManagementAPIService.getFilteredCustomers(customerNameFilter, phoneNumberFilter).then(function (response) {
                    $scope.customers = response.data;
                    loadCustomersGridDeferred.resolve();
                });
                return loadCustomersGridDeferred.promise;
            };

            api.getData = function () {
                return $scope.departments;
            };

            if ($scope.onReady != undefined && typeof $scope.onReady == "function") {
                $scope.onReady(api);
            }
        }

        function refresh() {
            CustomerManagementAPIService.getFilteredCustomers(customerNameFilter).then(function (response) {
                $scope.customers = response.data;
            });
        }
    }
}

app.directive('customerGrid', CustomerGrid);