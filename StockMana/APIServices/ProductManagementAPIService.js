'use strict';

ProductManagementAPIService.$inject = ['WebAPIService'];

function ProductManagementAPIService(WebAPIService) {

    function getProduct(productId) {
        return WebAPIService.get("/api/Product/GetProduct", { productId: productId });
    }

    function getProductToSell(productToSell) {
        return WebAPIService.get("/api/Product/GetProductToSell", { productToSell: productToSell });
    }

    function getProductInfos() {
        return WebAPIService.get("/api/Product/GetProductInfos");
    }

    function getFilteredProducts(name) {
        var serializedInput = JSON.stringify({ Name: name });
        return WebAPIService.get("/api/Product/GetFilteredProducts", { serializedInput: serializedInput });
    }

    function addProduct(productToAdd) {
        return WebAPIService.post("/api/Product/AddProduct", productToAdd);
    }

    function editProduct(product) {
        return WebAPIService.post("/api/Product/EditProduct", product);
    }

    return {
        getProduct: getProduct,
        getProductToSell: getProductToSell,
        getProductInfos: getProductInfos,
        getFilteredProducts: getFilteredProducts,
        addProduct: addProduct,
        editProduct: editProduct
    };
}

app.service("ProductManagementAPIService", ProductManagementAPIService);