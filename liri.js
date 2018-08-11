require("dotenv").config();
var keys = require("./keys.js")
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var operator = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");
console.log("hi");


if (operator === "movie-this") {
    movie();
}
else if (operator === "my-tweets") {
    myTweets();
}
else if (operator === "spotify-this-song") {
    console.log('hiii')
    spotif(searchTerm);
}
else if (operator === "do-what-it-says") {
    doWhat();
}

function myTweets() {
    var divider = "\n-------------------------------";
    var params = { screen_name: 'Helen20606361' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        // typeof(tweets);
        // console.log(tweets, null, 2);
        // var jsonData = JSON.parse(tweets);
        for (var i = 0; i < tweets.length; i++) {
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

// * Find songs on Spotify
function spotif(searchTerm) {
    var divider = "\n-------------------------------";
        console.log(searchTerm);

    if (!searchTerm) {
        searchTerm = "The Sign";
        console.log("The Sign by Ace of Base");
    }
        
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log("spotify works");
        var spotifyData = [
            "Artist(s): " + JSON.stringify(data.tracks.items[0].artists[0].name),
            "The song's name: " + JSON.stringify(data.tracks.items[0].name),
            "A preview link of the song from Spotify: " + JSON.stringify(data.tracks.items[0].preview_url),
            "Album: " + JSON.stringify(data.tracks.items[0].album.name)
        ].join("\n\n");
        console.log(spotifyData);
        fs.appendFile("log.txt", spotifyData + divider, function (error) {
            if (error) throw error;
            // console.log(spotifyData);
        });
    });    
};

// * `movie-this`
function movie() {
    var divider = "\n-------------------------------";

    var URL = "http://www.omdbapi.com/?t=" + searchTerm + "&apikey=d41a7cfc";

    request(URL, function (error, response, body) {
        if (error) {
            console.log(error);
            return
        }
        else if (!searchTerm) {
            searchTerm = "Mr. Nobody";
            console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>. It's on Netflix!");
        }
        
        var jsonData = JSON.parse(body);
        
        console.log(body, null, 2);

        var movieData = [
            "Title: " + jsonData.Title,
            "Year: " + jsonData.Year,
            // "IMDB Rating: " + body.Ratings.Source.Value,
            "IMDB Rating: " + jsonData.imdbRating,
            // "Rotten Tomatoes Rating: " + 'no rating' || body.Ratings[1].Source.Value,
            "Rotten Tomatoes Rating: " + jsonData.tomatoRating,
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
function doWhat() {

    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(data);
        var song = data.split(',')[1];
        // console.log(data.split(',')[1]);

        spotif(song);

        })
        // .then(function(callback){
        //     var action = answer;
        //     console.log(action);
        //     callback();
        // });
        // spotify(action);
};
