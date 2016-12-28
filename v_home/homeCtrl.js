angular.module("ucritic").controller("homeCtrl", function($scope, $compile, homeSvc) {
  $scope.service = homeSvc;
  $scope.viewMovie = true;
  $scope.viewComment = false;
  $scope.$watch('service.getListMovies()', function(newVal) {
    $scope.movies = newVal;
  });
  $scope.$watch('service.getView()', function(newVal) {
    $scope.viewMovie = newVal;
  });
  $scope.toggleView = function(movie) {
    $scope.curMovie = homeSvc.saveMovie(movie);
    homeSvc.toggleView($scope.viewMovie);
  }
  $scope.displayNewComment = function(comment) {
    if (comment === "") {
      $scope.viewComment = false;
    } else {
      $scope.viewComment = true;
    }
  }
  $scope.displayNewReply = function(reply) {
    if (reply === "") {
      $scope.viewReply = false;
    } else {
      $scope.viewReply = true;
    }
  }
  $scope.addComment = function(comment) {
    if (comment !== "") {
      var html = homeSvc.addComment(comment);
      $(".comments").append($compile(html)($scope));
      $scope.userComment = "";
      $scope.viewComment = false;
    }
  }
  $scope.addReply = function(reply, $event) {
    if (reply !== "") {
      var element = angular.element($event.currentTarget).parent().parent();
      var aTag = angular.element($event.currentTarget).parent().parent().parent().children().eq(0).children().eq(1).children().eq(1);
      var html = homeSvc.addReply(reply);
      element.append($compile(html)($scope));
      aTag.css("color", "rgba(255,255,255,0.6)");
      $scope.userReply = "";
      angular.element($event.currentTarget).parent().css("display", "none");
    }
  }
  $scope.minimize = function($event) {
    var state = angular.element($event.currentTarget)[0].innerText;
    var aTag = angular.element($event.currentTarget);
    if (state === "Minimize") {
      angular.element($event.currentTarget)[0].innerText = "Maximize";
      angular.element($event.currentTarget).parent().parent().parent().children().eq(2).css("display", "none");
      aTag.css("color", "var(--ucritic)");
    } else if (state === "Maximize") {
      angular.element($event.currentTarget)[0].innerText = "Minimize";
      angular.element($event.currentTarget).parent().parent().parent().children().eq(2).css("display", "block");
      aTag.css("color", "rgba(255,255,255,0.6)");
    }
  }
  $scope.reply = function($event) {
    var element = angular.element($event.currentTarget).parent().parent().parent().children().eq(2).children().eq(1);
    var aTag = angular.element($event.currentTarget);
    var color = aTag.css("color");
    if (color !== "var(--ucritic)") {
      element.css("display", "block");
      aTag.css("color", "var(--ucritic)");
    } else {
      element.css("display", "none");
      aTag.css("color", "rgba(255,255,255,0.6)");
    }
  }
  $scope.support = function($event) {
    var element = angular.element($event.currentTarget);
    var color = element.css("color");
    if (color !== "var(--ucritic)") {
      element.css("color", "var(--ucritic)");
    } else {
      element.css("color", "rgba(255,255,255,0.6)");
    }
  }
});
