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
        return serverCommunicator.getLoggedInUserAsync().catch(function(data){
          $state.go('login');
        });
      }]
    },
    templateUrl: 'template/app.html'
  })

  .state('app.home', {
    url: '/home',
    controller: 'homeController',
    templateUrl: 'template/home.html'
   })

  .state('app.users', {
    url: '/users',
    controller: 'usersController',
    resolve: {
      accounts: ['serverCommunicator', function(serverCommunicator) {
        return serverCommunicator.getAllAccountsAsync();
      }]
    },
    templateUrl: 'template/users.html'
  })

  .state('app.subjects', {
    url: '/subjects',
    controller: 'subjectsController',
    resolve: {
      subjects: ['serverCommunicator', function(serverCommunicator) {
        return serverCommunicator.getAllSubjectsAsync();
      }]
    },
    templateUrl: 'template/subjects.html'
  })

  .state('app.debug', {
    url: '/debug',
    controller: 'debugController',
    templateUrl: 'template/debug.html'
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
