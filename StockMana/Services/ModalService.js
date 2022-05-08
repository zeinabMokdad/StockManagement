'use strict';

ModalService.$inject = ['$rootScope', '$modal'];

function ModalService($rootScope, $modal) {

    var modalInstance;

    function showModal(templateDirectory, context) {

        var newScope = $rootScope.$new();
        newScope.context = context;
        newScope.close = function () {
            modalInstance.close();
            newScope.$destroy();
        };

        modalInstance = $modal.open({
            templateUrl: templateDirectory,
            scope: newScope,
        });
    }

    return {
        showModal: showModal
    }
};

app.service("ModalService", ModalService);