<?php
/**
 * @file
 * gsb_feature_social_feed.features.defaultconfig.inc
 */

/**
 * Implements hook_defaultconfig_features().
 */
function gsb_feature_social_feed_defaultconfig_features() {
  return array(
    'gsb_feature_social_feed' => array(
      'strongarm' => 'strongarm',
    ),
  );
}

/**
 * Implements hook_defaultconfig_strongarm().
 */
function gsb_feature_social_feed_defaultconfig_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_fieldable_panels_pane__social_feed';
  $strongarm->value = array(
    'view_modes' => array(
      'ical' => array(
        'custom_settings' => TRUE,
      ),
      'full' => array(
        'custom_settings' => FALSE,
      ),
      'token' => array(
        'custom_settings' => FALSE,
      ),
    ),
    'extra_fields' => array(
      'form' => array(),
      'display' => array(
        'title' => array(
          'default' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_fieldable_panels_pane__social_feed'] = $strongarm;

  return $export;
}
