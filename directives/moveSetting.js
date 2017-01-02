angular.module("ucritic").directive('moveSetting', ['$document' , function($document) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {

        element.bind('mousedown', function($event) {
          $document.bind('mousemove', mousemove);
          $document.bind('mouseup', mouseup);
          return false;
        });

        var y;
        element.on('mousedown', function($event) {
          y = $event.offsetY;
          console.log("init y: " + y);
        });

        function mousemove($event) {
          //var index = element.index();
          var aboveY = y+20;
          var belowY = y-20;
          var list = element.parent();
          if ($event.offsetY >= aboveY) {
            // var temp = list.getElementsByTagName("li")[index].innerHTML;
            // list.getElementsByTagName("li")[index].innerHTML = list.getElementsByTagName("li")[index-1].innerHTML;
            // list.getElementsByTagName("li")[index-1].innerHTML = temp;
            y += 20;
          } else if ($event.offsetY <= belowY) {
            // var temp = list.getElementsByTagName("li")[index].innerHTML;
            // list.getElementsByTagName("li")[index].innerHTML = list.getElementsByTagName("li")[index+1].innerHTML;
            // list.getElementsByTagName("li")[index+1].innerHTML = temp;
            y -= 20;
          }
          console.log("new y: " + y);
          return false;
        }

        function mouseup() {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
      }
    };
  }]);
