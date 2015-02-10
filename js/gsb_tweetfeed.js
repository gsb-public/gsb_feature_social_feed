(function ($) {

/*
 * Description:
 *   gsb_tweetfeed returns tweets for user/hashtag.
 *
 * Usage:
 *   on page load run:
 *     with comments:
 *     gsb_tweetfeed.init({
 *       search: '@username',       // for user tweets or hashtag
 *       numTweets: 5,           // number of tweets, default equals to 3
 *       appendTo: '#jstwitter', // wrapper id
 *       format: 'M j | a'       // date format. check http://php.net/manual/en/function.date.php
 *     });
 *
 *  Clean version:
 *
   gsb_tweetfeed.init({
     search: '@username',
     numTweets: 3,
     appendTo: '#jstwitter',
     format: 'l, M j | a'
   });
 *
 */
gsb_tweetfeed = {
  // initialization of twitterfeed
  init: function( config ) {
    this.search = config.search;
    this.numTweets = config.numTweets == null ? 3 : config.numTweets;
    this.appendTo = config.appendTo;
    this.format = config.format == null ? 'l, M j | a' : config.format;

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.checkTweets();
  },

  // checking for user or hashtag
  checkTweets: function () {
    if (this.search[0] == '@') {
      this.search = this.search.split('@')[1];
      this.loadTweets();
    }
    else if (this.search[0] != '#' && this.search.length > 0) {
      this.loadTweets();
    }
    else if (this.search.length > 1) {
      this.search = this.search.split('#')[1];
      this.loadHashtagTweets();
    }
    else {
      $(gsb_tweetfeed.appendTo).append('You have not specified any user or hashtag.');
    }
  },

  // core function of gsb_tweetfeed
  loadTweets: function() {
    var tempAppendTo = gsb_tweetfeed.appendTo;
    $.ajax({
      url: '/gfsf_user_timeline',
      type: 'GET',
      dataType: 'json',
      data: {
        screen_name: gsb_tweetfeed.search,
        count: gsb_tweetfeed.numTweets,
        include_entities: true,
        include_rts: 1
      },
      success: function(data) {
        var html = '<div class="tweet">TWEET_TEXT<div class="time">tweetime</div></div>';
        var title = $(tempAppendTo).find('.field-name-field-feed-source');
        overrideTitle = $(tempAppendTo).find('.field-name-field-social-twitter-title .field-item').text();
        if (overrideTitle != '' && overrideTitle != ' ') {
          titleText = overrideTitle;
        }
        else {
          titleText = data[0].user.name;
        }

        var $searchText = $('.field-name-field-twitter-search');
        title.html('<a target="_blank" href="' + 'https://twitter.com/' + data[0].user.screen_name +'"><span class="twitter-title-text">' + titleText + '</span>\n<span class="twitter-search-text">' + $searchText.text() + '</span></a>');          $searchText.remove();

        // append tweets into page
        for (var i = 0; i < data.length; i++) {
          $(tempAppendTo).append(
            html.replace('TWEET_TEXT', gsb_tweetfeed.ify.clean(data[i].text) )
            .replace(/USER/g, data[i].user.screen_name)
            .replace('tweetime', gsb_tweetfeed.tweetime(data[i].created_at) )
          );
        }
      }
    });
  },

  loadHashtagTweets: function() {
    var tempAppendTo = gsb_tweetfeed.appendTo,
    hashtagurl = '/gfsf_search_tweets?search=' + gsb_tweetfeed.search;
    $.getJSON( hashtagurl, function( data ) {
      var html = '<div class="tweet"><span class="tweet-from-user">FROM-USER: </span>TWEET_TEXT<div class="time">tweetime</div>';
      overrideTitle = $(tempAppendTo).find('.field-name-field-social-twitter-title .field-item').text();
      if (overrideTitle != '' && overrideTitle != ' ') {
        titleText = overrideTitle;
      }
      else {
        titleText = data[0].user.name;
      }
      var $searchText = $('.field-name-field-feed-source');
      $searchText.remove();
      $('.field-name-field-twitter-search').replaceWith('<a target="_blank" href="' + 'https://twitter.com/#' + gsb_tweetfeed.search +'"><span class="twitter-title-text">' + titleText + '</span>#' + gsb_tweetfeed.search + '</a>');
      for (var i = 0; i < gsb_tweetfeed.numTweets; i++) {
        $(tempAppendTo).append(
          html.replace('TWEET_TEXT', gsb_tweetfeed.ify.clean(data['statuses'][i].text) )
          .replace('FROM-USER', data['statuses'][i].user.screen_name)
          .replace('tweetime', gsb_tweetfeed.tweetime(data['statuses'][i].created_at) )
        );
      }
    });
  },

  /**
   * relative time calculator FROM TWITTER
   * @param {string} twitter date string returned from Twitter API
   * @return {string} relative time like "2 minutes ago"
   */
  tweetime: function(dateString) {
    var rightNow = new Date(),
    then = new Date(dateString);

    if ($.browser.msie) {
      // IE can't parse these crazy Ruby dates
      then = new Date(dateString.replace('+', 'UTC+'));
    }

    var tweetmonth = gsb_tweetfeed.months[then.getMonth()],
    tweetweekday = gsb_tweetfeed.weekDays[then.getDay()],
    tweetday = then.getDate(),
    ago = '';

    var diff = rightNow - then,
    second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

    if (isNaN(diff) || diff < 0) {
      ago = ""; // return blank string if unknown
    }
    else if (diff < second * 2) {
      // within 2 seconds
      ago = "right now";
    }
    else if (diff < minute) {
      ago = Math.floor(diff / second) + " seconds ago";
    }
    else if (diff < minute * 2) {
      ago = "1 minute ago";
    }
    else if (diff < hour) {
      ago = Math.floor(diff / minute) + " minutes ago";
    }
    else if (diff < hour * 2) {
      ago = "1 hour ago";
    }
    else if (diff < day) {
      ago =  Math.floor(diff / hour) + " hours ago";
    }
    else if (diff > day && diff < day * 2) {
      ago = "yesterday";
    }
    else if (diff < day * 365) {
      ago = Math.floor(diff / day) + " days ago";
    }
    else {
      ago = "over a year ago";
    }
    var output = gsb_tweetfeed.format;
    output = output.replace(/\bl\b/gi, tweetweekday )
      .replace(/\bM\b/gi, tweetmonth )
      .replace(/\bj\b/gi, tweetday )
      .replace(/\ba\b/gi, ago);

    return output;
  },

  /**
   * The Twitalinkahashifyer!
   * http://www.dustindiaz.com/basement/ify.html
   */
  ify: {
    link: function(tweet) {
      return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
        var http = m2.match(/w/) ? 'http://' : '';
        return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
      });
    },
    at: function(tweet) {
      return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
      });
    },

    list: function(tweet) {
      return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
        return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
      });
    },

    hash: function(tweet) {
      return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
        return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
      });
    },

    clean: function(tweet) {
      return this.hash(this.at(this.list(this.link(tweet))));
    }
  }

};

}(jQuery));
