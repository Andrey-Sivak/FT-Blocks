<?php
/**
 * Render callback for the Contact Form block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_contact_form_block' ) ) {
	function ft_blocks_render_contact_form_block( array $attributes ): string {
		[
				'baseBlock' => $base_class,
				'wrapper' => $wrapper_class,
				'container' => $container_class,
				'h2' => $h2_class,
				'animated' => $animation_class
		] = ft_blocks_get_config_classes();

		$block_class    = $base_class . '-contact-form';
		$heading        = $attributes['heading'] ?? '';
		$form_shortcode = $attributes['formShortcode'] ?? '';
		$anchor_id      = $attributes['anchor'] ?? '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $block_class . ' ' . $wrapper_class,
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
			)
		);

		ob_start();
		?>
		<section
				<?php
				echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
		>
			<div class="<?php echo esc_attr( $block_class . '__container ' . $container_class ); ?>">

				<?php if ( ! empty( $form_shortcode ) ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__form ' . $animation_class ); ?>">

						<div
								class="<?php echo esc_attr( $block_class . '__form_loading' ); ?>"
								role="status"
								aria-live="polite"
						>
							<?php include FT_BLOCKS_PATH . 'templates/form-loading-svg.php'; ?>
							<span class="screen-reader-text">
								<?php echo esc_html__( 'Loading form submission', 'ft-blocks' ); ?>
							</span>
						</div>
						<div
								class="<?php echo esc_attr( $block_class . '__form_success' ); ?>"
								role="status"
								aria-live="polite"
						>
							<?php include FT_BLOCKS_PATH . 'templates/form-success-svg.php'; ?>
							<p class="<?php echo esc_attr( $block_class . '__form_success-text' ); ?>">
								<?php echo esc_html__( 'Form submitted successfully!', 'ft-blocks' ); ?>
								<br>
								<?php echo esc_html__( 'I will get back to you soon ❤️', 'ft-blocks' ); ?>
							</p>
							<span class="screen-reader-text">
								<?php echo esc_html__( 'Form submitted successfully', 'ft-blocks' ); ?>
							</span>
						</div>

						<?php if ( ! empty( $heading ) ) : ?>
							<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class ); ?>">
								<?php echo wp_kses_post( $heading ); ?>
							</h2>
						<?php endif; ?>

						<?php echo do_shortcode( $form_shortcode ); ?>
					</div>
				<?php endif; ?>
			</div>
		</section>
		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_contact_form_block($attributes); // phpcs:ignore