angular.module('testy').controller('testyController', ['$scope', function($scope) {

  $scope.globals = {};
  $scope.globalModalFunction = undefined;
  $scope.globalModalText = "";

  $scope.globals.showGlobalModal = function(text, callback) {
    $scope.globalModalText = text;
    $scope.globalModalFunction = callback;
    $('#globalModal').modal();
  };
}]);
