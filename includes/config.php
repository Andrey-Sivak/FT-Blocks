<?php
/**
 * Plugin configuration loader
 *
 * @package FT_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get plugin configuration
 *
 * @param string|null $key Optional. Specific config key using dot notation (e.g., 'classes.wrapper').
 * @return mixed Full config array or specific value
 */
function ft_blocks_get_config( $key = null ) {
	static $config = null;

	if ( null === $config ) {
		global $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
		}

		$config_path = FT_BLOCKS_PATH . 'config.json';
		$config      = array();

		if ( $wp_filesystem->exists( $config_path ) ) {
			$contents = $wp_filesystem->get_contents( $config_path );
			if ( $contents ) {
				$config = json_decode( $contents, true );
			}
		}
	}

	if ( null === $key ) {
		return $config;
	}

	// Support dot notation: 'classes.wrapper'
	$keys  = explode( '.', $key );
	$value = $config;

	foreach ( $keys as $k ) {
		if ( ! isset( $value[ $k ] ) ) {
			return null;
		}
		$value = $value[ $k ];
	}

	return $value;
}

/**
 * Get CSS class config values for destructuring
 *
 * @return array
 */
function ft_blocks_get_config_classes(): array {
	return ft_blocks_get_config( 'classes' );
}
