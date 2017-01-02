angular.module("ucritic").directive('removeSavedTheater', function($document) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      element.on('click', function() {
        element.parent().remove();
      });
    }
  }
});
