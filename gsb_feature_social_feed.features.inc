<?php
/**
 * @file
 * gsb_feature_social_feed.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function gsb_feature_social_feed_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "ds" && $api == "ds") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}
