'use strict';

ProductGrid.$inject = ['$q', 'ProductManagementAPIService', 'ModalService'];

function ProductGrid($q, ProductManagementAPIService, ModalService) {

    return {
        restrict: 'E',
        scope: {
            onReady: '='
        },
        controller: function ($scope) {
            var ctor = new ProductGridCtor($scope);
            ctor.initializeController();
        },
        templateUrl: '../Product/ProductGrid.html'
    };

    function ProductGridCtor($scope) {
        this.initializeController = initializeController;

        var productsPerPage = 10;
        var productNameFilter;
        function initializeController() {

            //$scope.setPage = function (page) {
            //    $scope.currentPage = PaginationService.getCurrentPage($scope.pages, page, $scope.currentPage);
            //    DepartmentAPIService.getFilteredDepartmentsSerializedInput(name, $scope.selectedUniversityId, $scope.currentPage.from, $scope.currentPage.to).then(function (response) {
            //        $scope.departments = response.data.DepartmentsDetails;
            //    });
            //};

            $scope.onEdit = function (product) {
                ModalService.showModal("../Product/ProductEditor.html", { onProductUpdated: refresh, Id: product.ID });
            }

            //$scope.onRemove = function (department) {
            //    DepartmentAPIService.deleteDepartment(department.Id).then(function () {
            //        refresh();
            //    });
            //};

            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function (payload) {
                $scope.products = [];
                //$scope.selectedUniversityId = null;

                var loadProductsGridDeferred = $q.defer();
                productNameFilter = payload != undefined ? payload.productName : undefined;
                ProductManagementAPIService.getFilteredProducts(productNameFilter).then(function (response) {
                    $scope.products = response.data;
                    //departmentsNumber = response.data.Count;

                    //$scope.pages = PaginationService.getPages(departmentsNumber, departmentsPerPage);
                    //$scope.currentPage = $scope.pages[1];
                    loadProductsGridDeferred.resolve();
                });
                return loadProductsGridDeferred.promise;
            };

            api.getData = function () {
                return $scope.departments;
            };

            if ($scope.onReady != undefined && typeof $scope.onReady == "function") {
                $scope.onReady(api);
            }
        }

        function refresh() {
            ProductManagementAPIService.getFilteredProducts(productNameFilter).then(function (response) {
                $scope.products = response.data;
            });
        }

        //function refresh() {
        //    DepartmentAPIService.getFilteredDepartmentsSerializedInput(null, $scope.selectedUniversityId, 0, departmentsPerPage).then(function (response) {
        //        $scope.departments = response.data.DepartmentsDetails;
        //        departmentsNumber = response.data.Count;
        //        $scope.pages = PaginationService.getPages(departmentsNumber, departmentsPerPage);
        //        $scope.currentPage = $scope.pages[1];
        //    });
        //}
    }
}

app.directive('productGrid', ProductGrid);