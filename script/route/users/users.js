angular.module('testy').controller('usersController', [
    '$scope',
    'accounts',
    'serverCommunicator',
    function($scope, accounts, serverCommunicator) {

      $scope.editedAccounts = [];
      $scope.editingCopiesById = {};

      $scope.accounts = _.sortBy(accounts, 'accountName');

      $scope.editAccount = function(account) {
        $scope.editedAccounts.push(account);
        $scope.editingCopiesById[account.id] =
          _.cloneDeep(_.pick(account, 'id', 'accountName', 'firstname', 'lastname', 'email', 'admin'));
      };

      $scope.cancelEditing = function(account) {
        _.pull($scope.editedAccounts, account);
        delete $scope.editingCopiesById[account.id];
      };

      $scope.saveAccount = function(account) {
        serverCommunicator.updateOtherAccountAsync($scope.editingCopiesById[account.id])
          .then(function(newAccount) {
            $scope.accounts =
              _($scope.accounts).without(account).concat(newAccount).sortBy('accountName').value();
            _.pull($scope.editedAccounts, account);
            delete $scope.editingCopiesById[account.id];
          });
      };
    }]);
