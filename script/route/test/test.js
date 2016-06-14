angular.module('testy').controller('testController', [
    '$scope',
    '$state',
    'serverCommunicator',
    'test',
    'questionPool',
    function($scope, $state, serverCommunicator, test, questionPool) {
      $scope.$on('$destroy', cleanUp);
      $scope.testId = $state.params.id;
      $scope.questionNumber = parseInt($state.params.number, 10);
      $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
        $scope.testId = toParams.id;
        $scope.questionNumber = parseInt(toParams.number, 10);
        $scope.isOnStartPage = toState.name === 'app.test';
      });
      $scope.test = test;
      $scope.questionPool = questionPool;
      $scope.questions = _.flatMap(test, 'questions');
      var tenMinutes = 10 * 60 * 1000;
      $scope.logginRefreshInterval = setInterval(function() {
        serverCommunicator.getLoggedInUserAsync();
      }, tenMinutes);
      window.onbeforeunload = sure;

      $scope.sendTest = function(questions) {
        return serverCommunicator.sendTestAsync(
          $scope.questionPool.id,
          _.map(questions, transformQuestionToAnswer)
        ).then(function(result) {
          $scope.finished = true;
          $state.go('app.test');
          $scope.result = result;
          $scope.passed = result.score >= $scope.questionPool.percentageToPass;
        });
      };

      function transformQuestionToAnswer(question) {
        return {
          type: question.type.replace('Question', 'Answer'),
          question: _.pick(question, 'id', 'type', 'questionString'),
          checkedPossibilities: _(question.possibleAnswers).filter('correct').map(removeCorrect).value(),
          uncheckedPossibilities: _(question.possibleAnswers).reject('correct').map(removeCorrect).value(),
        };
      }

      function removeCorrect(object) {
        return _.omit(object, 'correct');
      }

      function sure() {
        return 'Are you sure you want to exit? Your progress will be lost!';
      }

      function cleanUp() {
        clearInterval($scope.logginRefreshInterval);
        window.onbeforeunload = null;
      }
    }]);
