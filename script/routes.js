angular.module('testy')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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

  .state('app.subject', {
    url: '/subject/:id/',
    controller: 'subjectController',
    resolve: {
      subject: ['$stateParams', 'serverCommunicator', function($stateParams, serverCommunicator) {
        return serverCommunicator.getSubjectByIdAsync($stateParams.id);
      }]
    },
    templateUrl: 'template/subject.html'
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
