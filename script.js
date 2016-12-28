// var movies = {};
// var searchTimeout;
//
// $(document).ready(function(e) {
//
//     $("#target").keyup(function() {
//         $(".movie-search").html("<h2>Searching...</h2>");
//         $(".movie-stats").css("display", "none");
//         $("#synopsis").css("display", "none");
//         clearTimeout(searchTimeout);
//         searchTimeout = setTimeout(function () {
//           var search = $("#target").val();
//           var HTML = "";
//           var url = 'http://www.omdbapi.com/?s=*' + search + '*&type=movie';
//           $.ajax({
//               type: 'GET',
//               dataType: 'json',
//               url: url,
//               success: function (a) {
//                   var len = 0;
//                   if (a.Response != "False") {
//                       if (a.Search.length > 10) { len = 10; }
//                       else { len = a.Search.length; }
//                       if (len === 0) { HTML += "<h2>No Results</h2>"; }
//                       for (var i = 0; i < len; i++) {
//                           if (a.Search[i].Poster != "N/A") {
//                             movies[a.Search[i].Title.substring(0,64)] = a.Search[i];
//                             HTML += "<div class=\"movie-option\">";
//                             HTML += "<p>" + a.Search[i].Title + " <br><br> " + a.Search[i].Year + "</p>";
//                             HTML += "<img id=\"x\" src=\"" + a.Search[i].Poster + "\">";
//                             HTML += "</a></div>";
//                           }
//                       }
//                   } else { HTML += "<h2>No Results</h2>"; }
//                   $(".movie-search").html(HTML);
//               }
//           })
//         }, 200);
//     });
//
//     var hamActive = false;
//
//     $("#ham, .ham-lines").on("click", function() {
//       if (hamActive) {
//         $(".inner-ham").animate({
//           marginBottom: "-=252px"
//         }, {
//           duration: 350,
//           specialEasing: {
//             width: "linear",
//             height: "easeOutBounce"
//           }
//         });
//         hamActive = false;
//       } else {
//         $(".inner-ham").animate({
//           marginBottom: "+=252px"
//         }, {
//           duration: 350,
//           specialEasing: {
//             width: "linear",
//             height: "easeOutBounce"
//           }
//         });
//         hamActive = true;
//       }
//     });
//
// });
//
// $(document).on({
//     click: function () {
//         var titleArr = $(this).parent()["0"].innerText.split(" ");
//         titleArr.pop();
//         var title = titleArr.join(" ");
//         var search = movies[title].Title;
//         var url = 'http://www.omdbapi.com/?t=' + search + '&type=movie&tomatoes=true';
//         $.ajax({
//             type: 'GET',
//             dataType: 'json',
//             url: url,
//             success: function (movie) {
//                 $(".movie-stats img").attr("src", movie.Poster);
//                 $("#synopsis").text(movie.Plot);
//                 $("#target").attr("placeholder", movie.Title).val("").focus().blur();;
//                 updateGraph();
//             }
//         })
//     }
// }, "#x");
//
// function updateGraph() {
//
//     var barHeight = 240;
//     var barOrder = [];
//
//     var inspiring = 0.7; var id_inspiring = $("#inspiring-bar");
//     var reWatchability = 0.86; var id_reWatchability = $("#re-watchability-bar");
//     var scary = 0.1; var id_scary = $("#scary-bar");
//     var thinker = 0.95; var id_thinker = $("#thinker-bar");
//     var comedic = 0.22; var id_comedic = $("#comedic-bar");
//     var romantic = 0.55; var id_romantic = $("#romantic-bar");
//     var gory = 0.99; var id_gory = $("#gory-bar");
//     var intense = 0.83; var id_intense = $("#intense-bar");
//
//     for (var i = 1; i <= 8; i++) {
//
//       var percent, element;
//       if (i === 1) { percent = inspiring; element = id_inspiring; }
//       else if (i === 2) { percent = reWatchability; element = id_reWatchability; }
//       else if (i === 3) { percent = scary; element = id_scary; }
//       else if (i === 4) { percent = thinker; element = id_thinker; }
//       else if (i === 5) { percent = comedic; element = id_comedic; }
//       else if (i === 6) { percent = romantic; element = id_romantic; }
//       else if (i === 7) { percent = gory; element = id_gory; }
//       else if (i === 8) { percent = intense; element = id_intense; }
//
//       var title = element.find(".title")[0].innerText;
//       var rating = Math.round(100 * percent);
//       var id_height = barHeight * percent;
//       var leftOver_height = barHeight - id_height;
//
//       var graphBar = element.find(".graph-bar");
//       var leftOver = element.find(".left-over");
//
//       element.find(".rating").text(rating + "%");
//       graphBar.css("height", id_height);
//       leftOver.css("height", leftOver_height);
//
//       if (i === 1) {
//         barOrder.push([element, rating]);
//       } else {
//         for (var j = 0; j < barOrder.length; j++) {
//           if (rating > barOrder[j][1]) {
//             barOrder.splice(j, 0, [element, rating]);
//             break;
//           } else if (j === barOrder.length - 1) {
//             barOrder.push([element, rating]);
//             break;
//           }
//         }
//       }
//
//     }
//
//     var graphSection = $(".graph");
//     var movieSearch = $(".movie-search");
//     graphSection.html("");
//     movieSearch.html("");
//
//     for (var i = 0; i < barOrder.length; i++) {
//       graphSection.append(barOrder[i][0]);
//     }
//
//     $(".movie-stats").css("display", "flex");
//     $("#synopsis").css("display", "flex");
//
//
// }
