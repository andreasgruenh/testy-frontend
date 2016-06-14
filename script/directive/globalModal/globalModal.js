angular.module('testy').directive('globalmodal', function() {
  return {
    restrict: 'E',
    templateUrl: 'template/globalModal.html',
    scope: {
      text: '=',
      callback: '&'
    },
    controller: ['$scope', '$q', function($scope, $q) {
      var modal = $('#globalModal');

      $scope.cancel = function() {
        closeMe();
      };

      $scope.go = function() {
        $scope.disabled = true;
        var def = $q.defer();
        var maybePromise = $scope.callback();
        if (_.get(maybePromise, 'then')) {
          maybePromise.then(function() {
            def.resolve();
            closeMe();
          }).catch(function() {
            def.reject();
            closeMe();
          });
        }
        else {
          def.resolve();
          closeMe();
        }
        return def.promise;
      };

      function closeMe() {
        modal.modal('hide');
        $scope.disabled = false;
      }
    }]
  };
});
