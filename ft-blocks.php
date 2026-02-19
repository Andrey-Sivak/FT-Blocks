<?php
/**
 * Plugin Name: FT Blocks
 * Description: Custom Gutenberg blocks for fotografkadomca website.
 * Version: 1.0.3
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
 * Define Constants.
 */
define( 'FT_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'FT_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'FT_BLOCKS_VERSION', '1.0.4' );

/**
 * Determine development mode based on multiple signals.
 *
 * Checks (in order):
 * 1. Explicit FT_BLOCKS_DEV_MODE constant
 * 2. WP_ENVIRONMENT_TYPE (local/development)
 * 3. Server hostname patterns
 * 4. WP_DEBUG as fallback
 */
if ( ! defined( 'FT_BLOCKS_DEV_MODE' ) ) {
	function ft_blocks_is_dev_environment() {
		// 1. check wp environment type
		if ( function_exists( 'wp_get_environment_type' ) ) {
			$env_type = wp_get_environment_type();
			if ( in_array( $env_type, array( 'local', 'development' ), true ) ) {
				return true;
			}
		}

		// 2. check server hostname patterns
		$hostname     = $_SERVER['HTTP_HOST'] ?? '';
		$dev_patterns = array(
			'.local',
			'.test',
			'.dev',
			'localhost',
			'127.0.0.1',
			'::1',
			'.ngrok.io',
		);

		foreach ( $dev_patterns as $pattern ) {
			if ( str_contains( $hostname, $pattern ) ) {
				return true;
			}
		}

		// 3. fallback to WP_DEBUG
		return defined( 'WP_DEBUG' ) && WP_DEBUG;
	}

	define( 'FT_BLOCKS_DEV_MODE', ft_blocks_is_dev_environment() );
}

/**
 * get asset version for cache busting
 *
 * @param string $file_path absolute file path
 * @return string version string
 */
if ( ! function_exists( 'ft_blocks_get_asset_version' ) ) {
	function ft_blocks_get_asset_version( $file_path = '' ) {
		// dev: use file modification time for instant cache busting
		if ( FT_BLOCKS_DEV_MODE && ! empty( $file_path ) && file_exists( $file_path ) ) {
			return (string) filemtime( $file_path );
		}

		// prod: use plugin version for stability
		return FT_BLOCKS_VERSION;
	}
}

/**
 * get versioned asset from manifest with fallback.
 *
 * @param string $asset asset filename (e.g., 'animations.js', 'style.css').
 * @return array {
 *     asset information.
 *
 *     @type string $url     full url to the asset.
 *     @type string $version version/hash for cache busting.
 *     @type string $path    absolute file path.
 * }
 */
if ( ! function_exists( 'ft_blocks_get_asset' ) ) {
	function ft_blocks_get_asset( $asset ) {
		$asset_path = FT_BLOCKS_PATH . 'build/' . $asset;

		return array(
			'url'     => FT_BLOCKS_URL . 'build/' . $asset,
			'version' => ft_blocks_get_asset_version( $asset_path ),
			'path'    => $asset_path,
		);
	}
}

/**
 * Load plugin configuration.
 */
require_once FT_BLOCKS_PATH . 'includes/config.php';

/**
 * Load components.
 */
require_once FT_BLOCKS_PATH . 'includes/components/button.php';
require_once FT_BLOCKS_PATH . 'includes/components/icons.php';

