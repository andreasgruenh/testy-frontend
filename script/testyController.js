angular.module('testy').controller('testyController', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout) {

  var timeout = {};

  $rootScope.globals = {};
  $rootScope.globalModalFunction = undefined;
  $rootScope.globalModalText = "";

  $rootScope.globals.showGlobalModal = function(text, callback) {
    $scope.globalModalText = text;
    $scope.globalModalFunction = callback;
    $('#globalModal').modal();
  };

  $rootScope.globals.showGlobalAlert = function(type, caption, text) {
    $scope.globalAlertType = type;
    $scope.globalAlertCaption = caption;
    $scope.globalAlertText = text;
    $scope.globalAlertShow = true;
    $timeout.cancel(timeout);
    timeout = $timeout(function(){$scope.globalAlertShow = false;}, 3000);
  };
}]);
