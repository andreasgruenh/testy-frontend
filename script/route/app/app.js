angular.module('testy').controller('appController', [
    '$scope', '$state', 'serverCommunicator', 'loggedInUser',
    function($scope, $state, serverCommunicator, loggedInUser) {

      $scope.globals = {};
      $scope.globals.currentUser = loggedInUser;

      $scope.logout = function($event) {
        serverCommunicator.logoutAsync().then(
          function() {
            $state.go('login');
          });
        $event.preventDefault();
      };

    }]);
