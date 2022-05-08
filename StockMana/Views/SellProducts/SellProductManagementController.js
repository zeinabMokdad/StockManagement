'use strict';

SellProductManagementController.$inject = ['$scope', '$q', 'ModalService', 'ProductManagementAPIService', 'CustomerInvoiceManagementAPIService', 'CustomerManagementAPIService'];

function SellProductManagementController($scope, $q, ModalService, ProductManagementAPIService, CustomerInvoiceManagementAPIService, CustomerManagementAPIService) {

    var sellproductGridAPI;
    var sellproductGridReadyDeferred = $q.defer();

    defineScope();

    function defineScope() {
        $scope.productName = null;
        $scope.totalsByCurrency = [];
        var customerId = null;

        $scope.onSellProductGridReady = function (api) {
            sellproductGridAPI = api;
            sellproductGridReadyDeferred.resolve();
        };

        $scope.onSell = function () {
            var productsToSell = sellproductGridAPI.getData();
            if (productsToSell == undefined || productsToSell.length == 0) {
                return;
            }
            var invoice = { ProductInvoices: [], CustomerID: customerId };
            for (var x = 0; x < productsToSell.length; x++) {
                var currentProduct = productsToSell[x];
                var product = {
                    ID: currentProduct.ID,
                    Quantity: currentProduct.Quantity,
                    Price: currentProduct.TotalPrice,
                    UnitPrice: currentProduct.UnitPrice,
                    CurrencyID: currentProduct.CurrencyID
                };
                invoice.ProductInvoices.push(product);
            }
            CustomerInvoiceManagementAPIService.addInvoice(invoice);
            sellproductGridAPI.clearData();
            $scope.totalsByCurrency.length = 0;
            $scope.phoneNumber = null;
            customerId = null;
        }

        $scope.$watch('productName', function (newval, oldval) {
            if (newval == undefined || newval == null)
                return;

            ProductManagementAPIService.getProductToSell(newval).then(function (response) {
                console.log(response);
                if (response != undefined && response.data != undefined) {
                    var product = { ID: response.data.ID, Name: response.data.Name, Barcode: response.data.Barcode, Quantity: response.data.Quantity, UnitPrice: response.data.Price, CurrencyDescription: response.data.CurrencyDescription, TotalPrice: response.data.Quantity * response.data.Price, CurrencyID: response.data.CurrencyID };
                    sellproductGridAPI.addProduct(product);
                    $scope.productName = null;
                    updateTotals(product.CurrencyDescription, product.TotalPrice);
                }
            });
        });

        $scope.$watch('phoneNumber', function (newval, oldval) {
            if (newval == undefined || newval == null)
                return;

            CustomerManagementAPIService.getCustomerByPhoneNumber(newval).then(function (response) {
                console.log(response);
                if (response != undefined && response.data != undefined) {
                    $scope.customerName = response.data.FirstName + ' ' + response.data.LastName;
                    customerId = response.data.ID;
                }
                else {
                    $scope.customerName = undefined;
                    customerId = null;
                }
            });
        });

        function updateTotals(currency, price) {
            if ($scope.totalsByCurrency.length == 0) {
                $scope.totalsByCurrency.push({ currency: currency, amount: price });
                return;
            }

            for (var x = 0; x < $scope.totalsByCurrency.length; x++) {
                var currentItem = $scope.totalsByCurrency[x];
                if (currentItem.currency == currency) {
                    currentItem.amount += price;
                    return;
                }
            }
            $scope.totalsByCurrency.push({ currency: currency, amount: price });
        }
    }
}

app.controller("SellProductManagementController", SellProductManagementController);