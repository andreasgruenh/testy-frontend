angular.module('testy').controller('questionController', [
    '$scope',
    '$state',
    'serverCommunicator',
    function($scope, $state, serverCommunicator) {
      console.log($scope);
    }]);
