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

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Define Constants
 */
define('FT_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('FT_BLOCKS_URL', plugin_dir_url(__FILE__));

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it also registers the assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function ft_blocks_init()
{
	// Register all blocks in the build directory
	// logic: we will iterate over subfolders in build/blocks if we structure it that way,
	// or manually register specific blocks if they are distinct.
	// For now, let's look for known blocks.

	$blocks = array(
		'hero',
	);

	foreach ($blocks as $block) {
		// We will target the build directory for block.json
		register_block_type(FT_BLOCKS_PATH . 'build/blocks/' . $block);
	}
}
add_action('init', 'ft_blocks_init');
