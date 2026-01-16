<?php
/**
 * Render callback for the Features block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
if ( ! function_exists( 'ft_blocks_render_features_block' ) ) {
    function ft_blocks_render_features_block( array $attributes ): string {
        [
            'baseBlock'  => $base_class,
            'wrapper'    => $wrapper_class,
            'container'  => $container_class,
            'centered'   => $centered_class,
            'h2'         => $h2_class
        ] = ft_blocks_get_config_classes();

        $block_class = $base_class . '-features';
        $heading     = $attributes['heading'] ?? '';
        $description = $attributes['description'] ?? '';
        $features    = $attributes['features'] ?? array();
        $anchor_id   = $attributes['anchor'] ?? '';

        if ( empty( $features ) ) {
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
                        <h2 class="<?php echo esc_attr( $block_class . '__heading ' . $h2_class . ' ' . $centered_class ); ?>">
                            <?php echo wp_kses_post( $heading ); ?>
                        </h2>
                    <?php endif; ?>

                    <?php if ( ! empty( $description ) ) : ?>
                        <p class="<?php echo esc_attr( $block_class . '__description' ); ?>">
                            <?php echo wp_kses_post( $description ); ?>
                        </p>
                    <?php endif; ?>
                </div>

                <div class="<?php echo esc_attr( $block_class . '__grid' ); ?>">
                    <?php foreach ( $features as $feature ) : ?>
                        <div class="<?php echo esc_attr( $block_class . '__item' ); ?>">
                            <?php
                            $icon_id = $feature['icon']['id'];
                            if ( ! empty( $icon_id ) ) :
                            ?>
                            <figure
                                class="<?php echo esc_attr( $block_class . '__icon' ); ?>"
                                aria-hidden="true"
                            >
                                <?php
                                echo wp_get_attachment_image(
                                        $icon_id,
                                        'large',
                                        false,
                                        array(
                                            'loading' => 'lazy'
                                        )
                                );
                                ?>
                            </figure>
                            <?php endif; ?>

                            <?php if ( ! empty( $feature['title'] ) ) : ?>
                                <h3 class="<?php echo esc_attr( $block_class . '__item-title' ); ?>">
                                    <?php echo wp_kses_post( $feature['title'] ); ?>
                                </h3>
                            <?php endif; ?>

                            <?php if ( ! empty( $feature['text'] ) ) : ?>
                                <p class="<?php echo esc_attr( $block_class . '__item-text' ); ?>">
                                    <?php echo wp_kses_post( $feature['text'] ); ?>
                                </p>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>

            </div>
        </section>

        <?php
        return ob_get_clean();
    }
}

echo ft_blocks_render_features_block( $attributes ); // phpcs:ignore