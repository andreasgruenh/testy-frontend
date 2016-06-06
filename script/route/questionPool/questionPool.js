angular.module('testy').controller('questionPoolController', [
    '$q',
    '$scope',
    '$state',
    'serverCommunicator',
    'questionPool',
    function($q, $scope, $state, serverCommunicator, questionPool) {
      $scope.questionPool = questionPool;
      $scope.subject = questionPool.subject;
      $scope.hasNoMaterial = _.isEmpty(questionPool.documentationFilePath) ||
                             _.isNil(questionPool.documentationFilePath);

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

      function savePoolAsync() {
        return serverCommunicator.saveQuestionPoolAsync($scope.editedQuestionPool)
          .then(function(updatedPool) {
            $scope.questionPool = updatedPool;
            $scope.editedQuestionPool = null;
            $scope.editMode = false;
          });
      }
    }]);
