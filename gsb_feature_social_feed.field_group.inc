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
  $field_group->identifier = 'group_twitter_feed|fieldable_panels_pane|social_feed|form';
  $field_group->group_name = 'group_twitter_feed';
  $field_group->entity_type = 'fieldable_panels_pane';
  $field_group->bundle = 'social_feed';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Twitter Feed',
    'weight' => '-8',
    'children' => array(
      0 => 'field_social_display_num',
      1 => 'field_twitter_search',
      2 => 'field_social_twitter_title',
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
  $export['group_twitter_feed|fieldable_panels_pane|social_feed|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_wrapper_twitter|fieldable_panels_pane|social_feed|default';
  $field_group->group_name = 'group_wrapper_twitter';
  $field_group->entity_type = 'fieldable_panels_pane';
  $field_group->bundle = 'social_feed';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Twitter handle',
    'weight' => '1',
    'children' => array(
      0 => 'field_feed_source',
      1 => 'field_social_twitter_title',
      2 => 'field_twitter_search',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Twitter handle',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-wrapper-twitter',
        'description' => '',
        'show_label' => '0',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'none',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_wrapper_twitter|fieldable_panels_pane|social_feed|default'] = $field_group;

  return $export;
}
