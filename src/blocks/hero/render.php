<?php
/**
 * Render callback for the Hero block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

$heading = $attributes['heading'] ?? '';
$sub_heading = $attributes['subHeading'] ?? '';
$background_image_url = $attributes['backgroundImageUrl'] ?? '';
$cta_text = $attributes['ctaText'] ?? '';
$cta_url = $attributes['ctaUrl'] ?? '';
$overlay_opacity = $attributes['overlayOpacity'] ?? 0.5;

var_dump($attributes);

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => 'ft-hero-block',
        'style' => $background_image_url ? 'background-image: url(' . esc_url($background_image_url) . ');' : '',
    )
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="ft-hero-overlay" style="background-color: rgba(0,0,0, <?php echo esc_attr($overlay_opacity); ?>);">
    </div>
    <div class="ft-hero-content">
        <?php if ($heading): ?>
            <h1 class="ft-hero-heading">
                <?php echo wp_kses_post($heading); ?>
            </h1>
        <?php endif; ?>

        <?php if ($sub_heading): ?>
            <p class="ft-hero-subheading">
                <?php echo wp_kses_post($sub_heading); ?>
            </p>
        <?php endif; ?>

        <?php if ($cta_text && $cta_url): ?>
            <div class="wp-block-button">
                <a class="wp-block-button__link" href="<?php echo esc_url($cta_url); ?>">
                    <?php echo esc_html($cta_text); ?>
                </a>
            </div>
        <?php endif; ?>
    </div>
</div>