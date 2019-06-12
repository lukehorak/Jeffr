$(document).ready(function() {
  const $button = $('#jeff-it');
  $button.on('click', function (event) {
    event.preventDefault();
    const serialized = $button.parent().serialize();
    const tweetLength = $button.siblings("textarea").val().length;
    let error = (tweetLength > 140 ? "Too much Jeffness for one tweet. We can't handle that much Jeffness!" : tweetLength === 0 ? "There's no Jeffness here!" : undefined);
    if(error) {

      alert(error);
;    }
    else{
      $.ajax({
      type: 'POST',
      url: '/tweets/',
      data: serialized,
      success: function(){
        $(".new-tweet textarea").val("")
        // Calling loadTweets() again in case another user had tweeted between when the page was loaded and a new tweet was submitted
        loadTweets();
      }
    })}
  });
})
