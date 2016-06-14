angular.module('testy').factory('serverCommunicator', ['$state', '$http', '$rootScope', '$q',
    function($state, $http, $rootScope, $q) {
      var service = {};
      var base = BACKEND_PATH;

      function showRequestError(err) {
        if(!$rootScope.globals) return $q.reject(err);
        if (_.includes([404, 403], err.status)) return $q.reject(err);
        $rootScope.globals.showGlobalAlert('danger', 'Ups',
          'Da ist wohl etwas schiefgelaufen! Falls dich die Details interessieren, öffne die ' +
          'Entwicklerkonsole (normalerweise F12) und sieh dir die Fehlermeldung an.');
        console.error(err);
        return $q.reject(err);
      }

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
        return $http.get(base + '/logout').catch(showRequestError);
      };

      service.getAllAccountsAsync = function() {
        return $http.get(base + '/accounts/').then(_.property('data')).catch(showRequestError);
      };

      service.updateAccountAsync = function(user) {
        return $http.post(base + '/accounts/me', user).then(_.property('data'))
          .catch(showRequestError);
      };

      service.updateOtherAccountAsync = function(account) {
        return $http.post(base + '/accounts/' + account.id, account).then(_.property('data'))
          .catch(showRequestError);
      };

      service.getAllSubjectsAsync = function() {
        return $http.get(base + '/subjects/').then(_.property('data')).catch(showRequestError);
      };

      service.addSubjectAsync = function(subject) {
        return $http.post(base + '/subjects/', subject).then(_.property('data'))
          .catch(showRequestError);
      };

      service.getSubjectByIdAsync = function(id) {
        return $http.get(base + '/subjects/' + id).then(_.property('data')).catch(showRequestError);
      };

      service.deleteSubjectByIdAsync = function(id) {
        return $http.delete(base + '/subjects/' + id).catch(showRequestError);
      };

      service.saveSubjectAsync = function(subject) {
        return $http.patch(base + '/subjects/' + subject.id, subject).then(_.property('data'))
          .catch(showRequestError);
      };

      service.getQuestionPoolsForSubjectIdAsync = function(id) {
        return $http.get(base + '/subjects/' + id + '/pools').then(_.property('data'))
          .catch(showRequestError);
      };

      service.getQuestionPoolByIdAsync = function(id) {
        return $http.get(base + '/pools/' + id).then(_.property('data')).catch(showRequestError);
      };

      service.getCategoriesOfPoolAsync = function(id) {
        return $http.get(base + '/pools/' + id + '/categories').then(_.property('data'))
          .catch(showRequestError);
      };

      service.addQuestionPoolAsync = function(subjectId, pool) {
        return $http.post(base + '/subjects/' + subjectId + '/pools', pool).then(_.property('data'))
          .catch(showRequestError);
      };

      service.uploadMaterialForQuestionPool = function(id, file) {
        var formData = new FormData();
        formData.append('file', file);
        return $http.post(base + '/pools/' + id + '/material', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).catch(showRequestError);
      };

      service.saveQuestionPoolAsync = function(questionPool) {
        return $http.patch(base + '/pools/' + questionPool.id, questionPool)
          .then(_.property('data')).catch(showRequestError);
      };

      service.deleteQuestionPoolByIdAsync = function(id) {
        return $http.delete(base + '/pools/' + id).catch(showRequestError);
      };

      service.addCategoryToPoolAsync = function(category, questionPoolId) {
        return $http.post(base + '/pools/' + questionPoolId + '/categories', category)
          .then(_.property('data')).catch(showRequestError);
      };

      service.getCategoryByIdAsync = function(id) {
        return $http.get(base + '/categories/' + id).then(_.property('data')).catch(showRequestError);
      };

      service.getQuestionsForCategoryAsync = function(categoryId) {
        return $http.get(base + '/categories/' + categoryId + '/questions').then(_.property('data'))
          .catch(showRequestError);
      };

      service.addQuestionAsync = function(categoryId, question) {
        return $http.post(base + '/categories/' + categoryId + '/questions', question)
          .then(_.property('data')).catch(showRequestError);
      };

      service.deleteQuestionAsync = function(question) {
        return $http.delete(base + '/questions/' + question.id).catch(showRequestError);
      };

      service.updateQuestionAsync = function(question) {
        var cleanedQuestion = _.omit(question, 'id', 'category', 'maxScore');
        cleanedQuestion.possibleAnswers = _.map(cleanedQuestion.possibleAnswers, function(answer) {
          return _.omit(answer, 'id');
        });
        return $http.patch(base + '/questions/' + question.id, cleanedQuestion)
          .then(_.property('data')).catch(showRequestError);
      };

      service.updateCategoryAsync = function(category) {
        return $http.patch(base + '/categories/' + category.id, category)
          .then(_.property('data')).catch(showRequestError);
      };

      service.getTestForQuestionPoolAsync = function(questionPoolId) {
        return $http.get(base + '/pools/' + questionPoolId + '/test').then(_.property('data'))
          .catch(showRequestError);
      };

      service.sendTestAsync = function(questionPoolId, answers) {
        return $http.post(base + '/pools/' + questionPoolId + '/test', answers)
          .then(_.property('data')).catch(showRequestError);
      };

      service.deleteTestResultAsync = function(testResult) {
        return $http.delete(base + '/test-results/' + testResult.id).catch(showRequestError);
      };

      return service;
    }
    ]);
