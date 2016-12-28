angular.module("ucritic").service("homeSvc", function($http) {

  var currentMovie;
  var listMovies = [];
  var currentView = true;

  this.getMovies = function(movie) {
    currentView = true;
    $http ({
      method: 'GET',
      url: 'http://www.omdbapi.com/?s=*' + movie + '*&type=movie'
    }).then(function(omdbapi) {
      if (omdbapi.data.Response !== "False") {
        var movies = omdbapi.data.Search;
        var nMovies = [];
        for (var i = 0; i < movies.length; i++) {
          if (movies[i].Poster != "N/A") {
            nMovies.push(movies[i]);
          }
        }
        listMovies = nMovies;
      }
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  this.saveMovie = function(movie) {
    currentMovie = movie;
    $http ({
      method: 'GET',
      url: 'http://www.omdbapi.com/?t=' + movie.Title + '&type=movie&tomatoes=true'
    }).then(function(omdbapi) {
      $("#synopsis").text(omdbapi.data.Plot);
      $("#target").attr("placeholder", movie.Title).val("").focus().blur();
      updateGraph();
    });
    return currentMovie;
  }

  this.getMovie = function() {
    return currentMovie;
  }

  this.getListMovies = function() {
    return listMovies;
  }

  this.getView = function() {
    return currentView;
  }

  this.toggleView = function(view) {
    currentView = !view;
  }

  this.addComment = function(comment) {
    var html =
      '<div id="newComment" class="comment">' +
      '<div class="commentInfo">' +
      '<span class="infoLeft"><a id="your-profile">Profile_Name</a></span>' +
      '<span class="infoRight"><a id="your-profile" ng-click="support($event)">Support</a> | <a ng-click="reply($event)">Reply</a> | <a ng-click="minimize($event)">Minimize</a></span>' +
      '</div><br><div class="commentContent"><p>' +
      comment +
      '</p>' +
      '<div class="reply">' +
      '<textarea ng-change="displayNewReply(userReply)" ng-model="userReply" type="text" placeholder="type your reply here..."></textarea>' +
      '<button ng-click="addReply(userReply, $event)">+</button>' +
      '</div>' +
      '</div></div>';
    return html;
  }

  this.addReply = function(reply) {
    var html =
      '<div id="newReply" class="subComment">' +
      '<div class="commentInfo">' +
      '<span class="infoLeft"><a id="your-profile">Profile_Name</a></span>' +
      '<span class="infoRight"><a id="your-profile" ng-click="support($event)">Support</a> | <a ng-click="reply($event)">Reply</a> | <a ng-click="minimize($event)">Minimize</a></span>' +
      '</div><br><div class="commentContent"><p>' +
      reply +
      '</p>' +
      '<div class="reply">' +
      '<textarea ng-change="displayNewReply(userReply)" ng-model="userReply" type="text" placeholder="type your reply here..."></textarea>' +
      '<button ng-click="addReply(userReply, $event)">+</button>' +
      '</div>' +
      '</div></div>';
    return html;
  }

});

function updateGraph() {

    var barHeight = 240;
    var barOrder = [];

    var inspiring = 0.7; var id_inspiring = $("#inspiring-bar");
    var reWatchability = 0.86; var id_reWatchability = $("#re-watchability-bar");
    var scary = 0.1; var id_scary = $("#scary-bar");
    var thinker = 0.95; var id_thinker = $("#thinker-bar");
    var comedic = 0.22; var id_comedic = $("#comedic-bar");
    var romantic = 0.55; var id_romantic = $("#romantic-bar");
    var gory = 0.99; var id_gory = $("#gory-bar");
    var intense = 0.83; var id_intense = $("#intense-bar");

    for (var i = 1; i <= 8; i++) {

      var percent, element;
      if (i === 1) { percent = inspiring; element = id_inspiring; }
      else if (i === 2) { percent = reWatchability; element = id_reWatchability; }
      else if (i === 3) { percent = scary; element = id_scary; }
      else if (i === 4) { percent = thinker; element = id_thinker; }
      else if (i === 5) { percent = comedic; element = id_comedic; }
      else if (i === 6) { percent = romantic; element = id_romantic; }
      else if (i === 7) { percent = gory; element = id_gory; }
      else if (i === 8) { percent = intense; element = id_intense; }

      var title = element.find(".title")[0].innerText;
      var rating = Math.round(100 * percent);
      var id_height = barHeight * percent;
      var leftOver_height = barHeight - id_height;

      var graphBar = element.find(".graph-bar");
      var leftOver = element.find(".left-over");

      element.find(".rating").text(rating + "%");
      graphBar.css("height", id_height);
      leftOver.css("height", leftOver_height);

      if (i === 1) {
        barOrder.push([element, rating]);
      } else {
        for (var j = 0; j < barOrder.length; j++) {
          if (rating > barOrder[j][1]) {
            barOrder.splice(j, 0, [element, rating]);
            break;
          } else if (j === barOrder.length - 1) {
            barOrder.push([element, rating]);
            break;
          }
        }
      }

    }

    var graphSection = $(".graph");

    for (var i = 0; i < barOrder.length; i++) {
      graphSection.append(barOrder[i][0]);
    }

    $(".movie-stats").css("display", "flex");
    $("#synopsis").css("display", "flex");


}
