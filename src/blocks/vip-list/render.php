<?php
/**
 * Render callback for the VIP List block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_vip_list_block' ) ) {
	function ft_blocks_render_vip_list_block( array $attributes ): string {
		[
			'baseBlock'      => $base_class,
			'wrapper'        => $wrapper_class,
			'container'      => $container_class,
			'h2'             => $h2_class,
			'h3'             => $h3_class,
			'animated'       => $animation_class,
			'animated-scale' => $animation_scale_class
		]     = ft_blocks_get_config_classes();
		$wave = ft_blocks_get_config( 'decorativeVectors.wave' );

		$block_class   = $base_class . '-vip-list';
		$heading       = $attributes['heading'] ?? '';
		$left_text     = $attributes['leftText'] ?? '';
		$right_heading = $attributes['rightHeading'] ?? '';
		$right_text    = $attributes['rightText'] ?? '';
		$button        = $attributes['button'] ?? '';
		$features      = $attributes['features'] ?? array();
		$anchor_id     = $attributes['anchor'] ?? '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $block_class . ' ' . $wrapper_class,
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
			)
		);

		ob_start();
		?>

		<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>

			<figure
					class="<?php echo esc_attr( $block_class . '__decorative-vector' ); ?>" aria-hidden="true"
			>
				<?php echo wp_kses( $wave, ft_blocks_get_svg_allowed_html() ); ?>
			</figure>

			<div class="<?php echo esc_attr( $block_class . '__container ' . $container_class ); ?>">

				<div class="<?php echo esc_attr( $block_class . '__top' ); ?>">
					<div class="<?php echo esc_attr( $block_class . '__top-left ' . $animation_class ); ?>">
						<?php if ( ! empty( $heading ) ) : ?>
							<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class ); ?>">
								<?php echo wp_kses_post( $heading ); ?>
							</h2>
						<?php endif; ?>

						<?php if ( ! empty( $left_text ) ) : ?>
							<p class="<?php echo esc_attr( $block_class . '__text' ); ?>">
								<?php echo wp_kses_post( $left_text ); ?>
							</p>
						<?php endif; ?>
					</div>

					<div class="<?php echo esc_attr( $block_class . '__top-right ' . $animation_class ); ?>">
						<?php if ( ! empty( $right_heading ) ) : ?>
							<h3 class="<?php echo esc_attr( $block_class . '__top-right_heading ' . $h3_class ); ?>">
								<?php echo wp_kses_post( $right_heading ); ?>
							</h3>
						<?php endif; ?>

						<?php if ( ! empty( $right_text ) ) : ?>
							<p class="<?php echo esc_attr( $block_class . '__text' ); ?>">
								<?php echo wp_kses_post( $right_text ); ?>
							</p>
						<?php endif; ?>

						<?php
						echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							array(
								'content'    => $button,
								'base_class' => $block_class,
								'variant'    => 'primary',
							)
						);
						?>
					</div>
				</div>

				<?php if ( ! empty( $features ) ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__features' ); ?>">
						<?php foreach ( $features as $feature ) : ?>
							<div class="<?php echo esc_attr( $block_class . '__feature ' . $animation_class ); ?>">

									<figure
										class="<?php echo esc_attr( $block_class . '__feature-icon ' . $animation_scale_class ); ?>"
										aria-hidden="true"
									>
										<?php echo ft_blocks_get_icon( 'star' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
									</figure>

								<?php if ( ! empty( $feature['title'] ) ) : ?>
									<h4 class="<?php echo esc_attr( $block_class . '__feature-title ' . $h3_class ); ?>">
										<?php echo wp_kses_post( $feature['title'] ); ?>
									</h4>
								<?php endif; ?>

								<?php if ( ! empty( $feature['text'] ) ) : ?>
									<p class="<?php echo esc_attr( $block_class . '__feature-text' ); ?>">
										<?php echo wp_kses_post( $feature['text'] ); ?>
									</p>
								<?php endif; ?>
							</div>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_vip_list_block( $attributes ); // phpcs:ignore