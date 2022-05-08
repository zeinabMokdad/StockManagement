'use strict';

WebAPIService.$inject = ['$http'];

function WebAPIService($http) {
    function get(url, parameters) {
        return $http.get(url, { params: parameters });
    }

    function post(url, parameters) {
        return $http.post(url, JSON.stringify(parameters));
    }

    return {
        get: get,
        post: post
    }
};

app.service("WebAPIService", WebAPIService);