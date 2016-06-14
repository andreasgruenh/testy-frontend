angular.module('testy').controller('subjectsController', [
    '$scope',
    '$state',
    'serverCommunicator',
    'subjects',
    function($scope, $state, serverCommunicator, subjects) {

      $scope.subjects = _.sortBy(subjects, 'name');

      $scope.addSubject = function() {
        return serverCommunicator.addSubjectAsync({ name: $scope.subjectName })
          .then(function(addedSubject) {
            $state.go('app.subject', { id: addedSubject.id });
          });
      };

    }]);
