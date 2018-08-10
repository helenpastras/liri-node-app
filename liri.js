require("dotenv").config();
var keys = require("./keys.js")
var request = require("request");
var fs = require("fs");
var Twitter = require('twitter');

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
}
else if(operator === "spotify-this-song"){
    spotify();
}
else if(operator === "do-what-it-says"){
    spotify();
}

function myTweets() {
    var divider = "\n-------------------------------";
        var params = {screen_name: 'Helen20606361'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
            // typeof(tweets);
            // console.log(tweets, null, 2);
            // var jsonData = JSON.parse(tweets);
            for(var i = 0; i < tweets.length; i++){
            var tweetData = [
                "user: " + tweets[i].user.name,
                "Tweet: " + tweets[i].text,
                "Posted On: " + tweets[i].created_at,
            ].join("\n\n");
                console.log(tweetData);
            fs.appendFile("log.txt", tweetData + divider, function (error) {
                if (error) throw error;
                console.log(tweetData);
            });
        }
    });
};

// * FInd songs on Spo
function spotify() {
    var divider = "\n-------------------------------";

}
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

// * `do-what-it-says`
// var callSpotify
