'use strict';
angular.module('eventApp')

    .controller('announcementController',
    ['$rootScope', '$http', '$scope', '$location', '$routeParams', 'accountService', 'appService',
        function ($rootScope, $http, $scope, $location, $routeParams, $accountService, $appService) {
            $scope.announcements = [];
            $scope.announcementsFiltered = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 10
            ,$scope.maxSize = 5;


            /*charge les livres*/
            $appService.getAllAnnouncements(function(result){
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.announcements = result;
                        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                        var end = begin + $scope.numPerPage;
                        $scope.announcementsFiltered = slice($scope.announcements, begin, end);
                    });
                });
            });

             $scope.$watch('currentPage + numPerPage', function() {
                 if (typeof $scope.announcements !== "undefined"){
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                    var end = begin + $scope.numPerPage;
                    $scope.announcementsFiltered = slice($scope.announcements, begin, end);
                 }
            });

            $scope.createAnnouncement = {
                Category : '0'
            };

            $rootScope.$watch('currentUser', function () {
                $scope.currentUser = $accountService.currentUser;
                if($scope.currentUser){
                    $scope.createAnnouncement.UserName = $scope.currentUser.FirstName + " " + $scope.currentUser.LastName.substring(0, 1) + ".";
                    $scope.createAnnouncement.Email = $scope.currentUser.Email;
                    $scope.createAnnouncement.UserUid = $scope.currentUser.Uid;
                }
               
            });

            $scope.clickOnCreateAnnouncement = function () {
                $appService.createAnnouncement($scope.createAnnouncement, function (result) {
                    console.log(result);
                })
            }

            if ($location.path().split('/')[2] == "detail") {
                console.log("announcementId : " + $routeParams.announcementId);
                //Requete recupère le AnnounceDetail
            }

        }]);