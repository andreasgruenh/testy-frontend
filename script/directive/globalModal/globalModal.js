angular.module('testy').directive('globalmodal', function() {
  return {
    restrict: 'E',
    templateUrl: 'template/globalModal.html',
    scope: {
      text: '=',
      callback: '&'
    },
    controller: ['$scope', function($scope) {
      var modal = $('#globalModal');
      
      $scope.cancel = function() {
      };

      $scope.go = function() {
        modal.one('hidden.bs.modal', function(e) {
          $scope.callback();
        }).modal('hide');
      };
    }]
  };
});
