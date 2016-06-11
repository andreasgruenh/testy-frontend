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
    }]);
