'use strict';

CurrencyManagementAPIService.$inject = ['WebAPIService'];

function CurrencyManagementAPIService(WebAPIService) {

    function getCurrency(currencyId) {
        return WebAPIService.get("/api/Currency/GetCurrency", { currencyId: currencyId });
    }

    function getCurrencyInfos() {
        return WebAPIService.get("/api/Currency/GetCurrencyInfos");
    }

    function getFilteredCurrencies(name) {
        var serializedInput = JSON.stringify({ Name: name });
        return WebAPIService.get("/api/Currency/GetFilteredCurrencies", { serializedInput: serializedInput });
    }

    function addCurrency(currencyToAdd) {
        return WebAPIService.post("/api/Currency/AddCurrency", currencyToAdd);
    }

    function editCurrency(currency) {
        return WebAPIService.post("/api/Currency/EditCurrency", currency);
    }

    return {
        getCurrency: getCurrency,
        getCurrencyInfos: getCurrencyInfos,
        getFilteredCurrencies: getFilteredCurrencies,
        addCurrency: addCurrency,
        editCurrency: editCurrency
    };
}

app.service("CurrencyManagementAPIService", CurrencyManagementAPIService);