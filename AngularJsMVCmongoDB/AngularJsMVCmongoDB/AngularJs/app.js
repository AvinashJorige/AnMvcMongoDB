var app = angular.module("ngApp", ["ngAnimate", "ui.router", "angularValidator"]);


// Adding the configurable routing routes for navigating the page URL....
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('getAll', {
        url: "/getAll",
        templateUrl: '/PageViews/DisplayListAll.html',
        controller: "DefaultController"
    })

    .state('AddSample', {
        url: "/AddSample",
        templateUrl: '/PageViews/AddSample.html',
        controller: "DefaultController"
    })
    
    .state('editSample', {
        url: "/editSample/:sampleId/edit",
        templateUrl: '/PageViews/EditSample.html',
        controller: "EditController"
    })
}]);