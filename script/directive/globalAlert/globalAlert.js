angular.module('testy').directive('globalalert', function() {
  return {
    restrict: 'E',
    templateUrl: 'template/globalAlert.html',
    scope: {
      text: '=',
      type: '=',
      show: '=',
      caption: '='
    },
    controller: ['$scope', function($scope) {
      $scope.show = false;

      $scope.close = function() {
        $('.global-alert-container').removeClass('in');
      };

      $scope.$watch('show', function(newVal, oldVal) {
        if(newVal === true) {
          $('.global-alert-container').addClass('in');
        }
        if(newVal === false) {
          $('.global-alert-container').removeClass('in');
        }
      });
    }]
  };
});
