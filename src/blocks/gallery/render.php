<?php
/**
 * Render callback for the Gallery block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_gallery_block' ) ) {
	function ft_blocks_render_gallery_block( array $attributes ): string {
		['baseBlock' => $base_class] = ft_blocks_get_config_classes();

		$block_class = $base_class . '-gallery';
		$images      = $attributes['images'] ?? array();
		$anchor_id   = $attributes['anchor'] ?? '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $block_class,
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
			)
		);

		ob_start();
		?>

		<section
				<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		>
			<?php if ( count( $images ) > 1 ) : ?>
				<div class="<?php echo esc_attr( $block_class . '__images grid js-masonry' ); ?>">

					<?php foreach ( $images as $image ) : ?>
						<figure class="<?php echo esc_attr( $block_class . '__image grid-item' ); ?>">
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
			<?php endif; ?>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_gallery_block($attributes); // phpcs:ignore