/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import config from '../../../config.json';
import { ImageUploader, FTButton, ImagesSlider } from '../../components';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function to update attributes.
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const [ previewImageIndex, setPreviewImageIndex ] = useState( 0 );

	const { heading, content, button, images, backgroundImage } = attributes;
	const { baseBlock, container, wrapper, h2 } = config.classes;

	const baseClass = `${ baseBlock }-about-me`;

	const blockProps = useBlockProps( {
		className: baseClass,
		style: backgroundImage?.url
			? { backgroundImage: `url(${ backgroundImage.url })` }
			: {},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Background Image', 'ft-blocks' ) }
					initialOpen={ true }
				>
					<ImageUploader
						image={ backgroundImage?.url }
						onSelect={ ( media ) =>
							setAttributes( {
								backgroundImage: {
									id: media.id,
									url: media.url,
								},
							} )
						}
						onRemove={ () =>
							setAttributes( {
								backgroundImage: {
									id: null,
									url: '',
								},
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `${ baseClass }__inner ${ wrapper }` }>
					<div
						className={ `${ baseClass }__container ${ container }` }
					>
						<div className={ `${ baseClass }__slider` }>
							{ images && (
								<img
									src={ images[ previewImageIndex ]?.url }
									alt="img"
								/>
							) }
						</div>

						<div className={ `${ baseClass }__content` }>
							<RichText
								tagName="p"
								className={ `${ baseClass }__heading ${ h2 }` }
								value={ heading }
								onChange={ ( value ) =>
									setAttributes( { heading: value } )
								}
								placeholder={ __(
									'Enter Heading…',
									'ft-blocks'
								) }
							/>

							<RichText
								tagName="div"
								className={ `${ baseClass }__text` }
								value={ content }
								onChange={ ( value ) =>
									setAttributes( { content: value } )
								}
								placeholder={ __(
									'Enter your text here. You can use multiple paragraphs…',
									'ft-blocks'
								) }
								multiline="p"
							/>

							<div className={ `${ baseClass }__button-wrap` }>
								<FTButton
									baseClass={ baseClass }
									value={ button }
									onChange={ ( value ) =>
										setAttributes( { button: value } )
									}
									variant="secondary"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={ wrapper }>
				<div className={ container }>
					<ImagesSlider
						images={ images }
						imagesAttrName="images"
						setAttributes={ setAttributes }
						previewImageIndex={ previewImageIndex }
						setPreviewImageIndex={ setPreviewImageIndex }
					/>
				</div>
			</div>
		</>
	);
}
