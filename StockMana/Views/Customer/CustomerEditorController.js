'use strict';

CustomerEditorController.$inject = ['$scope', '$q', 'CustomerManagementAPIService'];

function CustomerEditorController($scope, $q, CustomerManagementAPIService) {
    var context = $scope.context;
    var customer;

    defineScope();
    load();

    function defineScope() {

        $scope.onSaveClicked = function () {
            if (!$scope.edit) {
                customer = { FirstName: $scope.FirstName, LastName: $scope.LastName, PhoneNumber: $scope.PhoneNumber };
                onCustomerAdded(customer);
            } else {
                customer = { ID: context.Id, FirstName: $scope.FirstName, LastName: $scope.LastName, PhoneNumber: $scope.PhoneNumber };
                onCustomerUpdated(customer);
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
        if ($scope.edit)
            getCustomer(context.Id);
        else
            $scope.isLoading = false;
    }

    function getCustomer(id) {
        return CustomerManagementAPIService.getCustomer(id).then(function (response) {
            customer = response.data;
            $scope.FirstName = customer.FirstName;
            $scope.LastName = customer.LastName;
            $scope.PhoneNumber = customer.PhoneNumber;

            $scope.isLoading = false;
        });
    }

    function onCustomerAdded(customer) {
        CustomerManagementAPIService.addCustomer(customer).then(function () {
            context.onCustomerAdded();
        });
    }

    function onCustomerUpdated(customer) {
        CustomerManagementAPIService.editCustomer(customer).then(function () {
            context.onCustomerUpdated();
        });
    }
}

app.controller("CustomerEditorController", CustomerEditorController);