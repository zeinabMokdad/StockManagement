'use strict';

CustomerManagementController.$inject = ['$scope', '$q', 'ModalService'];

function CustomerManagementController($scope, $q, ModalService) {

    var customerGridAPI;
    var customerGridReadyDeferred = $q.defer();

    defineScope();

    function defineScope() {
        $scope.customerName = null;

        $scope.onCustomerGridReady = function (api) {
            customerGridAPI = api;
            customerGridReadyDeferred.resolve();
        };

        $scope.onAdd = function () {
            ModalService.showModal("../Customer/CustomerEditor.html", { onCustomerAdded: refresh });
        }

        $scope.onSearch = function () {
            loadCustomerGrid();
        }
    }

    loadCustomerGrid();

    function loadCustomerGrid() {
        var customerGridLoadDeferred = $q.defer();

        customerGridReadyDeferred.promise.then(function () {
            var payload = undefined;
            if ($scope.customerName || $scope.phoneNumber)
                payload = { customerName: $scope.customerName, phoneNumber: $scope.phoneNumber };

            customerGridAPI.load(payload).then(function () {
                customerGridLoadDeferred.resolve();
            });
        });

        return customerGridLoadDeferred.promise;
    }
    function refresh() {
        loadCustomerGrid();
    }
}

app.controller("CustomerManagementController", CustomerManagementController);