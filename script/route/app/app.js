angular.module('testy').controller('appController', [
    '$scope', '$state', 'serverCommunicator', 'loggedInUser',
    function($scope, $state, serverCommunicator, loggedInUser) {

      $scope.globals.currentUser = loggedInUser;
      $scope._ = _;
      $scope.window = window;

      $scope.logout = function($event) {
        serverCommunicator.logoutAsync().then(
          function() {
            $state.go('login');
          });
        $event.preventDefault();
      };

      if($scope.globals.currentUser.firstname === null ||
          $scope.globals.currentUser.lastname === null ||
          $scope.globals.currentUser.email === null) {
        $state.go('app.profile');
        $scope.globals.showGlobalAlert('warning', 'Achtung!',
          'Bitte gib deine Profilinformationen ein');
      }

    }]);
