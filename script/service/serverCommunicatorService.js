angular.module('testy').factory('serverCommunicator', ['$http',
    function($http) {
      var service = {};
      var base = BACKEND_PATH;
      service.getLoggedInUserAsync = function() {
        return $http.get(base + '/accounts/me');
      };

      service.loginAsync = function(username, password) {
        return $http.post(base + '/login?username=' + encodeURIComponent(username) + '&password=' + 
          encodeURIComponent(password));
      };

      service.logoutAsync = function() {
        return $http.get(base + '/logout');
      };
      return service;
    }
    ]);
