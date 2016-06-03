angular.module('testy').controller('subjectController', [
    '$scope',
    '$state',
    'serverCommunicator',
    'subject',
    function($scope, $state, serverCommunicator, subject) {
      $scope.subject = subject;

      $scope.saveSubject = function() {
        serverCommunicator.saveSubjectAsync(subject)
          .then(function(savedSubject) {
            $scope.subject = savedSubject;
            $scope.editMode = false;
          });
      };

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
