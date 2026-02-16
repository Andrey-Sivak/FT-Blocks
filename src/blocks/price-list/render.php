<?php
/**
 * Render callback for the Price List block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_price_list_block' ) ) {
	function ft_blocks_render_price_list_block( array $attributes ): string {
		[
			'baseBlock'  => $base_class,
			'wrapper'    => $wrapper_class,
			'container'  => $container_class,
			'centered'   => $centered_class,
			'h2'         => $h2_class,
			'h3'         => $h3_class,
				'animated'         => $animation_class
		] = ft_blocks_get_config_classes();

		$block_class = $base_class . '-price-list';
		$heading     = $attributes['heading'] ?? '';
		$items       = $attributes['items'] ?? array();
		$button      = $attributes['button'] ?? '';
		$anchor_id   = $attributes['anchor'] ?? '';

		if ( empty( $items ) ) {
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
			<div class="<?php echo esc_attr( $block_class . '__container ' . $container_class ); ?>">

				<?php if ( ! empty( $heading ) || ! empty( $decor_text ) ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__header' ); ?>">
						<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class . ' ' . $centered_class . ' ' . $animation_class ); ?>">
							<?php echo wp_kses_post( $heading ); ?>
						</h2>
					</div>
				<?php endif; ?>

				<div class="<?php echo esc_attr( $block_class . '__grid' ); ?>">
					<?php foreach ( $items as $item ) : ?>
						<article class="<?php echo esc_attr( $block_class . '__item ' . $animation_class ); ?>">
							<header class="<?php echo esc_attr( $block_class . '__item-header' ); ?>">
								<div class="<?php echo esc_attr( $block_class . '__item-header-inner' ); ?>">
									<?php if ( ! empty( $item['title'] ) ) : ?>
										<h3 class="<?php echo esc_attr( $block_class . '__item-title ' . $h3_class ); ?>">
											<?php echo wp_kses_post( $item['title'] ); ?>
										</h3>
									<?php endif; ?>
									<?php if ( ! empty( $item['annotation'] ) ) : ?>
										<p class="<?php echo esc_attr( $block_class . '__item-annotation' ); ?>">
											<?php echo wp_kses_post( $item['annotation'] ); ?>
										</p>
									<?php endif; ?>
								</div>
								<div
										class="<?php echo esc_attr( $block_class . '__item-header-helper' ); ?>"
										aria-hidden="true"
								>
									<p class="<?php echo esc_attr( $block_class . '__item-title ' . $h3_class ); ?>">
										A
										<br>
										A
									</p>
									<p class="<?php echo esc_attr( $block_class . '__item-annotation' ); ?>">
										A
									</p>
								</div>
							</header>

							<div class="<?php echo esc_attr( $block_class . '__item-content' ); ?>">

								<?php if ( ! empty( $item['image']['id'] ) ) : ?>
									<figure class="<?php echo esc_attr( $block_class . '__item-image' ); ?>">
										<?php
										echo wp_get_attachment_image(
											$item['image']['id'],
											'medium',
											false,
											array( 'loading' => 'lazy' )
										);
										?>
									</figure>
								<?php endif; ?>

								<?php if ( ! empty( $item['price'] ) ) : ?>
									<p class="<?php echo esc_attr( $block_class . '__item-price' ); ?>">
										<?php echo wp_kses_post( $item['price'] ); ?>
									</p>
								<?php endif; ?>
							</div>

							<?php if ( ! empty( $item['shortText'] ) ) : ?>
								<footer class="<?php echo esc_attr( $block_class . '__item-footer' ); ?>">
                                    <p class="<?php echo esc_attr( $block_class . '__item-short-text' ); ?>">
                                        <?php echo wp_kses_post( $item['shortText'] ); ?>
                                    </p>

                                    <?php if ( ! empty( $item['details'] ) ) : ?>
                                    <div class="<?php echo esc_attr( $block_class . '__item-details-wrap' ); ?>">
                                        <p class="<?php echo esc_attr( $block_class . '__item-details' ); ?>">
                                            <?php echo wp_kses_post( $item['details'] ); ?>
                                        </p>
                                        <p class="<?php echo esc_attr( $block_class . '__item-details-label' ); ?>">
                                            <?php echo esc_html__( 'More details', 'ft-blocks' ); ?>
                                        </p>
                                    </div>
                                    <?php endif; ?>
								</footer>
							<?php endif; ?>
						</article>
					<?php endforeach; ?>
				</div>

				<?php if ( ! empty( $button ) ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__footer ' . $centered_class . ' ' . $animation_class ); ?>">
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

echo ft_blocks_render_price_list_block( $attributes ); // phpcs:ignore