angular.module('testy').factory('serverCommunicator', ['$http',
    function($http) {
      var service = {};
      var base = BACKEND_PATH;

      service.getLoggedInUserAsync = function() {
        return $http.get(base + '/accounts/me').then(_.property('data'));
      };

      service.loginAsync = function(username, password) {
        return $http.post(base + '/login?username=' + encodeURIComponent(username) + '&password=' +
          encodeURIComponent(password));
      };

      service.logoutAsync = function() {
        return $http.get(base + '/logout');
      };

      service.getAllAccountsAsync = function() {
        return $http.get(base + '/accounts/').then(_.property('data'));
      };

      service.updateAccountAsync = function(user) {
        return $http.post(base + '/accounts/me', user).then(_.property('data'));
      };

      service.getAllSubjectsAsync = function() {
        return $http.get(base + '/subjects/').then(_.property('data'));
      };

      service.addSubjectAsync = function(subject) {
        return $http.post(base + '/subjects/', subject).then(_.property('data'));
      };

      return service;
    }
    ]);
