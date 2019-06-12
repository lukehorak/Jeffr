const jeffData = [{
    "user": {
      "name": "Dr. Jeff Malcom",
      "avatars": {
        "small": "/images/DrJeffMalcom.jpg",
        "regular": "/images/DrJeffMalcom.jpg",
        "large": "/images/DrJeffMalcom.jpg"
      },
      "handle": "@ChaosTheory"
    },
    "content": {
      "text": "God creates dinosaurs, God destroys dinosaurs. God creates Man, man destroys God. Man creates dinosaurs..."
    },
    "created_at": 1560278552379
  },
  {
    "user": {
      "name": "Grandmaster Jeff",
      "avatars": {
        "small": "/images/grandmasterJeff.jpg",
        "regular": "/images/grandmasterJeff.jpg",
        "large": "/images/grandmasterJeff.jpg"
      },
      "handle": "@TheGrandmaster"
    },
    "content": {
      "text": "Ohhh! I don't like the 'S' word. No, no. We call them 'prisoners with jobs'."
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Jeff Brundle",
      "avatars": {
        "small": "/images/flyJeff.png",
        "regular": "/images/flyJeff.png",
        "large": "/images/flyJeff.png"
      },
      "handle": "@FlyJeff"
    },
    "content": {
      "text": "I'm saying... I'm saying I-- I'm an insect who dreamt he was a man and loved it. But now the dream is over... and the insect is awake."
    },
    "created_at": 1461116232227
  }
];

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

createLikeShare = () => {
  const $flag = $("<i>").addClass("fa fa-flag");
  const $retweet = $("<i>").addClass("fa fa-retweet");
  const $like = $("<i>").addClass("fa fa-heart");
  return $("<div>").addClass("like-share").append($flag, $retweet, $like)
}

createTweetElement = (tweetObj) => {

  // Create profile div
  const $img = $("<img>").attr("src", tweetObj.user.avatars.regular);
  const $name = $("<h2>").text(tweetObj.user.name);
  const $prof = $("<div>").addClass("profile").append($img, $name);

  // Create handle and builld <header>
  const $handle = $(`<span>`).text(tweetObj.user.handle).addClass("handle");
  const $header = $("<header>").append($prof, $handle);

  // Tweet content
  const $tweetText = $("<p>").text(tweetObj.content.text).addClass("tweet-content");

  // Footer

  const $timestamp = $("<p>").text(timeAgo(tweetObj.created_at)).addClass("timestamp");
  const $likeShare = createLikeShare();
  const $footer = $("<footer>").append($timestamp, $likeShare);

  const $tweet = $("<article>").addClass("tweet").append($header, $tweetText, $footer);

  return $tweet;
};

function renderTweets(tweets) {
  const $tweets = $('#tweets');
  for (var tweet in tweets) {
    $tweets.append(createTweetElement(tweets[tweet]));
  }
}

$(document).ready(function () {
  for (let tweet of jeffData) {
    // Use an IIFE to render tweets one at a time
    let i = jeffData.indexOf(tweet);
    const $tweets = $('#tweets');
    (function (i) {
      setTimeout(function () {
        $tweets.append(createTweetElement(tweet).fadeIn(1200));
      }, 400 * i);
    })(i);
  }
});