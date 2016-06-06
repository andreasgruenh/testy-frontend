angular.module('testy').directive('testyFileModel',
    function() {
      return {
        restrict : 'A',
        scope: false,
        link: function(scope, element, attributes) {
          element.on('change', handleFileChange);
          scope.$on('$destroy', cleanUp);

          function handleFileChange() {
            scope[attributes.testyFileModel] = element[0].files[0];
            scope.$apply();
          }
          function cleanUp() {
            element.off('change', handleFileChange);
          }
        }
      };
  });
