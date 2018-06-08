var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
  'api-key': "058576887ce44ee6a07aaed0fbfbf536"
});
$.ajax({
  url: url,
  method: 'GET',
})
    .done(function(result) {
    // console.log(result);
})
    .fail(function(err) {
    throw err;
});