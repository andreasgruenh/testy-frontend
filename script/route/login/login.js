angular.module('testy').controller('loginController',
    ['$scope', '$state', 'serverCommunicator', function($scope, $state, serverCommunicator){

  var loginSent = false;
  $scope.login = function() {
    if (loginSent) return;
    serverCommunicator.loginAsync($scope.username, $scope.password).then(
      function(data){
        $state.go('app.home');
      }, function(data){
        if(data.status == 401) {
          $scope.globals.showGlobalAlert('danger', 'Ups!', 'Dein Passwort oder Nutzername war leider falsch');
        } else if(data.status == 503) {
          $scope.globals.showGlobalAlert(
            'danger',
            'Sorry!',
            'Das Backend ist leider gerade nicht erreichbar. Melde dich doch bei <a href="mailto:it@paul-consultants.de">it@paul-consultants.de</a>');
        }
        loginSent = false;
      });
    loginSent = true;
  };
}]);
