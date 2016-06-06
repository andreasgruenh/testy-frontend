angular.module('testy').controller('subjectController', [
    '$scope',
    '$state',
    'serverCommunicator',
    'questionPools',
    'subject',
    function($scope, $state, serverCommunicator, questionPools, subject) {
      $scope.subject = subject;
      $scope.questionPools = _.sortBy(questionPools, 'name');

      $scope.addQuestionPool = function() {
        serverCommunicator.addQuestionPoolAsync($scope.subject.id, { name: $scope.poolName })
          .then(function(newPool) {
            $scope.questionPools.push(newPool);
          });
      };

      $scope.saveSubject = function() {
        serverCommunicator.saveSubjectAsync($scope.editedSubject)
          .then(function(savedSubject) {
            $scope.subject = savedSubject;
            $scope.editMode = false;
            $scope.editedSubject = null;
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

      $scope.edit = function() {
        $scope.editMode = true;
        $scope.editedSubject = _.cloneDeep($scope.subject);
      };

      $scope.cancel = function() {
        $scope.editMode = false;
        $scope.editedSubject = null;
      };
    }]);
