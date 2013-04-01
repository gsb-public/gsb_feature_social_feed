<?php
/**
 * @file
 * gsb_feature_social_feed.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function gsb_feature_social_feed_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_twitter_feed|fieldable_panels_pane|gsb_social_feed_fpp|form';
  $field_group->group_name = 'group_twitter_feed';
  $field_group->entity_type = 'fieldable_panels_pane';
  $field_group->bundle = 'social_feed';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Twitter Feed',
    'weight' => '2',
    'children' => array(
      0 => 'field_button_title',
      1 => 'field_source_link',
      2 => 'field_twitter_search',
      3 => 'field_social_display_num',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_twitter_feed|fieldable_panels_pane|gsb_social_feed_fpp|form'] = $field_group;

  return $export;
}
