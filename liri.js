// WELCOME TO LIRI --------------------------------------------

// Global Variables Varibles ----------------------------------

var request = require("request");
var liriCommand = process.argv[2];
var liriArgument = process.argv[3];
var inputFile = "";
var data = "";

var artistName = "";
var albumName = "";
var songName = "";
var preViewURL = "";
var noMatchAceofBaseSW = "N";
console.log("");
console.log("");
console.log("");
console.log("");
console.log("----------LIRI COMMAND INPUT ------------");
console.log("Liri Command              " + liriCommand);
console.log("Liri Argument             " + liriArgument);
console.log("---------END LIRI COMMAND INPUT ---------");
console.log("");
console.log("");
console.log("");
console.log("");
// ------------------- FUNCTIONS -------------------------

// SPOTIFY LOGIC -----------------------------------------

function findSpotifySong ()  {

    request("https://api.spotify.com/v1/search?q=" + liriArgument + "&type=track&limit=1", function(err, response, body) {
     if (err) {

        console.log("------------ ERROR CANNOT FIND SONG --------------------")
        
       }
    else
       {
        //            console.log(tweets);
        // If the request was successful...
        // Then log the body from the site!
        // console.log(body);
  
        // console.log(JSON.parse(body).tracks);

       artistName = (JSON.parse(body).tracks.items[0].album.artists[0].name)
       albumName = (JSON.parse(body).tracks.items[0].album.name);
       songName = (JSON.parse(body).tracks.items[0].name);
       preViewURL = (JSON.parse(body).tracks.items[0].preview_url);

       console.log("---------------------SONG DATA --------------------------")
       console.log("Artist                    " + artistName)
       console.log("Song                      " + songName)
       console.log("Song Preview URL          " + preViewURL)
       console.log("Album                     " + albumName)
       console.log("--------------------END OF SONG DATA --------------------")
     
       }
    
  
  });

  }
  
function findSpotifySongTheSign () {
    console.log("the sign")
    request("https://api.spotify.com/v1/search?q=" + liriArgument + "&type=track&limit=20", function(error, response, body) {

  // If the request was successful...
    // Then log the body from the site!
  // console.log(body);
  
    // console.log(JSON.parse(body).tracks);
    noMatchAceofBaseSW = "Y";

// Loop to find the song "the Sign" by artist "Ace of Base"

    for (var i = 0; i < JSON.parse(body).tracks.items.length; i++) {

         artistName = (JSON.parse(body).tracks.items[i].album.artists[0].name)
         songName = (JSON.parse(body).tracks.items[i].name);
         preViewURL = (JSON.parse(body).tracks.items[i].preview_url);
         albumName = (JSON.parse(body).tracks.items[i].album.name);


        if (artistName == "Ace of Base") 
          {
            console.log("---------------------SONG DATA --------------------------")
            console.log("Artist                    " + artistName)
            console.log("Song                      " + songName)
            console.log("Song Preview URL          " + preViewURL)
            console.log("Album                     " + albumName)
            console.log("--------------------END OF SONG DATA --------------------")
            noMatchAceofBaseSW = "N"
            i = 21
          }

    }
    
    if (noMatchAceofBaseSW == "Y")
       {
        console.log("-----------------SONG ERROR DATA --------------------------")
        console.log("No Match For Ace of Base Default")

       }
  
  });

  }


 // END  OF SPOTIFY LOGIC ----------------------------------

 // OMDB LOGIC ---------------------------------------------

function findOMDBMovie () {

request("http://www.omdbapi.com/?t=" + liriArgument + "&y=&plot=short&r=json", function (error, response, body) {
    // console.log(body);

    var movieTitle = JSON.parse(body).Title;
    var movieYearReleased = JSON.parse(body).Year;
    var movieCountryProduced = JSON.parse(body).Country;
    var movieImdbRating = JSON.parse(body).Rated;
    var movieLanguage = JSON.parse(body).Language;
    var moviePlot = JSON.parse(body).Plot;
    var movieActors = JSON.parse(body).Actors;
    var movieRottenTomRating = JSON.parse(body).imdbRating;
    var movieRottenTomURL = JSON.parse(body).imdbID;

    console.log("---------------------MOVIE DATA --------------------------")
    console.log("Movie Title                        " + movieTitle)
    console.log("Movie Year Released                " + movieYearReleased)
    console.log("Movie Country Produced             " + movieCountryProduced)
    console.log("Movie Rating                       " + movieImdbRating)
    console.log("Movie Language                     " + movieLanguage)
    console.log("Movie Plot                         " + moviePlot)
    console.log("Movie Actors                       " + movieActors)
    console.log("Movie Rotten Tomatoes Rating       " + movieRottenTomRating)
    console.log("Movie Rotten Tomatoes URL          " + movieRottenTomURL)
    console.log("--------------------END OF MOVIE DATA ---------------------")



 });

}

 // END  OF OMDB LOGIC -----------------------------------------------


 // Do what it says Logic --------------------------------------------

 function syncTheData (d) {

         inputFile = d.split(',');
         liriCommand = inputFile[0];
         liriArgument = inputFile[1];
         
 }
 // END OF do what it says logic -------------------------------------


 // Twitter LOGIC ----------------------------------------------------

