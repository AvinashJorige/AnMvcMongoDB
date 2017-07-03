app.factory("GetInitData", ["$http", "$q", "$state", "$window", "$rootScope", function ($http, $q, $state, $window, $rootScope) {
    delete $http.defaults.headers.common['X-Requested-With'];
    var fac = {};

    fac.GetAllData = function () {
        return $http.get("/Default/getData");
    }

    fac.AddSample = function (item) {
        return $http.post("/Default/AddSample", item).success(function (response) {
            alert(response.message);
        });
    }

    fac.UpdateSample = function (item) {
        return $http.post("/Default/UpdateSample", item).success(function (response) {
            alert(response.message);
        });
    }

    fac.DeleteSample = function (item) {
        return $http.post("/Default/DeleteSample", item).success(function (response) {
            alert(response.message);
        });
    }

    return fac;
}])
.factory("cacheManager", ["$cacheFactory", function ($cacheFactory) {
    try {
        var fac = {};

        var currentItem = "";
        var keys = [];
        var cache = $cacheFactory('cacheManagement');

        fac.addItems = function (key, value) {
            keys.push(key);
            cache.put(key, value);
        };

        fac.getItem = function (key) {
            return currentItem = cache.get(key);
        };

        fac.removeItem = function (key) {
            keys = keys.filter(function (key) {
                return (key !== key);
            });
            cache.remove(key);
        };
        return fac;
    } catch (e) {
        console.log("factory error : ", e);
    }
}])