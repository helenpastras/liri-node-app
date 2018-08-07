require("dotenv").config();
var stuffINeed = require("./keys.js")
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// * `my-tweets`
var search = process.argv[2];
console.log(search);
var tweetSearch = process.argv.slice(3).join(" ");
console.log(tweetSearch);
// // var MyTweets = function () {
// //     var divider = "\n-------------------------------";
// //     this.loadTweets = function (tweets) {
// //         request(client, function (error, response, body) {
// //             if (error) {
// //                 console.log(error);
// //                 return
// //             };
// //             var jsonData = JSON.parse(body);
// //             var showData = [
// //                 "Show: " + jsonData.name,
// //                 "Genre: " + jsonData.genres.join(", "),
// //                 "Rating: " + jsonData.rating.average,
// //                 "Network: " + jsonData.network.name,
// //                 "Summary: " + jsonData.summary
// //             ].join("\n\n");

// //             fs.appendFile("log.txt", showData + divider, function (error) {
// //                 if (error) throw error;
// //                 console.log(showData);
// //             });
// //         });
// //     };
// }

// * `spotify-this-song`

// node liri.js spotify-this-song '<song name here>'
var search = process.argv[2];
console.log(search);
var songSearch = process.argv.slice(3).join(" ");
console.log(songSearch);


// * `movie-this`
var search = process.argv[2];
console.log(search);
var movieSearch = process.argv.slice(3).join(" ");
console.log(movieSearch)
var Movie = function () {
    var divider = "\n-------------------------------";
    this.findMovie = function (show) {

        var URL = "http://www.omdbapi.com/?i=tt3896198&apikey=d41a7cfc" + show;

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
                return
            };
            var jsonData = JSON.parse(body);

            var movieData = [
                "Title: " + jsonData.title,
                "Year: " + jsonData.year,
                "IMDB Rating: " + jsonData.ratings.source[0].value,
                "Rotten Tomatoes Rating: " + jsonData.ratings.source[1].value,
                "Country: " + jsonData.country,
                "Language: " + jsonData.language,
                "Plot: " + jsonData.plot,
                "Actors: " + jsonData.actors.join(", ")
            ].join("\n\n");

            fs.appendFile("log.txt", movieData + divider, function (error) {
                if (error) throw error;
                console.log(movieData);
            });
        });
    }
};
var search = process.argv[2];

// * `do-what-it-says`
