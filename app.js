$(document).ready(function(){

  var $app = $('#app');
  var tweetData =  streams.home;
  var name = false;

  // Create new HTML elements
  //=========================
  var $title = $('<h1 class="title"> Twiddler </h1>');
  $title.css({"font-family":"Hachi Maru Pop, cursive", "font-size":"78px"});

  var $updateFeedButton = $('<button id="update-feed">Update</button>')
  var $feed = $('<div id="feed"></div>')
  // Select already existing elements
  //=================================


  // Create event handler functions
  //===============================
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }
  // Set event listeners (providing appropriate handlers as input)
  //=============================================================
  $title.on('click', handleTitleClick);

  // Append new HTML elements to the DOM
  //====================================
  $title.appendTo($app);
  $feed.appendTo($app);
  $updateFeedButton.appendTo($app);

    $('#update-feed').on("click", function (){
    if (name) {
      $(this).text("Update");
      name = false;
      renderFeed(name);
    } else {
      $(this).text('Update')
      renderFeed();
    }
  });


  function renderFeed(name) {
    $('#feed').html('');
    var tweetArray;
    var index;

    if (!name) {
      tweetArray = streams.home;
      tweetData = tweetArray;
    } else {
      tweetArray = tweetData;
      if (name) {
        tweetArray = streams.users[name];
      }
    }
    index = tweetArray.length - 1;


    while (index >= 0) {
      var tweet = tweetArray[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.appendTo($feed);


      var $column1 = $('<div class="column1"></div> ');

      var $tweetImage = $('<img class="profile-photo" >');
      $tweetImage.attr('src',tweet.profilePhotoURL);
      $tweetImage.appendTo($column1);
      var $tweetUsername = $('<a class="username"> </a>');
      var user = '@'+tweet.user;
      $tweetUsername.text(user);
      $tweetUsername.appendTo($column1);
      $column1.appendTo($tweet);

      $tweetUsername.on('click', function() {
        var nameText = $(this).text();
        nameText = nameText.replace('@','');
        name = nameText;
        $('#update-feed').text('Back');
        renderFeed(name);
      });

      var $column2 = $('<div class="column2"></div> ');
      $row1 = $('<div class="row1"></div>');
      $row2 = $('<div class="row2"></div');
      $row1.appendTo($column2);
      $row2.appendTo($column2);
      $column2.appendTo($tweet);

      $column3 = $('<div class="column3"></div>');
      $column3.appendTo($tweet);

      var $tweetTimestamp = $('<span class="timestamp"></span>');
      var $timeago = jQuery.timeago(tweet.created_at);
      $tweetTimestamp.html($timeago);
      $tweetTimestamp.appendTo($column3);

      var $tweetMessage = $('<p class="message"></p>');
      $tweetMessage.text(tweet.message);
      $tweetMessage.appendTo($row1);


      $iconContainer = $('<div class= iconContainer></div>"');

      var $icon1 = $('<i class="fas fa-comments comment icon"></i>');
      var $icon2 = $('<i class="fas fa-retweet retweet icon"></i>');
      var $icon3 = $('<i class="fas fa-thumbs-up like icon"></i>');
      var $icon4 = $('<i class="fas fa-share-alt share icon"></i>');

      $iconContainer.appendTo($row2);

      $icon1.appendTo($iconContainer);
      $icon2.appendTo($iconContainer);
      $icon3.appendTo($iconContainer);
      $icon4.appendTo($iconContainer);

      index -= 1;
    }
  }
  renderFeed();
  window.isItBeautifulYet = true
});