/**
 * Load plugin text domain for translations.
 *
 * @return void
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
 *
 * @return void
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
			'service-info'      => array(
				'title'       => __( 'Service Info', 'ft-blocks' ),
				'description' => __( 'Two-column layout with text, highlighted info, buttons and image.', 'ft-blocks' ),
			),
			'vip-list'          => array(
				'title'       => __( 'VIP List', 'ft-blocks' ),
				'description' => __( 'Display VIP benefits with two-column header and feature cards.', 'ft-blocks' ),
			),
			'price-list'        => array(
				'title'       => __( 'Price List', 'ft-blocks' ),
				'description' => __( 'Display pricing options with images, titles and prices.', 'ft-blocks' ),
			),
			'process-steps'     => array(
				'title'       => __( 'Process Steps', 'ft-blocks' ),
				'description' => __( 'Display step-by-step process with accordion and image gallery.', 'ft-blocks' ),
			),
			'about-me'          => array(
				'title'       => __( 'About Me', 'ft-blocks' ),
				'description' => __( 'Two-column layout with image and rich text content.', 'ft-blocks' ),
			),
			'blog-posts'        => array(
				'title'       => __( 'Blog Posts', 'ft-blocks' ),
				'description' => __( 'Display blog posts dynamically with customizable query options.', 'ft-blocks' ),
			),
			'faq'               => array(
				'title'       => __( 'FAQ', 'ft-blocks' ),
				'description' => __( 'Display frequently asked questions with accordions.', 'ft-blocks' ),
			),
			'cta-banner'        => array(
				'title'       => __( 'CTA Banner', 'ft-blocks' ),
				'description' => __( 'Full-width call-to-action banner with background image and buttons.', 'ft-blocks' ),
			),
			'testimonials'      => array(
				'title'       => __( 'Testimonials', 'ft-blocks' ),
				'description' => __( 'Display client testimonials in a slider with quotes and authors.', 'ft-blocks' ),
			),
			'gallery'           => array(
				'title'       => __( 'Gallery', 'ft-blocks' ),
				'description' => __( 'Display masonry grid images layout', 'ft-blocks' ),
			),
			'contact-form'      => array(
				'title'       => __( 'Contact Form', 'ft-blocks' ),
				'description' => __( 'Contact form block', 'ft-blocks' ),
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
 * Enqueue global styles for frontend and editor.
 *
 * @return void
 */
if ( ! function_exists( 'ft_blocks_enqueue_global_styles' ) ) {
	function ft_blocks_enqueue_global_styles() {
		$asset = ft_blocks_get_asset( 'style-ft-blocks-global-styles.css' );

		// only enqueue if file exists
		if ( file_exists( $asset['path'] ) ) {
			wp_enqueue_style(
				'ft-blocks-global-styles',
				$asset['url'],
				array(),
				$asset['version']
			);
		} elseif ( FT_BLOCKS_DEV_MODE ) {
            // @phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			error_log( 'FT Blocks: global styles file not found at ' . $asset['path'] );
		}
	}
}

add_action( 'wp_enqueue_scripts', 'ft_blocks_enqueue_global_styles' );
add_action( 'enqueue_block_assets', 'ft_blocks_enqueue_global_styles' );

/**
 * Set script translations for block editor.
 *
 * @return void
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

/**
 * Add a custom block category to the block editor.
 *
 * @param $categories array - Block categories.
 * @return array - Updated block categories.
 */
if ( ! function_exists( 'ft_blocks_add_custom_category' ) ) {
	function ft_blocks_add_custom_category( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'ft-blocks',
					'title' => _x( 'Fotografka Domča Blocks', 'block category name', 'ft-blocks' ),
					'icon'  => 'format-image',
				),
			)
		);
	}
}

add_filter( 'block_categories_all', 'ft_blocks_add_custom_category', 10, 2 );

/**
 * Inject custom color palette into the default origin.
 * Ensures colors are available in the block editor palette.
 *
 * @param WP_Theme_JSON $theme_json
 * @return WP_Theme_JSON
 */
if ( ! function_exists( 'ft_blocks_inject_colors_default' ) ) {
	function ft_blocks_inject_colors_default( $theme_json ) {
		$json_path = plugin_dir_path( __FILE__ ) . 'theme.json';

		if ( ! file_exists( $json_path ) ) {
			return $theme_json;
		}

		$plugin_data = wp_json_file_decode( $json_path, array( 'associative' => true ) );

		if ( empty( $plugin_data ) || empty( $plugin_data['settings']['color']['palette'] ) ) {
			return $theme_json;
		}

		$data = $theme_json->get_data();

		// force-enable default palette processing (helps in some hybrid/classic setups)
		$data['settings']['color']['defaultPalette'] = true;

		// merge into the 'theme' palette slot (visible in editor)
		$current_palette = $data['settings']['color']['palette']['theme'] ?? array();
		$existing_slugs  = array_column( $current_palette, 'slug' );

		foreach ( $plugin_data['settings']['color']['palette'] as $color ) {
			if ( ! in_array( $color['slug'], $existing_slugs, true ) ) {
				$current_palette[] = $color;
			}
		}

		$data['settings']['color']['palette']['theme'] = $current_palette;

		$theme_json->update_with( $data );

		return $theme_json;
	}
}

