angular.module('testy').controller('homeController', ['$scope', function($scope) {

  $scope.showModal = function() {
    $scope.globals.showGlobalModal('MODAL TEST', function(){console.log('Modal shown');});
  };
}]);
