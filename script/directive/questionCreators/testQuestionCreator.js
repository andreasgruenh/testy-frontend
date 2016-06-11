angular.module('testy').directive('testQuestionCreator', function() {
  return {
    restrict: 'E',
    templateUrl: 'template/testQuestionCreator.tpl.html',
    scope: {
      add: '&',
    },
    controller: ['$scope', function($scope) {
      console.log('Test');
    }]
  };
});
