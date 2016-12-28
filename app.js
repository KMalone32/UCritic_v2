angular.module("ucritic", ["ui.router"]).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    templateUrl: 'v_home/home.html',
    url: '/',
    controller: 'homeCtrl'
  })
  .state('blog', {
    templateUrl: 'v_blog/blog.html',
    url: '/blog',
    controller: 'blogCtrl'
  })
  .state('profile', {
    templateUrl: 'v_profile/profile.html',
    url: '/profile',
    controller: 'profileCtrl'
  })
  .state('theater', {
    templateUrl: 'v_theater/theater.html',
    url: '/theater',
    controller: 'theaterCtrl'
  });

});
