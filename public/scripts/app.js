/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const jeffData = [{
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

createLikeShare = () => {
  const $flag = $("<i>").addClass("fa fa-flag");
  const $retweet = $("<i>").addClass("fa fa-retweet");
  const $like = $("<i>").addClass("fa fa-heart");
  return $("<div>").addClass("like-share").append($flag, $retweet, $like)
}

createTweetElement = (tweetObj) => {

  // Create profile div
  const $img = $("<img>").attr("src", tweetObj.user.avatars.regular);
  const $name = $(`<h2>${tweetObj.user.name}</h2>`);
  const $prof = $("<div>").addClass("profile").append($img, $name);

  // Create handle and builld <header>
  const $handle = $(`<span>${tweetObj.user.handle}</span>`).addClass("handle");
  const $header = $("<header>").append($prof, $handle);

  // Tweet content
  const $tweetText = $(`<p>${tweetObj.content.text}</p>`).addClass("tweet-content");

  // Footer

  // 
  const $timestamp = $(`<p>${tweetObj.created_at}</p>`).addClass("timestamp");
  const $likeShare = createLikeShare();
  const $footer = $("<footer>").append($timestamp, $likeShare);

  const $tweet = $("<article>").addClass("tweet").append($header, $tweetText, $footer);
  return $tweet;
};

function renderTweets(tweets) {
  for (let tweet of tweets) {
    $('#tweets').append(createTweetElement(tweet));
  }
}

$(document).ready(function () {
  for (let tweet of jeffData) {
    $('#tweets').append(createTweetElement(tweet).fadeIn(1200));
  }
});