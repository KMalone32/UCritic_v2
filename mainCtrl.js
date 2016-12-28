angular.module("ucritic").controller("mainCtrl", function($scope, $location, homeSvc) {
  $scope.searchMovie = function(movie) {
    homeSvc.getMovies(movie);
    $location.path('home');
  }
});
