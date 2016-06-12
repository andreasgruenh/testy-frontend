angular.module('testy').controller('categoryController', [
    '$q',
    '$scope',
    '$state',
    'serverCommunicator',
    'category',
    'questions',
    function($q, $scope, $state, serverCommunicator, category, questions) {
      $scope.category = category;
      $scope.questions = _.sortBy(questions, 'id');
      $scope.questionType = 'mc';

      $scope.addQuestion = function(question) {
        return serverCommunicator.addQuestionAsync($scope.category.id, question)
          .then(function(createdQuestion) {
            $scope.questions = _.sortBy($scope.questions.concat([createdQuestion]), 'id');
          });
      };

      $scope.deleteQuestion = function(event, question) {
        event.stopPropagation();
        $scope.globals.showGlobalModal(
          'Bist du dir sicher, dass du diese Frage löschen möchtest?',
          function() {
            serverCommunicator.deleteQuestionAsync(question).then(function() {
              _.pull($scope.questions, question);
            });
          }
        );
      };

      $scope.editCategory = function() {
        $scope.editMode = true;
        $scope.categoryQuestionCount = $scope.category.maxScore / 10;
      };

      $scope.cancelEditing = function() {
        $scope.editMode = false;
      };

      $scope.saveCategory = function() {
        var newCat = _.pick($scope.category, 'maxScore', 'name', 'id');
        newCat.maxScore = $scope.categoryQuestionCount * 10;
        serverCommunicator.updateCategoryAsync(newCat).then(function(savedCategory) {
          $scope.category = savedCategory;
          $scope.editMode = false;
        });
      };

      $scope.updateQuestion = function(question) {
        return serverCommunicator.updateQuestionAsync(question).then(function(updatedQuestion) {
          console.log(question, updatedQuestion);
          $scope.questions = _.reject($scope.questions, ['id', question.id]);
          $scope.questions = _.sortBy($scope.questions.concat([updatedQuestion]), 'id');
          return updatedQuestion;
        });
      };


    }]);
