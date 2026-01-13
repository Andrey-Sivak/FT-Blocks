<?php
/**
 * Button component
 *
 * @package FT_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render a button component
 *
 * @param array $args {
 *     Button arguments.
 *
 *     @type string $content      Button text/HTML content.
 *     @type string $base_class   Base class for the button.
 *     @type string $variant      Button variant (primary, secondary, tertiary). Default 'primary'.
 *     @type array  $extra_classes Additional CSS classes.
 * }
 * @return string Button HTML or empty string.
 */
function ft_blocks_render_button( array $args ): string {
	if ( empty( $args['content'] ) ) {
		return '';
	}

	['button' => $button_class ] = ft_blocks_get_config_classes();

	$defaults = array(
		'content'       => '',
		'base_class'    => '',
		'variant'       => 'primary',
		'extra_classes' => array(),
	);

	$args = wp_parse_args( $args, $defaults );

	$classes = array_filter(
		array_merge(
			array(
				$args['base_class'] ? $args['base_class'] . '__button' : '',
				$button_class,
				$button_class . '-' . $args['variant'],
			),
			(array) $args['extra_classes']
		)
	);

	$attr_string = sprintf( 'class="%s"', esc_attr( implode( ' ', $classes ) ) );

	return sprintf(
		'<p %1$s>%2$s</p>',
		$attr_string,
		wp_kses_post( $args['content'] )
	);
}
