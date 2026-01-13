/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import ImagesSlider from './ImagesSlider';
import FTButton from '../../components/FTButton/FTButton';
import config from '../../../config.json';
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
	const [ previewImageIndex, setPreviewImageIndex ] = useState( 0 );

	const { heading, text, decorText, images, button } = attributes;
	const { baseBlock, container, wrapper } = config.classes;

	const baseClass = `${ baseBlock }-hero`;

	const previewImageUrl =
		previewImageIndex !== null && images[ previewImageIndex ]
			? images[ previewImageIndex ].url
			: null;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
		style: previewImageUrl
			? {
					backgroundImage: `url(${ previewImageUrl })`,
			  }
			: {},
	} );

	return (
		<>
			<div { ...blockProps }>
				<div className={ `${ baseClass }__container ${ container }` }>
					<div className={ `${ baseClass }__heading` }>
						<RichText
							tagName="span"
							className={ `${ baseClass }__decor-text` }
							value={ decorText }
							onChange={ ( value ) =>
								setAttributes( { decorText: value } )
							}
							placeholder={ __(
								'Enter decor text',
								'ft-blocks'
							) }
						/>

						<RichText
							tagName="p"
							value={ heading }
							onChange={ ( value ) =>
								setAttributes( { heading: value } )
							}
							placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
						/>
					</div>
					<RichText
						tagName="p"
						className={ `${ baseClass }__text` }
						value={ text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
						placeholder={ __( 'Enter Subheading…', 'ft-blocks' ) }
						allowedFormats={ [ 'bold', 'italic' ] }
					/>
					<FTButton
						baseClass={ baseClass }
						value={ button }
						onChange={ ( value ) =>
							setAttributes( { button: value } )
						}
						variant="primary"
					/>
				</div>
			</div>

			<div className={ wrapper }>
				<div className={ container }>
					<ImagesSlider
						images={ images }
						imagesAttrName="images"
						setAttributes={ setAttributes }
						baseClass={ baseClass }
						previewImageIndex={ previewImageIndex }
						setPreviewImageIndex={ setPreviewImageIndex }
					/>
				</div>
			</div>
		</>
	);
}
