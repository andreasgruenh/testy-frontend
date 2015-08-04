var app = angular.module('testy', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/login',
    controller: 'loginController',
    templateUrl: 'template/login.html'
  });
}]);
