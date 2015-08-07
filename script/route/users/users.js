angular.module('testy').controller('usersController', [
    '$scope',
    'accounts',
    function($scope, accounts) {
      
      $scope.accounts = accounts;

    }]);
