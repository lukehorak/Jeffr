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

createLikeShare = () => {
  const $flag = $("<i>").addClass("fa fa-flag");
  const $retweet = $("<i>").addClass("fa fa-retweet");
  const $like = $("<i>").addClass("fa fa-heart");
  return $("<div>").addClass("like-share").append($flag, $retweet, $like)
}

createTweetElement = (tweetObj) => {
  // Template Literal
 const articleText =`
  <header>
    <div class="profile"><img src="${tweetObj.user.avatars.regular}">
      <h2>${tweetObj.user.name}</h2>
    </div><span class="handle">${tweetObj.user.handle}</span>
  </header>
  <p class="tweet-content">${tweetObj.content.text}</p>
  <footer>
    <p class="timestamp">${timeAgo(tweetObj.created_at)}</p>
    <div class="like-share"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i></div>
  </footer>`
  
return $('<article>').addClass("tweet").html(articleText)
};

function renderTweets(tweets) {
  const $tweets = $('#tweets');
  tweets.forEach( tweet => {
    $tweets.append(createTweetElement(tweet));
  });
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