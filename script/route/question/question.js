angular.module('testy').controller('questionController', [
    '$scope',
    'serverCommunicator',
    function($scope, serverCommunicator) {
      $scope.isLastQuestion = $scope.questionNumber === _.size($scope.questions);
      $scope.question = $scope.questions[$scope.questionNumber - 1];
    }]);
