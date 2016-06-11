angular.module('testy').directive('mcQuestionCreator', function() {
  return {
    restrict: 'E',
    templateUrl: 'template/mcQuestionCreator.tpl.html',
    scope: {
      add: '&',
    },
    controller: ['$scope', function($scope) {
      $scope.question = {
        questionString: '',
        possibleAnswers: [],
        type: 'MCQuestion',
      };

      $scope.addPossibility = function() {
        $scope.question.possibleAnswers.push({
          text: '',
          correct: false,
        });
      };

      $scope.removePossibility = function(possibility) {
        _.pull($scope.question.possibleAnswers, possibility);
      };

      $scope.isQuestionInvalid = function() {
        if (_.size($scope.question.possibleAnswers) < 2) return true;
        if (_.isEmpty($scope.question.questionString)) return true;
        var somePossibilitiesAreEmpty = _($scope.question.possibleAnswers)
          .map('text')
          .some(_.isEmpty);
        return somePossibilitiesAreEmpty;
      };

      $scope.addQuestion = function() {
        $scope.add({ question: $scope.question}).then(function() {
          $scope.question = {
            questionString: '',
            possibleAnswers: [],
            type: 'MCQuestion',
          };
        });
      };
    }]
  };
});
