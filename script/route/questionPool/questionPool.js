angular.module('testy').controller('questionPoolController', [
    '$q',
    '$scope',
    '$state',
    'serverCommunicator',
    'questionPool',
    'categories',
    function($q, $scope, $state, serverCommunicator, questionPool, categories) {
      $scope.questionPool = questionPool;
      $scope.subject = questionPool.subject;
      $scope.categories = _.sortBy(categories, 'name');
      $scope.results = questionPool.results;
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
          return serverCommunicator.uploadMaterialForQuestionPool($scope.questionPool.id, $scope.material)
            .then(savePoolAsync);
        } else {
          return savePoolAsync();
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

      $scope.addCategory = function() {
        var newCategory = {
          name: $scope.categoryName,
          maxScore: $scope.questionCount * 10,
        };
        return serverCommunicator.addCategoryToPoolAsync(newCategory, $scope.questionPool.id)
          .then(function(addedCategory) {
            $scope.categories = _.sortBy($scope.categories.concat([addedCategory]), 'name');
          });
      };

      $scope.getTimeForTimestamp = function(timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = _.padStart(date.getMonth() + 1, 2, '0');
        var day = _.padStart(date.getDate(), 2, '0');
        var hours = _.padStart(date.getHours(), 2, '0');
        var mins = _.padStart(date.getMinutes(), 2, '0');
        return day + '.' + month + '.' + year + ' - ' + hours + ':' + mins + ' Uhr';
      };

      $scope.deleteResult = function(result) {
        $scope.globals.showGlobalModal(
          'Bist du sicher, dass du dieses Ergebnis löschen willst? Der Nutzer wird daraufhin nicht' +
          'mehr informiert, wenn er den Test wiederholen muss',
          function() {
            return serverCommunicator.deleteTestResultAsync(result).then(function() {
              _.pull($scope.results, result);
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
