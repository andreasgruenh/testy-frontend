angular.module('testy').directive('mcQuestionEditor', function() {
  return {
    restrict: 'E',
    templateUrl: 'template/mcQuestionEditor.tpl.html',
    scope: {
      save: '&',
      question: '=',
    },
    controller: ['$scope', function($scope) {
      $scope.question = _.cloneDeep($scope.question);
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

      $scope.saveQuestion = function() {
        $scope.save({ question: $scope.question}).then(function(savedQuestion) {
          $scope.question = _.cloneDeep(savedQuestion);
        });
      };
    }]
  };
});
