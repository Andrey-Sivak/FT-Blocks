<?php
/**
 * Render callback for the Photo Shoot Types block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_photo_shoot_types_block' ) ) {
	function ft_blocks_render_photo_shoot_types_block( array $attributes ): string {
		[
			'baseBlock'      => $base_class,
			'wrapper'        => $wrapper_class,
			'container'      => $container_class,
			'centered'       => $centered_class,
			'h2'             => $h2_class,
			'animated'       => $animation_class,
			'animated-scale' => $animation_scale_class
		] = ft_blocks_get_config_classes();

		$block_class = $base_class . '-photo-shoot-types';
		$heading     = $attributes['heading'] ?? '';
		$description = $attributes['description'] ?? '';
		$tabs        = $attributes['tabs'] ?? array();
		$active_tab  = 0;
		$anchor_id   = $attributes['anchor'] ?? '';

		if ( empty( $tabs ) ) {
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

				<div class="<?php echo esc_attr( $block_class . '__header' ); ?>">
					<?php if ( ! empty( $heading ) ) : ?>
						<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class . ' ' . $centered_class . ' ' . $animation_class ); ?>">
							<?php echo wp_kses_post( $heading ); ?>
						</h2>
					<?php endif; ?>

					<?php if ( ! empty( $description ) ) : ?>
						<p class="<?php echo esc_attr( $block_class . '__description ' . $animation_class ); ?>">
							<?php echo wp_kses_post( $description ); ?>
						</p>
					<?php endif; ?>
				</div>

				<div class="<?php echo esc_attr( $animation_scale_class ); ?>">
				<div class="<?php echo esc_attr( $block_class . '__tabs-nav' ); ?>" role="tablist">
					<?php foreach ( $tabs as $index => $tab ) : ?>
						<button
							type="button"
							class="<?php echo esc_attr( $block_class . '__tab-button' ); ?><?php echo $index === $active_tab ? ' is-active' : ''; ?>"
							role="tab"
							aria-selected="<?php echo $index === $active_tab ? 'true' : 'false'; ?>"
							aria-controls="<?php echo esc_attr( $block_class . '__panel-' . $index ); ?>"
							data-tab-index="<?php echo esc_attr( $index ); ?>"
						>
							<?php echo esc_html( $tab['tabLabel'] ?? '' ); ?>
						</button>
					<?php endforeach; ?>
				</div>

				<div class="<?php echo esc_attr( $block_class . '__tabs-content' ); ?>">
					<?php foreach ( $tabs as $index => $tab ) : ?>
						<div
							class="<?php echo esc_attr( $block_class . '__tab-panel' ); ?><?php echo $index === $active_tab ? ' is-active' : ''; ?>"
							id="<?php echo esc_attr( $block_class . '__panel-' . $index ); ?>"
							role="tabpanel"
						>
							<?php if ( ! empty( $tab['image']['id'] ) ) : ?>
								<figure class="<?php echo esc_attr( $block_class . '__tab-image' ); ?>">
									<?php
									echo wp_get_attachment_image(
										$tab['image']['id'],
										'large',
										false,
										array(
											'loading' => 'lazy',
										)
									);
									?>
								</figure>
							<?php endif; ?>

							<div class="<?php echo esc_attr( $block_class . '__tab-info' ); ?>">
								<?php if ( ! empty( $tab['title'] ) ) : ?>
									<h3 class="<?php echo esc_attr( $block_class . '__tab-title' ); ?>">
										<?php echo wp_kses_post( $tab['title'] ); ?>
									</h3>
								<?php endif; ?>

								<?php if ( ! empty( $tab['text'] ) ) : ?>
									<p class="<?php echo esc_attr( $block_class . '__tab-text' ); ?>">
										<?php echo wp_kses_post( $tab['text'] ); ?>
									</p>
								<?php endif; ?>

								<?php
								echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									array(
										'content'    => $tab['button'] ?? '',
										'base_class' => $block_class,
										'variant'    => 'primary',
									)
								);
								?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
				</div>
			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_photo_shoot_types_block( $attributes ); // phpcs:ignore