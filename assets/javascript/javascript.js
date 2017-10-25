$(document).ready(function() {
//Pause and Start function
$(".gif").on("click", function() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));
  } else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
});

//API request function
$('body').on("click", ".movie", function() {
  console.log("works")
  var person = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});


//Create buttons function
var movies = ["Alps"]

function renderButtons() {

  $("#movies-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("movie");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", movies[i]);

    // Providing the button's text with a value of the movie at index i
    a.append(movies[i]);
    // Adding the button to the HTML
    
    $("#movies-view").append(a)

    console.log("ello");
  }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var movie = $("#movie-input").val().trim();
  // The movie from the textbox is then added to our array
  movies.push(movie);


  // calling renderButtons which handles the processing of our movie array
  renderButtons();

  $("#movie-input").val('');
});
// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

})