add_filter( 'wp_theme_json_data_default', 'ft_blocks_inject_colors_default', 20 );

/**
 * Inject custom color palette into the theme origin.
 * Helps force preset variable/class generation in Bricks + classic/hybrid environments.
 *
 * @param WP_Theme_JSON $theme_json
 * @return WP_Theme_JSON
 */
if ( ! function_exists( 'ft_blocks_inject_colors_theme' ) ) {
	function ft_blocks_inject_colors_theme( $theme_json ) {
		$json_path = plugin_dir_path( __FILE__ ) . 'theme.json';

		if ( ! file_exists( $json_path ) ) {
			return $theme_json;
		}

		$plugin_data = wp_json_file_decode( $json_path, array( 'associative' => true ) );

		if ( empty( $plugin_data ) || empty( $plugin_data['settings']['color']['palette'] ) ) {
			return $theme_json;
		}

		$data = $theme_json->get_data();

		// Force-enable default palette processing
		$data['settings']['color']['defaultPalette'] = true;

		$current_palette = $data['settings']['color']['palette']['theme'] ?? array();
		$existing_slugs  = array_column( $current_palette, 'slug' );

		foreach ( $plugin_data['settings']['color']['palette'] as $color ) {
			if ( ! in_array( $color['slug'], $existing_slugs, true ) ) {
				$current_palette[] = $color;
			}
		}

		$data['settings']['color']['palette']['theme'] = $current_palette;

		$theme_json->update_with( $data );

		return $theme_json;
	}
}

add_filter( 'wp_theme_json_data_theme', 'ft_blocks_inject_colors_theme', 20 );

/**
 * Enqueue custom color classes for block editor.
 *
 * @return void
 */
if ( ! function_exists( 'ft_blocks_enqueue_custom_color_classes' ) ) {
	function ft_blocks_enqueue_custom_color_classes() {
		$custom_colors = array(
			'ft-terakotova'        => '#d08a67',
			'ft-terakotova-tmava'  => '#b36137',
			'ft-terakotova-svetla' => '#e7c4b2',
		);

		$css = ":root {\n";

		foreach ( $custom_colors as $slug => $hex ) {
			$css .= "  --wp--preset--color--{$slug}: {$hex};\n";
		}

		$css .= "}\n\n";

		foreach ( $custom_colors as $slug => $hex ) {
			$css .= ".has-{$slug}-color { color: var(--wp--preset--color--{$slug}) !important; }\n";
			$css .= ".has-{$slug}-background-color { background-color: var(--wp--preset--color--{$slug}) !important; }\n";
			$css .= ".has-{$slug}-border-color { border-color: var(--wp--preset--color--{$slug}) !important; }\n\n";
		}

		wp_register_style(
			'ft-blocks-custom-colors',
			false,
			array(),
			ft_blocks_get_asset_version()
		);
		wp_enqueue_style( 'ft-blocks-custom-colors' );
		wp_add_inline_style( 'ft-blocks-custom-colors', $css );
	}
}

add_action( 'wp_enqueue_scripts', 'ft_blocks_enqueue_custom_color_classes' );
add_action( 'enqueue_block_editor_assets', 'ft_blocks_enqueue_custom_color_classes' );

/**
 * Enqueue frontend-only animation script
 *
 * @return void
 */
if ( ! function_exists( 'ft_blocks_enqueue_scripts' ) ) {
	function ft_blocks_enqueue_scripts() {
		if ( is_admin() ) {
			return;
		}

		$build_dir = 'build';
		$scripts   = array(
			'animations',
			'scroll-to-element',
		);

		foreach ( $scripts as $script ) {
			$script_asset_file = FT_BLOCKS_PATH . $build_dir . "/{$script}.asset.php";
			$script_js_file    = $build_dir . "/{$script}.js";

			if ( file_exists( $script_asset_file ) ) {
				$script_asset = include $script_asset_file;

				wp_enqueue_script(
					"ft-blocks-{$script}",
					FT_BLOCKS_URL . "/${build_dir}/${script}.js",
					$script_asset['dependencies'] ?? array(),
					ft_blocks_get_asset_version( $script_js_file ),
					true
				);
			}
		}
	}
}
add_action( 'wp_enqueue_scripts', 'ft_blocks_enqueue_scripts' );
