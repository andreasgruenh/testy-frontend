angular.module('testy').controller('homeController',
    ['$scope', '$state', function($scope, $state) {

  $scope.showModal = function() {
    $scope.globals.showGlobalModal('MODAL TEST', function(){console.log('Modal shown');});
  };
}]);
