angular.module('testy')

.run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.error(error);
    $state.go('login');
  });
}])
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
      accounts: ['serverCommunicator', '$state', function(serverCommunicator, $state) {
        return serverCommunicator.getAllAccountsAsync().catch(function(data){
          $state.go('login');
        });
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
      }],
      questionPools: ['$stateParams', 'serverCommunicator', function($stateParams, serverCommunicator) {
        return serverCommunicator.getQuestionPoolsForSubjectIdAsync($stateParams.id);
      }],
    },
    templateUrl: 'template/subject.html'
  })

  .state('app.questionPool', {
    url: '/question-pool/:id/',
    controller: 'questionPoolController',
    resolve: {
      questionPool: ['$stateParams', 'serverCommunicator', function($stateParams, serverCommunicator) {
        return serverCommunicator.getQuestionPoolByIdAsync($stateParams.id);
      }],
      categories: ['$stateParams', 'serverCommunicator', function($stateParams, serverCommunicator) {
        return serverCommunicator.getCategoriesOfPoolAsync($stateParams.id);
      }],
    },
    templateUrl: 'template/questionPool.html'
  })

  .state('app.category', {
    url: '/category/:id/',
    controller: 'categoryController',
    resolve: {
      questions: ['$stateParams', 'serverCommunicator', function($stateParams, serverCommunicator) {
        return serverCommunicator.getQuestionsForCategoryAsync($stateParams.id);
      }],
      category: ['$stateParams', 'serverCommunicator', function($stateParams, serverCommunicator) {
        return serverCommunicator.getCategoryByIdAsync($stateParams.id);
      }],
    },
    templateUrl: 'template/category.html'
  })

  .state('app.test', {
    url: '/test/:id',
    controller: 'testController',
    resolve: {
      test: ['$stateParams', 'serverCommunicator', function($stateParams, serverCommunicator) {
        return serverCommunicator.getTestForQuestionPoolAsync($stateParams.id);
      }],
    },
    templateUrl: 'template/test.html',
  })

  .state('app.test.question', {
    url: '/question/:number',
    controller: 'questionController',
    templateUrl: 'template/question.html',
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
