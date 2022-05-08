'use strict';

CustomerInvoiceManagementAPIService.$inject = ['WebAPIService'];

function CustomerInvoiceManagementAPIService(WebAPIService) {

    function addInvoice(customerInvoice) {
        return WebAPIService.post("/api/CustomerInvoice/AddInvoice", customerInvoice);
    }

    return {
        addInvoice: addInvoice
    };
}

app.service("CustomerInvoiceManagementAPIService", CustomerInvoiceManagementAPIService);