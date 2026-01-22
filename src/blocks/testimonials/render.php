<?php
/**
 * Render callback for the Testimonials block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_testimonials_block' ) ) {
	function ft_blocks_render_testimonials_block( array $attributes ): string {
		[
			'baseBlock'  => $base_class,
			'wrapper'    => $wrapper_class,
			'container'  => $container_class,
			'centered'   => $centered_class,
			'h2'         => $h2_class
		]     = ft_blocks_get_config_classes();
		$wave = ft_blocks_get_config( 'decorativeVectors.wave' );

		$block_class  = $base_class . '-testimonials';
		$heading      = $attributes['heading'] ?? '';
		$description  = $attributes['description'] ?? '';
		$testimonials = $attributes['testimonials'] ?? array();
		$button       = $attributes['button'] ?? '';
		$anchor_id    = $attributes['anchor'] ?? '';

		if ( empty( $testimonials ) ) {
			return '';
		}

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

				<div class="<?php echo esc_attr( $block_class . '__header ' . $centered_class ); ?>">
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
				</div>


				<?php if ( count( $testimonials ) > 1 ) : ?>
				<div
						class="<?php echo esc_attr( $block_class . '__slider' ); ?>"
						data-posts-count="<?php echo esc_attr( count( $testimonials ) ); ?>"
				>
					<div class="<?php echo esc_attr( $block_class . '__slides swiper-wrapper' ); ?>">
						<?php foreach ( $testimonials as $testimonial ) : ?>
							<div
								class="<?php echo esc_attr( $block_class . '__slide swiper-slide ' . $centered_class ); ?>"
							>
								<?php if ( ! empty( $testimonial['quote'] ) ) : ?>
									<blockquote class="<?php echo esc_attr( $block_class . '__quote' ); ?>">
										“<?php echo wp_kses_post( $testimonial['quote'] ); ?>”
									</blockquote>
								<?php endif; ?>

								<span class="<?php echo esc_attr( $block_class . '__decor' ); ?>"></span>

								<?php if ( ! empty( $testimonial['author'] ) ) : ?>
									<cite class="<?php echo esc_attr( $block_class . '__author' ); ?>">
										<?php echo esc_html( $testimonial['author'] ); ?>
									</cite>
								<?php endif; ?>
							</div>
						<?php endforeach; ?>
					</div>

					<div class="<?php echo esc_attr( $block_class . '__pagination swiper-pagination' ); ?>"></div>
					<div class="<?php echo esc_attr( $block_class . '__nav' ); ?>">
						<button
								class="<?php echo esc_attr( $block_class . '__nav-prev' ); ?>"
								aria-label="<?php esc_attr_e( 'Previous slide', 'ft-blocks' ); ?>"
						></button>
						<button
								class="<?php echo esc_attr( $block_class . '__nav-next' ); ?>"
								aria-label="<?php esc_attr_e( 'Next slide', 'ft-blocks' ); ?>"
						></button>
					</div>
				</div>
				<?php endif; ?>

				<?php if ( ! empty( $button ) ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__footer ' . $centered_class ); ?>">
						<?php
						echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							array(
								'content'    => $button,
								'base_class' => $block_class,
								'variant'    => 'secondary',
							)
						);
						?>
					</div>
				<?php endif; ?>

			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_testimonials_block( $attributes ); // phpcs:ignore