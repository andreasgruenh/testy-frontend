angular.module('testy').factory('serverCommunicator', ['$http',
    function($http) {
      var service = {};
      var base = BACKEND_PATH;

      service.getLoggedInUserAsync = function() {
        return $http.get(base + '/accounts/me').then(_.property('data'));
      };

      service.loginAsync = function(username, password) {
        return $http({
          method: 'POST',
          url: base + '/login',
          data: $.param({username: username, password: password }),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
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

      service.updateOtherAccountAsync = function(account) {
        return $http.post(base + '/accounts/' + account.id, account).then(_.property('data'));
      };

      service.getAllSubjectsAsync = function() {
        return $http.get(base + '/subjects/').then(_.property('data'));
      };

      service.addSubjectAsync = function(subject) {
        return $http.post(base + '/subjects/', subject).then(_.property('data'));
      };

      service.getSubjectByIdAsync = function(id) {
        return $http.get(base + '/subjects/' + id).then(_.property('data'));
      };

      service.deleteSubjectByIdAsync = function(id) {
        return $http.delete(base + '/subjects/' + id);
      };

      service.saveSubjectAsync = function(subject) {
        return $http.patch(base + '/subjects/' + subject.id, subject).then(_.property('data'));
      };

      service.getQuestionPoolsForSubjectIdAsync = function(id) {
        return $http.get(base + '/subjects/' + id + '/pools').then(_.property('data'));
      };

      service.addQuestionPoolAsync = function(id, pool) {
        return $http.post(base + '/subjects/' + id + '/pools', pool).then(_.property('data'));
      };

      return service;
    }
    ]);
