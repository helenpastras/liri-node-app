require("dotenv").config();
var stuffINeed = require("./keys.js")
var request = require("request");
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var operator = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");
console.log("hi");


if(operator === "movie-this"){
    movie();
}
else if(operator === "my-tweets"){
  myTweets();

function myTweets() {
    var divider = "\n-------------------------------";
// //     this.loadTweets = function (tweets) {
    // var URL = "https://api.twitter.com/1.1/search/tweets.json?q="+ tweetSearch + "%20new%20premium
        request(client, function (error, response, body) {
            if (error) {
                console.log(error);
                return
            };
        
            var jsonData = JSON.parse(body);
            var tweetData = [
                "user: " + jsonData.user.name,
                "Tweet: " + jsonData.text,
                "Posted On: " + jsonData.created_at,
            ].join("\n\n");

            fs.appendFile("log.txt", tweetData + divider, function (error) {
                if (error) throw error;
                console.log(tweetData);
            });
        })
    };
// }

// * `spotify-this-song`

// // node liri.js spotify-this-song '<song name here>'
// var songSearch = process.argv.slice(3).join(" ");
// console.log(songSearch);


// * `movie-this`
function movie() {
    var divider = "\n-------------------------------";

        var URL = "http://www.omdbapi.com/?t=" + searchTerm + "&apikey=d41a7cfc";

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
                return
            };
            var jsonData = JSON.parse(body);

            console.log(jsonData, null, 2);

            var movieData = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB Rating: " + jsonData.Ratings[0].Source.Value,
                "Rotten Tomatoes Rating: " + 'no rating' || jsonData.Ratings[1].Source.Value,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n\n");

            fs.appendFile("log.txt", movieData + divider, function (error) {
                if (error) throw error;
                console.log(movieData);
            });
        });
};
}
// * `do-what-it-says`
