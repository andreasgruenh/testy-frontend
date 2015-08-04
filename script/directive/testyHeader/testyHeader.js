angular.module('testy').directive('testyheader',
    function() {
      return {
        restrict : 'E',
        templateUrl : 'template/testyHeader.html',
        scope: {
          user : '='
        },
        controller: [
          '$scope',
          '$state',
          'serverCommunicator',
          function($scope, $state, serverCommunicator) {
            $scope.logout = function() {
              serverCommunicator.logoutAsync().success(
                function(data, status, headers, config) {
                  $state.go('login');
                }).error(function(data, status, headers, config) {
                  console.log('Logout failed');
                });
              
            };

          }]
      };
  });
