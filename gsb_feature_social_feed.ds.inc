<?php
/**
 * @file
 * gsb_feature_social_feed.ds.inc
 */

/**
 * Implements hook_ds_layout_settings_info().
 */
function gsb_feature_social_feed_ds_layout_settings_info() {
  $export = array();

  $ds_layout = new stdClass();
  $ds_layout->api_version = 1;
  $ds_layout->id = 'fieldable_panels_pane|social_feed|default';
  $ds_layout->entity_type = 'fieldable_panels_pane';
  $ds_layout->bundle = 'social_feed';
  $ds_layout->view_mode = 'default';
  $ds_layout->layout = 'ds_1col';
  $ds_layout->settings = array(
    'regions' => array(
      'ds_content' => array(
        0 => 'title',
        1 => 'field_feed_source',
        2 => 'field_twitter_search',
        3 => 'field_social_display_num',
      ),
    ),
    'fields' => array(
      'title' => 'ds_content',
      'field_feed_source' => 'ds_content',
      'field_twitter_search' => 'ds_content',
      'field_social_display_num' => 'ds_content',
    ),
    'classes' => array(),
    'wrappers' => array(
      'ds_content' => 'div',
      'ds_hidden' => 'div',
    ),
    'layout_wrapper' => 'div',
    'layout_attributes' => '',
    'layout_attributes_merge' => 1,
  );
  $export['fieldable_panels_pane|social_feed|default'] = $ds_layout;

  return $export;
}
