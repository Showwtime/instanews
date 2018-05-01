$(document).ready(function() {
  $("#select-menu").on("change", function() {
    $("#grid").empty();

    var selected = $(this).val();
    console.log(selected);

    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "058576887ce44ee6a07aaed0fbfbf536"
      });

    $.ajax({
      url: url,
      method: "GET"
    })
      .done(function(data) {

        var rawData = data.results;
        console.log(rawData, 'before filter');

        var filtered = rawData.filter(function(value){
          return value.multimedia.length > 0;


        })
        .slice (0, 12);

        /**
         * jQuery loop, .each loops through array and grabs the URL, headline, and image.
         */
        $.each(filtered, function(key, value) {
          var storyUrl = value.url;
          var storyBlurb = value.abstract;
          var storyImage = value.multimedia[4].url;

          // setup our html template as a string and concatenate
          var html = '<div class"wrapper" a href="'+ storyUrl + '"target="_blank"">';
          html += '<div class="grid-item" style="background: url(' + storyImage + ')">';
          html += '<p class="news-caption">' + storyBlurb + '</p>';
          html += '</div>';
          html += '</div>';

          $('#grid').append(html);
         
        });
      })
      .fail(function(err) {
        throw err;
      });
  });
}); // End of Document Ready
