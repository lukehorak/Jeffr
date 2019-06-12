function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

createTweetElement = (tweetObj) => {
  // Template Literal
  const articleText = `
  <header>
    <div class="profile"><img src="${escape(tweetObj.user.avatars.regular)}">
      <h2>${escape(tweetObj.user.name)}</h2>
    </div>
    <span class="handle">${escape(tweetObj.user.handle)}</span>
  </header>
  <p class="tweet-content">${escape(tweetObj.content.text)}</p>
  <footer>
    <p class="timestamp">${timeAgo(escape(tweetObj.created_at))}</p>
    <div class="like-share"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></div>
  </footer>`

  return $('<article>').addClass("tweet").html(articleText)
};

const renderTweets = (jeffData, tweets) => {
  // Sort Chronologically
  jeffData.sort((a, b) => b.created_at - a.created_at);
  for (let tweet of jeffData) {
    // Use an IIFE to render tweets one at a time
    let index = jeffData.indexOf(tweet);
    (function (i) {
      setTimeout(function () {
        tweets.append(createTweetElement(tweet).fadeIn(700));
      }, 50 * i);
    })(index);
  }
}

const loadTweets = () => {
  $.ajax({
      type: 'GET',
      url: '/tweets',
      dataType: 'json'
    })
    .then(function (jeffData) {
      const $tweets = $('#tweets');
      $tweets.empty();
      renderTweets(jeffData, $tweets);
    })
}

$(document).ready(function () {
  loadTweets();
});