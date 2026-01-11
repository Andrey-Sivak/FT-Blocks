<?php
/**
 * Render callback for the Hero block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_hero_block' ) ) {
	function ft_blocks_render_hero_block( array $attributes ): string {
		$heading     = $attributes['heading'] ?? '';
		$sub_heading = $attributes['subHeading'] ?? '';
		$cta_text    = $attributes['ctaText'] ?? '';
		$cta_url     = $attributes['ctaUrl'] ?? '';
		$anchor_id   = $attributes['anchor'] ?? '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => 'ft-hero-block',
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
			)
		);

		ob_start();
		?>
		<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<div class="ft-hero-content">
				<?php if ( $heading ) : ?>
					<h1 class="ft-hero-heading">
						<?php echo wp_kses_post( $heading ); ?>
					</h1>
				<?php endif; ?>

				<?php if ( $sub_heading ) : ?>
					<p class="ft-hero-subheading">
						<?php echo wp_kses_post( $sub_heading ); ?>
					</p>
				<?php endif; ?>

				<?php if ( $cta_text && $cta_url ) : ?>
					<div class="wp-block-button">
						<a class="wp-block-button__link" href="<?php echo esc_url( $cta_url ); ?>">
							<?php echo esc_html( $cta_text ); ?>
						</a>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_hero_block($attributes); // phpcs:ignore