var topics = ["Mickey Mouse", "Minnie", "Cinderella", "Belle", "Stitch", "Olaf", "Ariel", "Snow White"];

function displayGifs() {
    var gifs = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x8qOc7F9XmHWtIsjsS6LmEqdklniXpXV&q=" + gifs + "&limit=10&offset=10&rating=G&lang=en";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gifs-view").empty();

        var results = response.data

        for (var i = 0; i < results.length; i++) {
            var table = $("<table>");
            var gifDiv = $("<td class=row>");
            var imgURL = results[i].images.fixed_height_small_still.url;
            var image = $("<img>")
                .attr("src", imgURL)
                .attr("data-still", imgURL)
                .attr("data-animate", results[i].images.fixed_height_small.url)
                .attr("data-state", "still");
            var rated = results[i].rating;

            var ratingParagraph = $("<p>")
                .text("Rating: " + rated)
                .addClass("rating");

            gifDiv.append(ratingParagraph);

            table.append(gifDiv);
            gifDiv.append(image);



            $("#gifs-view").prepend(gifDiv);
        }
    });
};

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>")
            .addClass("gif-button")
            .attr("data-name", topics[i])
            .text(topics[i]);
        $("#buttons-view").append(button);
        console.log(button);

    }
}

$("#add-button").on("click", function (event) {
    event.preventDefault();

    var gif = $("#gifs-input").val();

    topics.push(gif);

    renderButtons();
});

$(document).on("click", ".gif-button", displayGifs);

renderButtons();

$(document).on("click", "img", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

