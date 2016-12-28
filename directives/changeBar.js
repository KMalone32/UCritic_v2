angular.module("ucritic").directive('changeBar', ['$document' , function($document) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {

        element.bind('mousedown', function($event) {
          $document.bind('mousemove', mousemove);
          $document.bind('mouseup', mouseup);
          return false;
        });

        function mousemove($event) {
          if ($event.offsetY >= 20 && $event.offsetY < 260) {
            var y = $event.offsetY - 20;
            var ele = element.parent();
            var newHeight = 240 - y;
            var percent = Math.round((newHeight / 240) * 100);
            var rating = ele.children().eq(2);
            var left_over = ele.children().eq(3);
            var graph_bar = ele.children().eq(4);
            left_over["0"].style.height = y.toString() + "px";
            graph_bar["0"].style.height = newHeight.toString() + "px";
            rating.text(percent + "%");
          }
          return false;
        }

        function mouseup() {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
      }
    };
  }]);
