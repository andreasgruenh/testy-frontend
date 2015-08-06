var app = angular.module('testy', ['ui.router', 'ngSanitize']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    controller: 'loginController',
    resolve: {
      loggedInUser: ['$state', 'serverCommunicator', function($state, serverCommunicator){
        return serverCommunicator.getLoggedInUserAsync().then(
          function(data){
            $state.go('app.home');
          }, 
          function(data){
          }
          );
      }]
    },
    templateUrl: 'template/login.html'
  })

  .state('app', {
    controller: 'appController',
    resolve: {
      loggedInUser: ['$state', 'serverCommunicator', function($state, serverCommunicator){
        return serverCommunicator.getLoggedInUserAsync().then(
          function(data){
            return data.data;
          }, 
          function(data){
            $state.go('login');
          }
        );
      }]
    },
    templateUrl: 'template/app.html'
  })

  .state('app.home', {
    url: '/home',
    controller: 'homeController',
    templateUrl: 'template/home.html'
   })

  .state('app.profile', {
    url: '/profile',
    controller: 'profileController',
    templateUrl: 'template/profile.html'
  });
$urlRouterProvider.otherwise("/login");
}]);

app.run(['$rootScope', '$state', 'serverCommunicator',
    function($rootScope, $state, serverCommunicator) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $('.navbar-collapse').collapse('hide');
    });
}]);
