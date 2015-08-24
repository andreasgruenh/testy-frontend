angular.module('testy').controller('profileController', ['$scope', 'serverCommunicator', 
    function($scope, serverCommunicator) {
      
      $scope.oldUser = angular.copy($scope.globals.currentUser);
      $scope.save = function() {
        serverCommunicator.updateAccountAsync($scope.oldUser).then(
          function() {
            $scope.globals.currentUser = $scope.oldUser;
            $scope.globals.showGlobalAlert('success', 'Geschafft!', 'Profil wurde gespeichert');
          }, function() {
          });
      };
      var debugCounter = 0;
      $scope.debug = function() {
        if(debugCounter == 5) {
          $scope.globals.currentUser.canDebug = true;
          alert("Debuglevel freigeschaltet");
        }
        debugCounter++;
      };
    }]);
