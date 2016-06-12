angular.module('testy').directive('mcQuestionSolver', function() {
  return {
    restrict: 'E',
    templateUrl: 'template/mcQuestionSolver.tpl.html',
    scope: {
      question: '=',
    },
    controller: ['$scope', function($scope) {
    }]
  };
});
