<?php
/**
 * Render callback for the Post FAQ block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists('ft_blocks_render_post_faq_block') ) {
    function ft_blocks_render_post_faq_block(array $attributes ): string {
        [
            'baseBlock'  => $base_class,
            'h3'         => $h3_class,
            'h2'         => $h2_class,
        ] = ft_blocks_get_config_classes();

        $block_class = $base_class . '-post-faq';
        $heading     = $attributes['heading'] ?? '';
        $items       = $attributes['items'] ?? array();
        $anchor_id   = $attributes['anchor'] ?? '';

        if ( empty( $items ) ) {
            return '';
        }

        $wrapper_attributes = get_block_wrapper_attributes(
            array(
                'class' => $block_class,
                'id'    => $anchor_id ? esc_attr( $anchor_id ) : null,
            )
        );

        ob_start();
        ?>

        <section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
            <?php if ( ! empty( $heading ) ) : ?>
                <h3 class="<?php echo esc_attr( $block_class . '__heading ' ); ?>">
                    <?php echo wp_kses_post( $heading ); ?>
                </h3>
            <?php endif; ?>
                <div
                    class="<?php echo esc_attr( $block_class . '__items' ); ?>"
                    itemscope
                    itemtype="https://schema.org/FAQPage"
                >
                    <?php foreach ( $items as $index => $item ) : ?>
                    <?php if ( empty( $item['question'] ) || empty($item['answer']) ) { continue; } ?>
                        <div
                                class="<?php echo esc_attr( $block_class . '__item ' ); ?>"
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
									<?php echo wp_kses_post( $item['question'] ); ?>
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
                                    <?php echo wp_kses_post( $item['answer'] ); ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
        </section>

        <?php
        return ob_get_clean();
    }
}

echo ft_blocks_render_post_faq_block( $attributes ); // phpcs:ignore