function twitterTweetsLogic ()  {

      var Twitter = require('twitter');
  
      var client = new Twitter({
     // var client = ({
  
          consumer_key: 'fZ7Z7MbTBKiLcE8O9Qot7KsXO',
          consumer_secret: 'Jzg83RsrXtXcdHUYYQ0RFQJLJExYqGsOCM3g5AQp7XNsTMuuhO',
          access_token_key: '825940062881845249-SUvdzc3DAhM6JXa4YU6t4ZZWqRkF1nl',
          access_token_secret: 'L0hXJUkD8SYkxZmUbmwLOFCyoQv79CsGayXdckqtUzODI',
          });

        for (var key in client) {
        console.log("Key Name  " + key + "  Value of Key  " + client[key]);

         }
 
        var params = {screen_name: 'wsautoexchange'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
//            console.log(tweets);
           console.log("---------------------MY LAST 20 TWEETS DATA ----------------")
           for (i = 0 ; i < 20; i ++)
               {  
                console.log("My Tweet                     " + tweets[i].text);
                console.log("Date/Time of Tweet           " + tweets[i]["created_at"]);
                console.log("");     
               }
           console.log("--------------------END OF MY LAST 20 TWEETS DATA ----------")  
           }
        });



}


 // END OF Twitter LOGIC ---------------------------------------------


 // Main Liri LOGIC ----------------------------------------


// console.log("start")
// console.log("liri start  " + liriCommand)


 if (liriCommand == 'do-what-it-says') {

       // console.log("do it")
       var fs = require('fs');
       // fs.readFileSync('./random.txt', 'utf8', function(err, data) {
       //    if (err) throw err;
       var text = fs.readFileSync('./random.txt','utf8')
       // console.log (text)
       syncTheData (text)
          // console.log("do what it says")
          // console.log("command123" + liriCommand + "1")
          // console.log("argument   " + liriArgument) 
         
     // });
          
    };
 

 if (liriCommand === "spotify-this-song") {


    // console.log("Spotify Logic")

    if (liriArgument == null)
      {
      liriArgument = "The Sign"
      findSpotifySongTheSign ()
      return   
      }
    else
      {
       findSpotifySong ()
       return 
      }
    }


  if (liriCommand == 'movie-this') {


    // console.log("OMDB Logic")

    if (liriArgument == null)
      {
      liriArgument = "Mr. Nobody,"
      findOMDBMovie ()
      return   
      }
    else
      {
       findOMDBMovie ()
       return 
      }
    }

    if (liriCommand == "my-tweets")
    {
      // console.log("my-tweets logic")
      twitterTweetsLogic ()
    }
 



// END  OF Main Liri LOGIC -------------------------------------


//     fs.readFile('random.txt', 'utf8', function(err, data) {
//         var  = data.split(',');

//         for (var i=0; i<bankTransactions.length; i++){
//             total = total + parseFloat(bankTransactions[i]);
//         }

//         console.log(total.toFixed(2));
//     });
// }
// if (bankJob == 'withdraw') {
//     fs.appendFile('bank.txt', ', -' + process.argv[3]);
// }

// if (bankJob == 'deposit') {
//     fs.appendFile('bank.txt', ', ' + process.argv[3]);
// }

// if (bankJob == 'lotto'){
//     var lottoNum = Math.floor(Math.random()*10);

//     if (lottoNum == 0){
//         fs.appendFile('bank.txt', ', ' + 500);
//         console.log('you won');
//     }else{
//         fs.appendFile('bank.txt', ', -' + 60);
//         console.log('you lost');
//     }
// }
