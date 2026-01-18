/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { FTButton, RemoveButtonCross, ImagesSlider } from '../../components';
import config from '../../../config.json';
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

	const { heading, text, images, buttons } = attributes;
	const { baseBlock, h2, wrapper, container } = config.classes;

	const baseClass = `${ baseBlock }-service-info`;

	const previewImageUrl =
		previewImageIndex !== null && images[ previewImageIndex ]
			? images[ previewImageIndex ].url
			: null;

	const blockProps = useBlockProps( {
		className: `${ baseClass }`,
		style: previewImageUrl
			? { backgroundImage: `url(${ previewImageUrl })` }
			: {},
	} );

	const updateButton = ( index, value ) => {
		const newButtons = [ ...buttons ];
		newButtons[ index ] = { text: value };
		setAttributes( { buttons: newButtons } );
	};

	const addButton = () => {
		setAttributes( {
			buttons: [ ...buttons, { text: '' } ],
		} );
	};

	return (
		<>
			<div { ...blockProps }>
				<div className={ `${ baseClass }__container` }>
					<div className={ `${ baseClass }__content` }>
						<RichText
							tagName="p"
							className={ `${ baseClass }__heading ${ h2 }` }
							value={ heading }
							onChange={ ( value ) =>
								setAttributes( { heading: value } )
							}
							placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
						/>

						<RichText
							tagName="p"
							className={ `${ baseClass }__text` }
							value={ text }
							onChange={ ( value ) =>
								setAttributes( { text: value } )
							}
							placeholder={ __( 'Enter text…', 'ft-blocks' ) }
						/>

						<div className={ `${ baseClass }__buttons` }>
							{ buttons.map( ( button, index ) => (
								<div
									className={ `${ baseClass }__button-admin-wrap` }
									key={ index }
								>
									<FTButton
										baseClass={ baseClass }
										value={ button.text }
										onChange={ ( value ) =>
											updateButton( index, value )
										}
										variant="primary"
									/>
									<RemoveButtonCross
										color="red"
										text={ __(
											'Remove Button',
											'ft-blocks'
										) }
										handleClick={ () =>
											setAttributes( {
												buttons: buttons.filter(
													( btn, i ) => i !== index
												),
											} )
										}
									/>
								</div>
							) ) }

							<Button
								isPrimary
								onClick={ addButton }
								className="ft-button ft-admin-button"
								title={ __( 'Add Button', 'ft-blocks' ) }
							>
								{ buttons.length
									? '+'
									: __( 'Add Button', 'ft-blocks' ) }
							</Button>
						</div>
					</div>

					<div className={ `${ baseClass }__image` }>
						<img src={ previewImageUrl } alt="img" />
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
