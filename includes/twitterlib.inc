<?php

/**
 * Initialize OAuth connection.
 * @return \tmhOAuth
 */
function gfsf_twitter_init() {
  require_once libraries_get_path('tmhOAuth') . '/tmhOAuth.php';
  $connection = new tmhOAuth(array(
    'consumer_key' => variable_get('gfsf_twitter_consumer_key', ''),
    'consumer_secret' => variable_get('gfsf_twitter_consumer_secret', ''),
    'user_token' => variable_get('gfsf_twitter_access_token', ''),
    'user_secret' => variable_get('gssf_twitter_access_token_secret', ''),
  ));

  return $connection;
}

/**
 * Callback to get user timeline.
 *
 * @see https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
 */
function gfsf_twitter_user_timeline() {
  $connection = gfsf_twitter_init();

  $params = $_GET;
  unset($params['q']);

  $http_code = $connection->request('GET', $connection->url('1.1/statuses/user_timeline'), $params);
  if ($http_code == 200) {
    print $connection->response['response'];
  }
}

/**
 * Callback to search for tweets.
 *
 * @see https://dev.twitter.com/docs/api/1.1/get/search/tweets
 */
function gfsf_twitter_search_tweets() {
  $connection = gfsf_twitter_init();

  $params = $_GET;
  $params['q'] = htmlentities($_GET['search']);

  $http_code = $connection->request('GET', $connection->url('1.1/search/tweets'), $params);
  if ($http_code == 200) {
    print $connection->response['response'];
  }
}
