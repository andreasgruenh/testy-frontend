angular.module('testy').factory(
        'serverCommunicator',
        [
                '$http',
                function($http) {
                    var service = {};

                    service.turnInTestAsync = function(test) {
                        return $http.post('/api/tests/' + test.id + '/results', test.questions);
                    };
                    return service;
                } ]);
