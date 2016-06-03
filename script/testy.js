var app = angular.module('testy', ['ui.router', 'ngSanitize']);

app.run(['$rootScope', '$state', 'serverCommunicator',
    function($rootScope, $state, serverCommunicator) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $('.navbar-collapse').collapse('hide');
    });
}]);
