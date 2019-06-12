function errorBuilder(errorText){
  return `
  <div class="error">
    <i class="fas fa-exclamation-triangle"></i>
    <p id="error">${errorText}</p>
  </div>
`
}

$(document).ready(function () {
  const $button = $('#jeff-it');
  $button.on('click', function (event) {
    event.preventDefault();
    
    $form = $('#tweet-form');
    const serialized = $form.serialize();
    const tweetLength = $form.find("textarea").val().length;
    let error = (tweetLength > 140 ? "Too much Jeffness for one tweet. We can't handle that much Jeffness!" : tweetLength === 0 ? "Oops! Looks like you forgot to enter your Jeffness before submitting!" : undefined);
    if (error) {
      $error = errorBuilder(error);
      $('.error').remove();
      $('.new-tweet').append($error);
    }
    
    else {
      $('.error').remove();
      $.ajax({
          type: 'POST',
          url: '/tweets/',
          data: serialized
        })
        .then(function () {
          $(".new-tweet textarea").val("");
          // Calling loadTweets() again in case another user had tweeted between when the page was loaded and a new tweet was submitted
          loadTweets();
        })
    }
  });
})