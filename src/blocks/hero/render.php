<?php
/**
 * Render callback for the Hero block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_hero_block' ) ) {
	function ft_blocks_render_hero_block( array $attributes ): string {
		[
			'baseBlock' => $base_class,
			'wrapper' => $wrapper_class,
			'container' => $container_class
		] = ft_blocks_get_config_classes();

		$block_class = $base_class . '-hero';
		$heading     = $attributes['heading'] ?? '';
		$text        = $attributes['text'] ?? '';
		$decor_text  = $attributes['decorText'] ?? '';
		$images      = $attributes['images'] ?? array();
		$button      = $attributes['button'] ?? '';
		$anchor_id   = $attributes['anchor'] ?? '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $block_class . ' ' . $wrapper_class,
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
			)
		);

		ob_start();
		?>

		<section
				<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php echo count( $images ) === 1 ? 'style="background-image: url(' . esc_url( $images[0]['url'] ) . ')"' : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		>
			<div class="<?php echo esc_attr( $block_class . '__container ' . $container_class ); ?>">
				<?php if ( ! empty( $heading ) ) : ?>
					<h1 class="<?php echo esc_attr( $block_class . '__heading' ); ?>">

						<?php if ( ! empty( $decor_text ) ) : ?>
							<span class="<?php echo esc_attr( $block_class . '__decor-text' ); ?>">
								<?php echo wp_kses_post( $decor_text ); ?>
							</span>
							<br>
						<?php endif; ?>

						<?php echo wp_kses_post( $heading ); ?>
					</h1>
				<?php endif; ?>

				<?php if ( ! empty( $text ) ) : ?>
					<p class="<?php echo esc_attr( $block_class . '__text' ); ?>">
						<?php echo wp_kses_post( $text ); ?>
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

			<?php if ( count( $images ) > 1 ) : ?>
				<div class="<?php echo esc_attr( $block_class . '__slider' ); ?>">
					<div class="swiper-wrapper" role="list">
						<?php foreach ( $images as $image ) : ?>
							<figure class="<?php echo esc_attr( $block_class . '__slide swiper-slide' ); ?>">
								<?php
								echo wp_get_attachment_image(
									$image['id'],
									'full',
									false,
									array(
										'loading' => 'lazy',
									)
								);
								?>
							</figure>
						<?php endforeach; ?>
					</div>

					<div class="<?php echo esc_attr( $block_class . '__pagination swiper-pagination' ); ?>"></div>
				</div>
			<?php endif; ?>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_hero_block($attributes); // phpcs:ignore