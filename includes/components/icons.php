<?php
/**
 * Shared SVG icons - reads from config.json.
 *
 * @package FT_Blocks
 */

if ( ! function_exists( 'ft_blocks_get_svg_allowed_html' ) ) {
	/**
	 * Get allowed HTML tags and attributes for SVG sanitization.
	 *
	 * @return array Allowed HTML configuration for wp_kses.
	 */
	function ft_blocks_get_svg_allowed_html(): array {
		return array(
			'svg'     => array(
				'class'               => true,
				'xmlns'               => true,
				'width'               => true,
				'height'              => true,
				'viewbox'             => true,
				'fill'                => true,
				'stroke'              => true,
				'stroke-width'        => true,
				'stroke-linecap'      => true,
				'stroke-linejoin'     => true,
				'aria-hidden'         => true,
				'role'                => true,
				'focusable'           => true,
				'preserveaspectratio' => true,
			),
			'path'    => array(
				'd'            => true,
				'fill'         => true,
				'stroke'       => true,
				'stroke-width' => true,
				'fill-rule'    => true,
				'clip-rule'    => true,
				'class'        => true,
			),
			'circle'  => array(
				'cx'           => true,
				'cy'           => true,
				'r'            => true,
				'fill'         => true,
				'stroke'       => true,
				'stroke-width' => true,
				'class'        => true,
			),
			'rect'    => array(
				'x'            => true,
				'y'            => true,
				'width'        => true,
				'height'       => true,
				'rx'           => true,
				'ry'           => true,
				'fill'         => true,
				'stroke'       => true,
				'stroke-width' => true,
				'class'        => true,
			),
			'line'    => array(
				'x1'           => true,
				'y1'           => true,
				'x2'           => true,
				'y2'           => true,
				'stroke'       => true,
				'stroke-width' => true,
				'class'        => true,
			),
			'polygon' => array(
				'points' => true,
				'fill'   => true,
				'stroke' => true,
				'class'  => true,
			),
			'g'       => array(
				'fill'      => true,
				'transform' => true,
				'class'     => true,
			),
            'defs' => array(
                'class' => true,
                'id'    => true,
            ),
            'lineargradient' => array(
                'id'                => true,
                'x1'                => true,
                'y1'                => true,
                'x2'                => true,
                'y2'                => true,
                'gradientunits'     => true,
                'gradienttransform' => true,
                'spreadmethod'      => true,
            ),
            'radialgradient' => array(
                'id'                => true,
                'cx'                => true,
                'cy'                => true,
                'r'                 => true,
                'fx'                => true,
                'fy'                => true,
                'xlink:href'        => true,
                'href'              => true,
                'gradientunits'     => true,
                'gradienttransform' => true,
                'spreadmethod'      => true,
            ),
            'stop' => array(
                'offset'       => true,
                'stop-color'   => true,
                'stop-opacity' => true,
            ),
		);
	}
}

if ( ! function_exists( 'ft_blocks_get_icons' ) ) {
	/**
	 * Get all available icons from config.
	 *
	 * @return array Associative array of icon names and SVG markup.
	 */
	function ft_blocks_get_icons(): array {
		$icons = ft_blocks_get_config( 'icons' );

		return is_array( $icons ) ? $icons : array();
	}
}

if ( ! function_exists( 'ft_blocks_get_icon' ) ) {
	/**
	 * Get sanitized SVG icon by name.
	 *
	 * @param string $name       Icon name.
	 * @param array  $attributes Optional. SVG attributes to add/override.
	 * @return string Sanitized SVG markup.
	 */
	function ft_blocks_get_icon( string $name, array $attributes = array() ): string {
		$icons = ft_blocks_get_icons();

		if ( ! isset( $icons[ $name ] ) ) {
			return '';
		}

		$svg = $icons[ $name ];

		// Add/override attributes
		foreach ( $attributes as $attr => $value ) {
			$pattern = '/' . preg_quote( $attr, '/' ) . '="[^"]*"/';

			if ( preg_match( $pattern, $svg ) ) {
				$svg = preg_replace( $pattern, $attr . '="' . esc_attr( $value ) . '"', $svg );
			} else {
				$svg = preg_replace( '/<svg/', '<svg ' . $attr . '="' . esc_attr( $value ) . '"', $svg );
			}
		}

		return wp_kses( $svg, ft_blocks_get_svg_allowed_html() );
	}
}
