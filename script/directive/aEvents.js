var eventNames = ['click', 'submit'];

_.forEach(eventNames, function(eventName) {
  var dirName = 'a' + _.capitalize(eventName);
  angular.module('testy').directive(dirName,
      ['$rootScope', '$parse', '$q', function($rootScope, $parse, $q) {
        return {
          restrict : 'A',
          scope: false,
          link: function(scope, element, attributes) {
            scope.$on('$destroy', cleanUp);
            element.on(eventName, handleEvent);
            var fn = $parse(attributes[dirName]);

            var disabled = false;

            function handleEvent(event) {
              event.preventDefault();
              if (disabled) return;
              disable();
              var maybePromise;
              var callback = function() {
                maybePromise = fn(scope, {$event:event});
              };
              if ($rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
              if (_.get(maybePromise, 'then')) {
                $rootScope.$apply(function() {
                  $rootScope.globals.showSpinner();
                });
                maybePromise.then(enable).catch(thruEnable);
              } else {
                enable();
              }
            }

            function thruEnable(o) {
              enable();
              return $q.reject(o);
            }

            function cleanUp() {
              element.off('click', handleEvent);
            }

            function enable() {
              if (_.get($rootScope, 'globals.hideSpinner')) $rootScope.globals.hideSpinner();
              disabled = false;
              element.prop('disabled', false);
            }

            function disable() {
              disabled = true;
              element.prop('disabled', true);
            }
          }
        };
    }]);
});
