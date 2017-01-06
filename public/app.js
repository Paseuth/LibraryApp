'use strict';

angular.module('eventApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap'
], function ($provide) {})

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/announcement', {
            controller: 'announcementController',
            templateUrl: '../../views/announcement/index.html',
            reloadOnSearch: false
        })
        .when('/announcement/create', {
            controller: 'announcementController',
            templateUrl: '../../views/announcement/create.html',
            reloadOnSearch: false
        })
        .when('/announcement/detail/:announcementId', {
            controller: 'announcementController',
            templateUrl: '../../views/announcement/detail.html',
            reloadOnSearch: false
        })
         .when('/account/profil', {
            controller: 'accountController',
            templateUrl: '../../views/account/profil.html',
            reloadOnSearch: false
        })
        .when('/account/login', {
            controller: 'accountController',
            templateUrl: '../../views/account/login.html',
            reloadOnSearch: false
        })
        .when('/account/register', {
            controller: 'accountController',
            templateUrl: '../../views/account/register.html',
            reloadOnSearch: false
        })
        .otherwise({
            redirectTo: '/announcement'
        });
}])

.run(['$rootScope', '$http', '$location', 'accountService', 'appService',
    function ($rootScope, $http, $location, $accountService, $appService) {
        
        /*initial l'utilisateur coutant */
        /* Verification des routes */
        $rootScope.currentUser = null;
        $accountService.getCurrentUser_initial(function(currentUser){
            $rootScope.$apply(function(){
                $rootScope.currentUser = currentUser;
                $rootScope.$on('$locationChangeSuccess', function () {
                    var path1 = $location.path().split("/")[1]||"Unknown"; 
                    var path2 = $location.path().split("/")[2]||"Unknown"; 
                    if(path1 == "account" && $rootScope.currentUser && (path2 == "login" || path2 == "register")){
                        $location.path("/account/profil");
                    }
                    if(path1 == "account" && !$rootScope.currentUser && path2 == "profil"){
                        $location.path("/account/login");
                    }
                });
            });
        });

        


    }
]);

function slice(array, start, end) {
    var sliced = [];
    for(var i = start ; i < end ; i++){
        sliced.push(array[i]);
    }
    return sliced;
}