angular.module('testy').controller('questionPoolController', [
    '$q',
    '$scope',
    '$state',
    'serverCommunicator',
    'questionPool',
    function($q, $scope, $state, serverCommunicator, questionPool) {
      $scope.questionPool = questionPool;
      $scope.subject = questionPool.subject;
      recalculateHasNoMaterial();

      $scope.edit = function() {
        $scope.editMode = true;
        $scope.editedQuestionPool = _.cloneDeep($scope.questionPool);
      };

      $scope.cancel = function(event) {
        event.preventDefault();
        $scope.editMode = false;
        $scope.editedQuestionPool = null;
      };

      $scope.save = function() {
        if ($scope.material) {
          serverCommunicator.uploadMaterialForQuestionPool($scope.questionPool.id, $scope.material)
            .then(savePoolAsync);
        } else {
          savePoolAsync();
        }
      };

      $scope.deleteThis = function() {
        $scope.globals.showGlobalModal(
          'Bist du sicher, dass du diesen Fragenpool löschen willst?',
          function() {
            serverCommunicator.deleteQuestionPoolByIdAsync($scope.questionPool.id)
              .then(function() {
                $scope.globals.showGlobalAlert('success', 'Geschafft!', 'Der Fragenpool wurde gelöscht.');
                $state.go('app.subject', {id: $scope.subject.id});
              });
          });
      };

      function savePoolAsync() {
        return serverCommunicator.saveQuestionPoolAsync($scope.editedQuestionPool)
          .then(function(updatedPool) {
            $scope.questionPool = updatedPool;
            $scope.editedQuestionPool = null;
            $scope.editMode = false;
            recalculateHasNoMaterial();
          });
      }

      function recalculateHasNoMaterial() {
        $scope.hasNoMaterial = _.isEmpty($scope.questionPool.documentationFilePath) ||
                               _.isNil($scope.questionPool.documentationFilePath);
      }
    }]);
