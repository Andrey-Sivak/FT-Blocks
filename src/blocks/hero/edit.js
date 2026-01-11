/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	URLInput,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { ImageUploader } from '../../components';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function to update attributes.
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { heading, subHeading, backgroundImageUrl, ctaText, ctaUrl } =
		attributes;

	const onSelectImage = ( media ) => {
		setAttributes( {
			backgroundImageId: media.id,
			backgroundImageUrl: media.url,
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			backgroundImageId: undefined,
			backgroundImageUrl: undefined,
		} );
	};

	const blockProps = useBlockProps( {
		className: 'wp-block-ft-hero',
		style: {
			backgroundImage: backgroundImageUrl
				? `url( ${ backgroundImageUrl } )`
				: undefined,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			minHeight: '400px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative',
			color: '#fff',
			textAlign: 'center',
			padding: '20px',
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Background Settings', 'ft-blocks' ) }>
					<ImageUploader
						image={ backgroundImageUrl }
						onSelect={ onSelectImage }
						onRemove={ onRemoveImage }
					/>
				</PanelBody>
				<PanelBody title={ __( 'CTA Settings', 'ft-blocks' ) }>
					<TextControl
						label={ __( 'Button Text', 'ft-blocks' ) }
						value={ ctaText }
						onChange={ ( value ) =>
							setAttributes( { ctaText: value } )
						}
					/>
					<URLInput
						className="block-editor-url-input__input"
						value={ ctaUrl }
						onChange={ ( url ) => setAttributes( { ctaUrl: url } ) }
						label={ __( 'Link URL', 'ft-blocks' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div style={ { position: 'relative', zIndex: 1 } }>
					<RichText
						tagName="h1"
						value={ heading }
						onChange={ ( value ) =>
							setAttributes( { heading: value } )
						}
						placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
						style={ { color: '#fff' } }
					/>
					<RichText
						tagName="p"
						className="hero-subheading"
						value={ subHeading }
						onChange={ ( value ) =>
							setAttributes( { subHeading: value } )
						}
						placeholder={ __( 'Enter Subheading…', 'ft-blocks' ) }
						style={ {
							color: '#fff',
							fontSize: '1.2rem',
							margin: '20px 0',
						} }
					/>
					{ ctaText && (
						<span className="wp-block-button__link">
							{ ctaText }
						</span>
					) }
				</div>
			</div>
		</>
	);
}
