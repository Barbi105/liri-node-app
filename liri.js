//variable

require('dotenv').config();
var keys = require('./keys.js');
var moment = require('moment');
var axios = require('axios');
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
moment().format()
var command = process.argv[2];
var choice = process.argv.slice(3).join('+');

var queryURL = "https://rest.bandsintown.com/artists/" + choice + "/events?app_id=codingbootcamp";


// concert this
if (command == "concert-this"){
axios.get(queryURL).then(
    function(response){
        var results = response.data;
        for (var i = 0; i < results.length; i++){
        // console.log(response);
        console.log("Venue: " + results[i].venue.name);
        console.log("Location: " + results[i].venue.city +', ' + results[i].venue.country)
        console.log("Date: " + results[i].datetime)
         }
    }
)
}

