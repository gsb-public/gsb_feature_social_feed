(function ($) {

  /**
   * Check for social field fpp, if it exists, check the source.
   * If the source is twitter, grab the values from fields and
   * transmit them to gsb_tweetfeed function.
   * Modified for displaying mutiple block twitter feeds - Modified Date:28-3-2017
   */
  Drupal.behaviors.social_feed = {
    attach: function () {
      var socialWrapper = $('.pane-bundle-social-feed');
      //For loop for finding all twitter feeds block
      $(socialWrapper).each(function(i, obj) {
        var soclass = "so-feed-"+i;
        $(this).addClass(soclass);
        if ($(this).length > 0 ) {
          var _source = $(this).find('.field-name-field-feed-source').text();
          if ( _source.toLowerCase() == 'twitter') {
            // Get tweets number and search query.
            var _length = $(this).find('.field-name-field-social-display-num').text(),
                _search = $(this).find('.field-name-field-twitter-search').text();
           // Initialize twitterfeed.js function.
            gsb_tweetfeed.init({
              search: _search,
              numTweets: _length,
              appendTo: "."+soclass
            });
          }
        }
        
      });
    }
  };

}(jQuery));
