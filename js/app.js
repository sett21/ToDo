var MegaTodo = angular.module('MegaTodo', ['ngRoute','TodoCtrl']);

MegaTodo.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/list', {
      templateUrl: 'js/view/list.html',
      controller: 'TodoListCtrl'
    }).
    when('/archive', {
      templateUrl: 'js/view/archive.html',
      controller: 'TodoArchiveCtrl'
    }).
    otherwise({
      redirectTo: '/list'
    });
}]);

MegaTodo.controller("MainCtrl", function($scope, $location) {

  $scope.menuClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };
});