'use strict';
angular.module('eventApp')

.controller('accountController', 
['$rootScope', '$http', '$scope', '$location', 'accountService', 'appService',
function ($rootScope, $http, $scope, $location, $accountService, $appService) {

    $scope.registerUser = {
        Civility : '0',
    };



    $rootScope.$watch('currentUser', function() {
         $scope.currentUser = $accountService.currentUser;
    });

    $scope.clickOnLogin = function(){
        $accountService.login( $scope.accountUser.Email, $scope.accountUser.Password, function(result, msg){
            if(result){
                $scope.$apply(function(){
                    $location.path("/account/profil")
                }) 
            }
            else{
                alert(msg)
            }
        });
    }

    $scope.clickOnLogout = function(){
      $accountService.logout(function(){
           $scope.currentUser = null;
           $location.path('/announcement');
      });
    }

    $scope.clickOnRegister = function(){
        console.log($scope.registerUser);
        if($scope.form_registerUser.$invalid || $scope.registerUser.Civility == '0' || $scope.registerUser.Password != $scope.registerUser.ConfirmPassword){
            console.log("Error forumlaire");
            return;
        }

        $accountService.createUserWithEmailAndPassword($scope.registerUser, function(userFirebase){
            $scope.$apply(function(){
                $rootScope.currentUser = userFirebase;
                $location.path("/account/profil");
            });
           
        })

    }
    
    $scope.changeOnRegion = function(){
        if($scope.registerUser.Region !== '0'){
           var tab_depatermentId = $scope.regionsAndDepartments.regions[$scope.registerUser.Region];
           $scope.departementsByRegion = [];
           $scope.registerUser.Department = '0';

            for(var i = 0 ; i < tab_depatermentId.length; i++){
                for(var j = 0; j < $scope.regionsAndDepartments.departments.length; j++){
                    if(tab_depatermentId[i]+"" ===  $scope.regionsAndDepartments.departments[j].departmentId){
                        $scope.departementsByRegion.push($scope.regionsAndDepartments.departments[j]);
                        break;
                    }
                }
            }
        }
    }

    $scope.helperDepartment = function(depatermentId){
        if($scope.regionsAndDepartments.departments){
            for(var i = 0 ; i < $scope.regionsAndDepartments.departments.length; i++){
                if($scope.regionsAndDepartments.departments[i].departmentId == depatermentId){
                    return $scope.regionsAndDepartments.departments[i];
                }
            }
        }
        
    }
}]);