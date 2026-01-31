<?php
/**
 * Render callback for the Service Info block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_service_info_block' ) ) {

	/**
	 * Render image figure element.
	 *
	 * @param array  $image       Image data with 'id' key.
	 * @param string $class_name  Block class for BEM naming.
	 * @param string $size        Image size. Default 'large'.
	 * @return string
	 */
	function ft_blocks_service_info_render_image( array $image, string $class_name, string $size = 'large' ): string {
		if ( empty( $image['id'] ) ) {
			return '';
		}

		ob_start();
		?>
		<figure class="<?php echo esc_attr( $class_name ); ?>">
			<?php
			echo wp_get_attachment_image(
				$image['id'],
				$size,
				false,
				array( 'loading' => 'lazy' )
			);
			?>
		</figure>
		<?php
		return ob_get_clean();
	}

	function ft_blocks_render_service_info_block( array $attributes ): string {
		[
			'baseBlock'      => $base_class,
			'h2'             => $h2_class,
			'animated-scale' => $animation_scale_class
		] = ft_blocks_get_config_classes();

		$block_class = $base_class . '-service-info';
		$heading     = $attributes['heading'] ?? '';
		$text        = $attributes['text'] ?? '';
		$images      = $attributes['images'] ?? array();
		$buttons     = $attributes['buttons'] ?? array();
		$anchor_id   = $attributes['anchor'] ?? '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $block_class,
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
			)
		);

		ob_start();
		?>

		<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>

			<div class="<?php echo esc_attr( $block_class . '__bg-wrapper' ); ?>">
				<?php foreach ( $images as $index => $image ) : ?>
					<div
							class="<?php echo esc_attr( $block_class . '__bg-item' . ( 0 === $index ? ' is-active' : '' ) ); ?>"
							data-index="<?php echo esc_attr( $index ); ?>"
					>
						<?php
						echo ft_blocks_service_info_render_image( $image, $block_class . '__bg-img', 'full' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						?>
					</div>
				<?php endforeach; ?>
			</div>

			<div class="<?php echo esc_attr( $block_class . '__container ' . $animation_scale_class ); ?>">

				<div class="<?php echo esc_attr( $block_class . '__content' ); ?>">
					<?php if ( ! empty( $heading ) ) : ?>
						<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class ); ?>">
							<?php echo wp_kses_post( $heading ); ?>
						</h2>
					<?php endif; ?>

					<?php if ( ! empty( $text ) ) : ?>
						<p class="<?php echo esc_attr( $block_class . '__text' ); ?>">
							<?php echo wp_kses_post( $text ); ?>
						</p>
					<?php endif; ?>

					<?php if ( ! empty( $buttons ) ) : ?>
						<div class="<?php echo esc_attr( $block_class . '__buttons' ); ?>">
							<?php foreach ( $buttons as $button ) : ?>
								<?php
								echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									array(
										'content'    => $button['text'] ?? '',
										'base_class' => $block_class,
										'variant'    => 'primary',
									)
								);
								?>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>

				<?php if ( count( $images ) > 1 ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__slider' ); ?>">
						<div class="swiper-wrapper" role="list">
							<?php
							foreach ( $images as $image ) {
								echo ft_blocks_service_info_render_image( $image, $block_class . '__image swiper-slide', 'full' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							}
							?>
						</div>
						<div class="<?php echo esc_attr( $block_class . '__arrow swiper-button-next' ); ?>"></div>
						<div class="<?php echo esc_attr( $block_class . '__arrow swiper-button-prev' ); ?>"></div>
						<div class="<?php echo esc_attr( $block_class . '__pagination swiper-pagination' ); ?>"></div>
					</div>
				<?php endif; ?>
			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_service_info_block( $attributes ); // phpcs:ignore