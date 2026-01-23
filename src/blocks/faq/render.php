<?php
/**
 * Render callback for the FAQ block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_faq_block' ) ) {
	function ft_blocks_render_faq_block( array $attributes ): string {
		[
			'baseBlock'  => $base_class,
			'wrapper'    => $wrapper_class,
			'container'  => $container_class,
			'h2'         => $h2_class,
			'h3'         => $h3_class,
				'animated'         => $animation_class
		] = ft_blocks_get_config_classes();

		$block_class = $base_class . '-faq';
		$heading     = $attributes['heading'] ?? '';
		$description = $attributes['description'] ?? '';
		$button      = $attributes['button'] ?? '';
		$items       = $attributes['items'] ?? array();
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

				<?php // Left Column - Intro ?>
				<div class="<?php echo esc_attr( $block_class . '__intro' ); ?>">
					<?php if ( ! empty( $heading ) ) : ?>
						<h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class . $animation_class ); ?>">
							<?php echo wp_kses_post( $heading ); ?>
						</h2>
					<?php endif; ?>

					<?php if ( ! empty( $description ) ) : ?>
						<p class="<?php echo esc_attr( $block_class . '__description ' . $animation_class ); ?>">
							<?php echo wp_kses_post( $description ); ?>
						</p>
					<?php endif; ?>

					<?php if ( ! empty( $button ) ) : ?>
						<?php
						echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							array(
								'content'       => $button,
								'base_class'    => $block_class,
								'variant'       => 'secondary',
								'extra_classes' => $animation_class,
							)
						);
						?>
					<?php endif; ?>
				</div>

				<?php // Right Column - FAQ Items ?>
				<div
					class="<?php echo esc_attr( $block_class . '__items' ); ?>"
					itemscope
					itemtype="https://schema.org/FAQPage"
				>
					<?php foreach ( $items as $index => $item ) : ?>
						<div
							class="<?php echo esc_attr( $block_class . '__item ' . $animation_class ); ?>"
							data-faq-index="<?php echo esc_attr( $index ); ?>"
							itemscope
							itemprop="mainEntity"
							itemtype="https://schema.org/Question"
						>
							<button
								type="button"
								class="<?php echo esc_attr( $block_class . '__item-toggle' ); ?>"
								aria-expanded="false"
								aria-controls="<?php echo esc_attr( $block_class . '__answer-' . $index ); ?>"
							>
								<span class="<?php echo esc_attr( $block_class . '__item-question ' . $h3_class ); ?>" itemprop="name">
									<?php echo wp_kses_post( $item['question'] ?? '' ); ?>
								</span>
								<span class="<?php echo esc_attr( $block_class . '__item-icon' ); ?>"></span>
							</button>

							<div
								class="<?php echo esc_attr( $block_class . '__item-content' ); ?>"
								id="<?php echo esc_attr( $block_class . '__answer-' . $index ); ?>"
								itemscope
								itemprop="acceptedAnswer"
								itemtype="https://schema.org/Answer"
							>
								<p class="<?php echo esc_attr( $block_class . '__item-answer' ); ?>" itemprop="text">
									<?php echo wp_kses_post( $item['answer'] ?? '' ); ?>
								</p>
							</div>
						</div>
					<?php endforeach; ?>
				</div>

			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_faq_block( $attributes ); // phpcs:ignore