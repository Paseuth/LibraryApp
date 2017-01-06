angular.module('eventApp')

.directive('ngNavbar', function (){
    return {
        restrict : 'A',
        templateUrl : '../views/_navbar.html'
    }
})
.directive('ngFooter', function (){
    return {
        restrict : 'A',
        templateUrl : '../views/_footer.html'
    }
})