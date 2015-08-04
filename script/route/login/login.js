angular.module('testy').controller('loginController', 
    ['$scope', '$state', 'serverCommunicator', function($scope, $state, serverCommunicator){

  $scope.login = function() {
    serverCommunicator.loginAsync($scope.username, $scope.password).then(
      function(data){
        $state.go('app.home');
      });
  };
}]);
