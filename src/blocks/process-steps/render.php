<?php
/**
 * Render callback for the Process Steps block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_process_steps_block' ) ) {
	function ft_blocks_render_process_steps_block( array $attributes ): string {
		[
			'baseBlock'  => $base_class,
			'wrapper'    => $wrapper_class,
			'container'  => $container_class,
			'h2'         => $h2_class,
			'h3'         => $h3_class,
		]     = ft_blocks_get_config_classes();
		$wave = ft_blocks_get_config( 'decorativeVectors.wave' );

		$block_class  = $base_class . '-process-steps';
		$heading      = $attributes['heading'] ?? '';
		$steps        = $attributes['steps'] ?? array();
		$images       = $attributes['images'] ?? array();
		$left_button  = $attributes['leftButton'] ?? '';
		$right_button = $attributes['rightButton'] ?? '';
		$anchor_id    = $attributes['anchor'] ?? '';
		$active_step  = 0;

		if ( empty( $steps ) ) {
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

				<?php if ( ! empty( $heading ) ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__header' ); ?>">
						<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class ); ?>">
							<?php echo wp_kses_post( $heading ); ?>
						</h2>
					</div>
				<?php endif; ?>

				<div class="<?php echo esc_attr( $block_class . '__content' ); ?>">

					<div class="<?php echo esc_attr( $block_class . '__steps' ); ?>">
						<?php foreach ( $steps as $index => $step ) : ?>
							<div
								class="<?php echo esc_attr( $block_class . '__step' ); ?><?php echo $index === $active_step ? ' is-active' : ''; ?>"
								data-step-index="<?php echo esc_attr( $index ); ?>"
							>
								<div class="<?php echo esc_attr( $block_class . '__step-header' ); ?>">
									<span class="<?php echo esc_attr( $block_class . '__step-number' ); ?>">
										<?php echo esc_html( $index + 1 ); ?>.
									</span>
									<span class="<?php echo esc_attr( $block_class . '__step-label' ); ?>">
										<?php esc_html_e( 'step', 'ft-blocks' ); ?>
									</span>
								</div>

								<button
									type="button"
									class="<?php echo esc_attr( $block_class . '__step-toggle' ); ?>"
									aria-expanded="<?php echo $index === $active_step ? 'true' : 'false'; ?>"
									aria-controls="<?php echo esc_attr( $block_class . '__step-content-' . $index ); ?>"
								>
									<?php if ( ! empty( $step['title'] ) ) : ?>
										<span class="<?php echo esc_attr( $block_class . '__step-title ' . $h3_class ); ?>">
											<?php echo wp_kses_post( $step['title'] ); ?>
										</span>
									<?php endif; ?>

									<span class="<?php echo esc_attr( $block_class . '__step-more' ); ?>">
										<span>
											<?php esc_html_e( 'More information', 'ft-blocks' ); ?>
										</span>
										<span class="<?php echo esc_attr( $block_class . '__step-icon' ); ?>"></span>
									</span>
								</button>

								<div
									class="<?php echo esc_attr( $block_class . '__step-content' ); ?>"
									id="<?php echo esc_attr( $block_class . '__step-content-' . $index ); ?>"
								>
									<?php if ( ! empty( $step['text'] ) ) : ?>
										<p class="<?php echo esc_attr( $block_class . '__step-text' ); ?>">
											<?php echo wp_kses_post( $step['text'] ); ?>
										</p>
									<?php endif; ?>
								</div>
							</div>
						<?php endforeach; ?>

						<?php if ( ! empty( $left_button ) ) : ?>
							<div class="<?php echo esc_attr( $block_class . '__button-left' ); ?>">
								<?php
								echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									array(
										'content'    => $left_button,
										'base_class' => $block_class,
										'variant'    => 'primary',
									)
								);
								?>
							</div>
						<?php endif; ?>
					</div>

					<div class="<?php echo esc_attr( $block_class . '__gallery' ); ?>">
						<?php if ( ! empty( $images ) ) : ?>
							<div
									class="<?php echo esc_attr( $block_class . '__images grid js-masonry' ); ?>"
							>
								<?php foreach ( $images as $image ) : ?>
									<figure class="<?php echo esc_attr( $block_class . '__image grid-item' ); ?>">
										<a
												href="<?php echo esc_url( wp_get_attachment_image_url( $image['id'], 'full' ) ); ?>"
												class="masonry-item"
												data-fslightbox
										>
											<?php
											echo wp_get_attachment_image(
												$image['id'],
												'medium_large',
												false,
												array( 'loading' => 'lazy' )
											);
											?>
										</a>
									</figure>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>

						<?php if ( ! empty( $right_button ) ) : ?>
							<div class="<?php echo esc_attr( $block_class . '__button-right' ); ?>">
								<?php
								echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									array(
										'content'    => $right_button,
										'base_class' => $block_class,
										'variant'    => 'secondary',
									)
								);
								?>
							</div>
						<?php endif; ?>
					</div>

				</div>
			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_process_steps_block( $attributes ); // phpcs:ignore