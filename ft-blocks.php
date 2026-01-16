<?php
/**
 * Plugin Name: FT Blocks
 * Description: Custom Gutenberg blocks for fotografkadomca website.
 * Version: 1.0.0
 * Author: Andrii Sivak
 * Author URI: https://github.com/Andrey-Sivak
 * Plugin URI: https://github.com/Andrey-Sivak/ft-blocks
 * Text Domain: ft-blocks
 * Domain Path: /languages
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * @package FT_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Define Constants
 */
define( 'FT_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'FT_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Load plugin configuration
 */
require_once FT_BLOCKS_PATH . 'includes/config.php';

/**
 * Load components
 */
require_once FT_BLOCKS_PATH . 'includes/components/button.php';

/**
 * Load plugin text domain for translations
 */
if ( ! function_exists( 'ft_blocks_load_textdomain' ) ) {
	function ft_blocks_load_textdomain() {
		load_plugin_textdomain(
			'ft-blocks',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);
	}
}
add_action( 'plugins_loaded', 'ft_blocks_load_textdomain' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it also registers the assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
if ( ! function_exists( 'ft_blocks_init' ) ) {
	function ft_blocks_init() {
        $blocks = array(
            'hero'              => array(
                'title'       => __( 'Hero Section', 'ft-blocks' ),
                'description' => __( 'A high-impact hero section with background and CTA.', 'ft-blocks' ),
            ),
            'photo-shoot-types' => array(
                'title'       => __( 'Photo Shoot Types', 'ft-blocks' ),
                'description' => __( 'Display different photo shoot types with tabbed navigation.', 'ft-blocks' ),
            ),
            'features'          => array(
                'title'       => __( 'Features', 'ft-blocks' ),
                'description' => __( 'Display features in a grid with icons, titles and descriptions.', 'ft-blocks' ),
            ),
        );

        foreach ( $blocks as $block => $args ) {
            register_block_type(
                FT_BLOCKS_PATH . 'build/blocks/' . $block,
                $args
            );
        }
	}
}

add_action( 'init', 'ft_blocks_init' );

/**
 * Enqueue global styles for frontend and editor
 */
if ( ! function_exists( 'ft_blocks_enqueue_global_styles' ) ) {
	function ft_blocks_enqueue_global_styles() {
		$version = filemtime( FT_BLOCKS_PATH . 'build/style-ft-blocks-global-styles.css' );

		wp_enqueue_style(
			'ft-blocks-global-styles',
			FT_BLOCKS_URL . 'build/style-ft-blocks-global-styles.css',
			array(),
			$version
		);
	}
}

add_action( 'wp_enqueue_scripts', 'ft_blocks_enqueue_global_styles' );
add_action( 'enqueue_block_assets', 'ft_blocks_enqueue_global_styles' );

/**
 * Set script translations for block editor
 */
if ( ! function_exists( 'ft_blocks_set_script_translations' ) ) {
	function ft_blocks_set_script_translations() {
		$block_types = WP_Block_Type_Registry::get_instance()->get_all_registered();

		foreach ( $block_types as $block_type ) {
			// Only process our blocks
			if ( str_starts_with( $block_type->name, 'ft-' ) ) {
				$handle = str_replace( '/', '-', $block_type->name ) . '-editor-script';

				wp_set_script_translations(
					$handle,
					'ft-blocks',
					FT_BLOCKS_PATH . 'languages'
				);
			}
		}
	}
}
add_action( 'init', 'ft_blocks_set_script_translations', 20 );
