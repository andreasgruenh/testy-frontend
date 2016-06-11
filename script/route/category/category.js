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
            $scope.questions = _.sortBy(questions.concat([createdQuestion]), 'id');
          });
      };
    }]);
