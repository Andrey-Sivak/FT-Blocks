<?php
/**
 * Render callback for the Post CTA block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if (!function_exists('ft_blocks_render_cta_banner_block')) {
    function ft_blocks_render_cta_banner_block(array $attributes): string
    {
        [
                'baseBlock' => $base_class,
                'h3' => $h3_class,
        ] = ft_blocks_get_config_classes();

        $block_class = $base_class . '-post-cta';
        $heading = $attributes['heading'] ?? '';
        $subheading = $attributes['subHeading'] ?? '';
        $text = $attributes['text'] ?? '';
        $button = $attributes['button'] ?? '';
        $image = $attributes['image'] ?? null;
        $anchor_id = $attributes['anchor'] ?? '';

        $wrapper_attributes = get_block_wrapper_attributes(
                array(
                        'class' => $block_class,
                        'id' => $anchor_id ? esc_attr($anchor_id) : null,
                )
        );

        ob_start();
        ?>

        <div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>

            <figure class="<?php echo esc_attr($block_class . '__decorative-image'); ?>">
                <img
                        src="<?php echo esc_attr(esc_url(FT_BLOCKS_URL . '/images/post-cta-decor.png')); ?>"
                        alt="decorative image"
                        loading="lazy"
                        width="1114"
                        height="1022"
                />
            </figure>

            <div
                    class="<?php echo esc_attr($block_class . '__content'); ?>"
            >

                <?php if (!empty($heading)) : ?>
                    <h3 class="<?php echo esc_attr($block_class . '__heading ' . $h3_class); ?>">
                        <?php echo wp_kses_post($heading); ?>
                    </h3>
                <?php endif; ?>

                <?php if (!empty($subheading)) : ?>
                    <p class="<?php echo esc_attr($block_class . '__subheading'); ?>">
                        <?php echo wp_kses_post($subheading); ?>
                    </p>
                <?php endif; ?>

                <?php if (!empty($text)) : ?>
                    <p class="<?php echo esc_attr($block_class . '__text'); ?>">
                        <?php echo wp_kses_post($text); ?>
                    </p>
                <?php endif; ?>

                <?php if (!empty($button)) : ?>
                    <?php
                    echo ft_blocks_render_button( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                            array(
                                    'content' => $button,
                                    'base_class' => $block_class,
                                    'variant' => 'primary',
                            )
                    );
                    ?>
                <?php endif; ?>
            </div>

            <?php if (!empty($image)) : ?>
                <figure class="<?php echo esc_attr($block_class . '__image'); ?>">
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
            <?php endif; ?>
        </div>

        <?php
        return ob_get_clean();
    }
}

echo ft_blocks_render_cta_banner_block($attributes); // phpcs:ignore