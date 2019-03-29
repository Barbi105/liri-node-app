//install
require('dotenv').config();

var keys = require('./keys.js');
var moment = require('moment');
var axios = require('axios');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var moment = require('moment');

moment().format();

//variables
var command = process.argv[2];
var choice = process.argv.slice(3).join('+');

//main program
if (command == "concert-this") {
    concert();
}
if (command == "spotify-this-song") {
    spotify();
}
if (command == "movie-this") {
    movie();
}
if (command == "do-what-it-says") {
    doIt();
}

//concert-this function
function concert() {
    var queryURL = "https://rest.bandsintown.com/artists/" + choice + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                console.log("Venue: " + results[i].venue.name);
                console.log("Location: " + results[i].venue.city + ', ' + results[i].venue.country)
                console.log("Date: " + (moment(results[i].datetime).format("MM-DD-YYYY")));
                console.log("________________________________")
            }
        })
}
//spotify-this-song function
function spotify() {
    if (!choice) {
        choice = "The Sign";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: choice }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var result = response.tracks.items[0];
            console.log("Song name: " + result.name);
            console.log("Artist: " + result.artists[0].name);
            console.log("Album: " + result.album.name);
            console.log("Preview: " + result.preview_url);
            console.log("________________________________")
        }
    });
}
//movie-this function
function movie() {
    if (!choice) {
        choice = "Mr Nobody";
      }
    var queryURL = "http://www.omdbapi.com/?t=" + choice + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMBD Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("County: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("________________________________")
        })
}
//do-what-it-says function
function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var task = data.split(",");
        command = task[0];
        choice = task[1];
        if (command == "concert-this") {
            concert();
        };
        if (command == "spotify-this-song") {
            spotify();
        };
        if (command == "movie-this") {
            movie();
        };
    });
}