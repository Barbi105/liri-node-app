//install
require('dotenv').config();

var keys = require('./keys.js');
var moment = require('moment');
var axios = require('axios');
var Spotify = require('node-spotify-api');

moment().format();

//variables
var command = process.argv[2];
var choice = process.argv.slice(3).join('+');

// concert this
if (command == "concert-this") {
    var queryURL = "https://rest.bandsintown.com/artists/" + choice + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                // console.log(response);
                console.log("Venue: " + results[i].venue.name);
                console.log("Location: " + results[i].venue.city + ', ' + results[i].venue.country)
                // store date in a variable and use moments format(MM/DD/YYYY) and display that
                console.log("Date: " + results[i].datetime)
                console.log("________________________________")
            }
        }
    )
}

//spotify-this
if (command == "spotify-this-song") {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: choice }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var result = response.tracks.items[0];
            console.log("Song name: " + result.album.name);
            console.log("Artist: " + result.artists[0].name);
            console.log("Album: " + result.album.album_type);
            console.log("Preview: " + result.preview_url);
        }
    })
}

//movie-this
if (command == "movie-this") {
    var queryURL = "http://www.omdbapi.com/?t=" + choice + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function(response){
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMBD Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("County: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
}

