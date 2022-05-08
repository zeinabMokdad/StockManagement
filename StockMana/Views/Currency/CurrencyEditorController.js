'use strict';

CurrencyEditorController.$inject = ['$scope', '$q', 'CurrencyManagementAPIService'];

function CurrencyEditorController($scope, $q, CurrencyManagementAPIService) {
    var context = $scope.context;
    var currency;

    defineScope();
    load();

    function defineScope() {
        $scope.onSaveClicked = function () {
            if (!$scope.edit) {
                currency = { Name: $scope.Name, Symbol: $scope.Symbol };
                onCurrencyAdded(currency);
            } else {
                currency = { ID: context.Id, Name: $scope.Name, Symbol: $scope.Symbol };
                onCurrencyUpdated(currency);
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

        if ($scope.edit) {
            getCurrency(context.Id);
        }
        else {
            $scope.isLoading = false;
        }

    }

    function getCurrency(id) {
        return CurrencyManagementAPIService.getCurrency(id).then(function (response) {
            currency = response.data;
            $scope.Name = currency.Name;
            $scope.Symbol = currency.Symbol;
            $scope.isLoading = false;
        });
    }

    function onCurrencyAdded(currency) {
        CurrencyManagementAPIService.addCurrency(currency).then(function () {
            context.onCurrencyAdded();
        });
    }

    function onCurrencyUpdated(currency) {
        CurrencyManagementAPIService.editCurrency(currency).then(function () {
            context.onCurrencyUpdated();
        });
    }
}

app.controller("CurrencyEditorController", CurrencyEditorController);