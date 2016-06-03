angular.module('testy').controller('subjectController', [
    '$scope',
    '$state',
    'serverCommunicator',
    'subject',
    function($scope, $state, serverCommunicator, subject) {
      $scope.subject = subject;

      $scope.deleteThis = function() {
        $scope.globals.showGlobalModal(
          'Bist du sicher, dass du dieses Fach löschen willst?' +
            ' Alle Tests und Fragen werden dabei gelöscht!',
          function() {
            serverCommunicator.deleteSubjectByIdAsync($scope.subject.id)
              .then(function() {
                $scope.globals.showGlobalAlert('success', 'Geschafft!', 'Das Fach wurde gelöscht.');
                $state.go('app.subjects');
              });
          });
      };
    }]);
