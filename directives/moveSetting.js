angular.module("ucritic").directive('moveSetting', function($document) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {

        var dragSrc = null;

        function handleDragStart(e) {
          dragSrc = this;
          e.dataTransfer.effectAllowed = 'move';
        }

        function handleDragOver(e) {
          if (e.preventDefault) { e.preventDefault(); }
          e.dataTransfer.dropEffect = 'move';
          return false;
        }

        function handleDragEnter(e) {
          $(this).find(".hover-arrow-left").css("display", "block");
          $(this).find(".hover-arrow-right").css("display", "block");
        }

        function handleDragLeave(e) {
          $(this).find(".hover-arrow-left").css("display", "none");
          $(this).find(".hover-arrow-right").css("display", "none");
        }

        function handleDragEnd(e) {
          $(".hover-arrow-left").css("display", "none");
          $(".hover-arrow-right").css("display", "none");
        }

        function handleDrop(e) {
          if (dragSrc != this) {
            dragSrc.remove();
            this.after(dragSrc);
          }
          return false;
        }

        var items = element.parent().children();
        [].forEach.call(items, function(item) {
          item.addEventListener('dragstart', handleDragStart, false);
          item.addEventListener('dragenter', handleDragEnter, false);
          item.addEventListener('dragover', handleDragOver, false);
          item.addEventListener('dragleave', handleDragLeave, false);
          item.addEventListener('dragend', handleDragEnd, false);
          item.addEventListener('drop', handleDrop, false);
        });

      }
    };
  });
