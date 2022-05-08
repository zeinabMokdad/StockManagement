'use strict';

CustomerManagementAPIService.$inject = ['WebAPIService'];

function CustomerManagementAPIService(WebAPIService) {

    function getCustomer(customerId) {
        return WebAPIService.get("/api/Customer/GetCustomer", { customerId: customerId });
    }

    function getCustomerByPhoneNumber(phoneNumber) {
        return WebAPIService.get("/api/Customer/GetCustomerByPhoneNumber", { phoneNumber: phoneNumber });
    }

    function getCustomerInfos() {
        return WebAPIService.get("/api/Customer/GetCustomerInfos");
    }

    function getFilteredCustomers(customerName, phoneNumber) {
        var serializedInput = JSON.stringify({ CustomerName: customerName, PhoneNumber: phoneNumber });
        return WebAPIService.get("/api/Customer/GetFilteredCustomers", { serializedInput: serializedInput });
    }

    function addCustomer(customerToAdd) {
        return WebAPIService.post("/api/Customer/AddCustomer", customerToAdd);
    }

    function editCustomer(customer) {
        return WebAPIService.post("/api/Customer/EditCustomer", customer);
    }

    return {
        getCustomer: getCustomer,
        getCustomerByPhoneNumber: getCustomerByPhoneNumber,
        getCustomerInfos: getCustomerInfos,
        getFilteredCustomers: getFilteredCustomers,
        addCustomer: addCustomer,
        editCustomer: editCustomer
    };
}

app.service("CustomerManagementAPIService", CustomerManagementAPIService);