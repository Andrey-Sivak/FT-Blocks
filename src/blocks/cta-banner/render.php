<?php
/**
 * Render callback for the CTA Banner block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_cta_banner_block' ) ) {
	function ft_blocks_render_cta_banner_block( array $attributes ): string {
		[
			'baseBlock'  => $base_class,
			'container'  => $container_class,
			'centered'   => $centered_class,
			'h2'         => $h2_class,
			'animated-scale' => $animation_scale_class
		] = ft_blocks_get_config_classes();

		$block_class      = $base_class . '-cta-banner';
		$heading          = $attributes['heading'] ?? '';
		$description      = $attributes['description'] ?? '';
		$buttons          = $attributes['buttons'] ?? array();
		$background_image = $attributes['backgroundImage'] ?? array();
		$anchor_id        = $attributes['anchor'] ?? '';

		$style = '';
		if ( ! empty( $background_image['url'] ) ) {
			$style = 'background-image: url(' . esc_url( $background_image['url'] ) . ')';
		}

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $block_class,
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
			)
		);

		ob_start();
		?>

		<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<div
					class="<?php echo esc_attr( $block_class . '__container ' . $container_class . ' ' . $centered_class . ' ' . $animation_scale_class ); ?>"
					style="<?php echo esc_attr( $style ); ?>"
			>

				<?php if ( ! empty( $heading ) ) : ?>
					<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class ); ?>">
						<?php echo wp_kses_post( $heading ); ?>
					</h2>
				<?php endif; ?>

				<?php if ( ! empty( $description ) ) : ?>
					<p class="<?php echo esc_attr( $block_class . '__description' ); ?>">
						<?php echo wp_kses_post( $description ); ?>
					</p>
				<?php endif; ?>

				<?php if ( ! empty( $buttons ) ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__buttons' ); ?>">
						<?php foreach ( $buttons as $button ) : ?>
							<?php if ( ! empty( $button['text'] ) ) : ?>
								<?php
								echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									array(
										'content'    => $button['text'],
										'base_class' => $block_class,
										'variant'    => 'primary',
									)
								);
								?>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_cta_banner_block( $attributes ); // phpcs:ignore