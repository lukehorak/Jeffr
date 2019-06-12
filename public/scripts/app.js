createTweetElement = (tweetObj) => {
  // Template Literal
 const articleText =`
  <header>
    <div class="profile"><img src="${tweetObj.user.avatars.regular}">
      <h2>${tweetObj.user.name}</h2>
    </div>
    <span class="handle">${tweetObj.user.handle}</span>
  </header>
  <p class="tweet-content">${tweetObj.content.text}</p>
  <footer>
    <p class="timestamp">${timeAgo(tweetObj.created_at)}</p>
    <div class="like-share"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></div>
  </footer>`
  
return $('<article>').addClass("tweet").html(articleText)
};

const loadTweets = () => {
  $.ajax({
    type:'GET',
    url:'/tweets',
    dataType: 'json'
  })
  .then(function(jeffData) {
    // Sort Chronologically
    $('#tweets').empty();
    jeffData.sort( (a, b) => b.created_at - a.created_at);
    for (let tweet of jeffData) {
      // Use an IIFE to render tweets one at a time
      let i = jeffData.indexOf(tweet);
      const $tweets = $('#tweets');
      (function (i) {
        setTimeout(function () {
          $tweets.append(createTweetElement(tweet).fadeIn(800));
        }, 400 * i);
      })(i);
    }
  })
}

$("#tweets").ready(function () {
  loadTweets();
});