<?php
/**
 * Render callback for the Blog Posts block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_blog_posts_block' ) ) {
	function ft_blocks_render_blog_posts_block( array $attributes ): string {
		[
				'baseBlock' => $base_class,
				'wrapper' => $wrapper_class,
				'container' => $container_class,
				'h2' => $h2_class,
				'h3' => $h3_class
		] = ft_blocks_get_config_classes();

		$block_class   = $base_class . '-blog-posts';
		$heading       = $attributes['heading'] ?? '';
		$description   = $attributes['description'] ?? '';
		$section_label = $attributes['sectionLabel'] ?? '';
		$posts_count   = $attributes['postsCount'] ?? 3;
		$order_by      = $attributes['orderBy'] ?? 'date';
		$order         = $attributes['order'] ?? 'DESC';
		$exclude_posts = $attributes['excludePosts'] ?? array();
		$include_posts = $attributes['includePosts'] ?? array();
		$button        = $attributes['button'] ?? '';
		$anchor_id     = $attributes['anchor'] ?? '';

		// Build query args
		$query_args = array(
			'post_type'      => 'post',
			'posts_per_page' => $posts_count,
			'orderby'        => $order_by,
			'order'          => $order,
			'post_status'    => 'publish',
		);

		// Include specific posts (overrides exclude)
		if ( ! empty( $include_posts ) ) {
			$query_args['post__in'] = $include_posts;
			$query_args['orderby']  = 'post__in';
		} elseif ( ! empty( $exclude_posts ) ) {
			$query_args['post__not_in'] = $exclude_posts;
		}

		$posts_query = new WP_Query( $query_args );
		$found_posts = $posts_query->post_count;

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

				<div class="<?php echo esc_attr( $block_class . '__header' ); ?>">
					<div class="<?php echo esc_attr( $block_class . '__header-content' ); ?>">
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

					<?php if ( ! empty( $button ) ) : ?>
						<div class="<?php echo esc_attr( $block_class . '__header-button' ); ?>">
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

				<?php if ( $posts_query->have_posts() ) : ?>
					<div class="<?php echo esc_attr( $block_class . '__grid-wrap' ); ?>">
						<?php if ( ! empty( $section_label ) ) : ?>
							<p
									class="<?php echo esc_attr( $block_class . '__section-label' ); ?>"
									aria-hidden="true"
							>
								<?php echo wp_kses_post( $section_label ); ?>
							</p>
						<?php endif; ?>
						<div
								class="<?php echo esc_attr( $block_class . '__grid' ); ?>"
								data-posts-count="<?php echo esc_attr( $found_posts ); ?>"
						>

							<div class="swiper-wrapper">
								<?php while ( $posts_query->have_posts() ) : ?>
									<?php $posts_query->the_post(); ?>
									<article class="<?php echo esc_attr( $block_class . '__item swiper-slide' ); ?>">
										<a href="<?php the_permalink(); ?>"
											class="<?php echo esc_attr( $block_class . '__item-link' ); ?>">
											<?php if ( has_post_thumbnail() ) : ?>
											<figure class="<?php echo esc_attr( $block_class . '__item-image' ); ?>">
												<?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?>
											</figure>
										</a>

										<div class="<?php echo esc_attr( $block_class . '__item-categories' ); ?>">
												<?php the_category( ', ' ); ?>
										</div>

										<?php endif; ?>
										<h3 class="<?php echo esc_attr( $block_class . '__item-title ' . $h3_class ); ?>">
											<a href="<?php the_permalink(); ?>">
												<?php the_title(); ?>
											</a>
										</h3>
										<div class="<?php echo esc_attr( $block_class . '__item-excerpt' ); ?>">
											<?php the_excerpt(); ?>
										</div>
										<div class="<?php echo esc_attr( $block_class . '__item-date' ); ?>">
											<?php echo get_the_date( 'j. F Y' ); ?>
										</div>
									</article>
								<?php endwhile; ?>
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
					</div>
				<?php else : ?>
					<p class="<?php echo esc_attr( $block_class . '__no-posts' ); ?>">
						<?php esc_html_e( 'No posts found.', 'ft-blocks' ); ?>
					</p>
				<?php endif; ?>

				<?php wp_reset_postdata(); ?>

			</div>
		</section>

		<?php
		return ob_get_clean();
	}
}

echo ft_blocks_render_blog_posts_block($attributes); // phpcs:ignore