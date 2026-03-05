/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import config from '../../../config.json';
import { ImageUploader, FTButton } from '../../components';
import decorImage from '../../../images/post-cta-decor.png';
// import './editor.scss';

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
	const { heading, subHeading, text, button, image } = attributes;
	const { baseBlock, h3 } = config.classes;

	const baseClass = `${ baseBlock }-post-cta`;

	const blockProps = useBlockProps( {
		className: baseClass,
	} );

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__decorative-image` }>
				<img src={ decorImage } alt="decorative image" />
			</div>
			<div className={ `${ baseClass }__content` }>
				<RichText
					tagName="p"
					className={ `${ baseClass }__heading ${ h3 }` }
					value={ heading }
					onChange={ ( value ) =>
						setAttributes( { heading: value } )
					}
					placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
				/>

				<RichText
					tagName="p"
					className={ `${ baseClass }__subheading` }
					value={ subHeading }
					onChange={ ( value ) =>
						setAttributes( { subHeading: value } )
					}
					placeholder={ __( 'Enter subheading…', 'ft-blocks' ) }
				/>

				<RichText
					tagName="p"
					className={ `${ baseClass }__text` }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Enter text…', 'ft-blocks' ) }
				/>

				<FTButton
					baseClass={ baseClass }
					value={ button }
					onChange={ ( value ) => setAttributes( { button: value } ) }
					variant="primary"
				/>
			</div>

			<div className={ `${ baseClass }__image` }>
				<ImageUploader
					image={ image?.url }
					onSelect={ ( media ) =>
						setAttributes( {
							image: {
								id: media.id,
								url: media.url,
							},
						} )
					}
					onRemove={ () =>
						setAttributes( {
							image: {
								id: null,
								url: '',
							},
						} )
					}
				/>
			</div>
		</div>
	);
}
