angular.module('testy').controller('testyController', ['$scope', '$timeout', function($scope, $timeout) {

  var timeout = {};

  $scope.globals = {};
  $scope.globalModalFunction = undefined;
  $scope.globalModalText = "";

  $scope.globals.showGlobalModal = function(text, callback) {
    $scope.globalModalText = text;
    $scope.globalModalFunction = callback;
    $('#globalModal').modal();
  };

  $scope.globals.showGlobalAlert = function(type, caption, text) {
    $scope.globalAlertType = type;
    $scope.globalAlertCaption = caption;
    $scope.globalAlertText = text;
    $scope.globalAlertShow = true;
    $timeout.cancel(timeout);
    timeout = $timeout(function(){$scope.globalAlertShow = false;}, 3000);
  };
}]);
