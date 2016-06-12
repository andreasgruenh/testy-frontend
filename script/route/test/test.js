angular.module('testy').controller('testController', [
    '$scope',
    '$state',
    'serverCommunicator',
    'test',
    function($scope, $state, serverCommunicator, test) {
      $scope.$on('$destroy', cleanUp);
      $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
        $scope.testId = toParams.id;
        $scope.isOnStartPage = toState.name === 'app.test';
      });
      $scope.test = test;
      console.log(test);
      var tenMinutes = 10 * 60 * 1000;
      $scope.logginRefreshInterval = setInterval(function() {
        serverCommunicator.getLoggedInUserAsync();
      }, tenMinutes);
      // window.onbeforeunload = sure;

      function sure() {
        return 'Are you sure you want to exit? Your progress will be lost!';
      }

      function cleanUp() {
        clearInterval($scope.logginRefreshInterval);
        window.onbeforeunload = null;
      }
    }]);
