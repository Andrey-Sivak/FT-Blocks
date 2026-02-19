<?php
/**
 * Render callback for the About Me block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_about_me_block' ) ) {
	function ft_blocks_render_about_me_block( array $attributes ): string {
		[
			'baseBlock'      => $base_class,
			'wrapper'        => $wrapper_class,
			'container'      => $container_class,
			'h2'             => $h2_class,
			'animated'       => $animation_class,
			'animated-scale' => $animation_scale_class
		]               = ft_blocks_get_config_classes();
		$instagram_icon = ft_blocks_get_config( 'icons.instagram' );

		$block_class      = $base_class . '-about-me';
		$heading          = $attributes['heading'] ?? '';
		$content          = $attributes['content'] ?? '';
		$instagram_handle = $attributes['instagramHandle'] ?? '';
		$images           = $attributes['images'] ?? array();
		$background_image = $attributes['backgroundImage'] ?? array();
		$anchor_id        = $attributes['anchor'] ?? '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $block_class,
				'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
				'style' => 'background-image: url(' . esc_url( $background_image['url'] ) . ');',
			)
		);

		ob_start();
		?>

		<section 
		<?php
		echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
		>
			<div class="<?php echo esc_attr( $block_class . '__inner ' . $wrapper_class ); ?>">

				<div class="<?php echo esc_attr( $block_class . '__container ' . $container_class ); ?>">

					<div class="<?php echo esc_attr( $block_class . '__slider ' . $animation_scale_class ); ?>">
						<?php if ( ! empty( $images ) ) : ?>
							<div class="swiper-wrapper" role="list">
								<?php foreach ( $images as $image ) : ?>
									<figure class="<?php echo esc_attr( $block_class . '__slide swiper-slide' ); ?>">
										<a
												href="<?php echo esc_url( wp_get_attachment_image_url( $image['id'], 'full' ) ); ?>"
												data-fslightbox="about"
										>
											<?php
											echo wp_get_attachment_image(
												$image['id'],
												'large',
												false,
												array(
													'loading' => 'lazy',
												)
											);
											?>
										</a>
									</figure>
								<?php endforeach; ?>
							</div>

							<div class="<?php echo esc_attr( $block_class . '__pagination swiper-pagination' ); ?>"></div>
						<?php endif; ?>
					</div>

					<div class="<?php echo esc_attr( $block_class . '__content' ); ?>">
						<?php if ( ! empty( $heading ) ) : ?>
							<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class . ' ' . $animation_class ); ?>">
								<?php echo wp_kses_post( $heading ); ?>
							</h2>
						<?php endif; ?>

						<?php if ( ! empty( $content ) ) : ?>
							<div class="<?php echo esc_attr( $block_class . '__text ' . $animation_class ); ?>">
								<?php echo wp_kses_post( $content ); ?>
							</div>
						<?php endif; ?>

						<?php if ( ! empty( $instagram_handle ) ) : ?>
						<a
                                href="https://www.instagram.com/<?php echo esc_attr( $instagram_handle ); ?>"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="<?php echo esc_attr( $block_class . '__instagram-handle ' . $animation_class ); ?>"
                        >
                            <div class="<?php echo esc_attr( $block_class . '__instagram-handle_icon' ); ?>">
                                <?php echo wp_kses( $instagram_icon, ft_blocks_get_svg_allowed_html() ); ?>
                            </div>
                            <p
                                    class="<?php echo esc_attr( $block_class . '__instagram-handle_text' ); ?>"
                            >
                                @<?php echo esc_attr( $instagram_handle ); ?>
                            </p>
						</a>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_about_me_block($attributes); // phpcs:ignore