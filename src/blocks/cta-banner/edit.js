/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import config from '../../../config.json';
import { ImageUploader, FTButton, RemoveButtonCross } from '../../components';
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
	const { heading, description, buttons, backgroundImage } = attributes;
	const { baseBlock, container, h2, centered } = config.classes;

	const baseClass = `${ baseBlock }-cta-banner`;

	const blockProps = useBlockProps( {
		className: baseClass,
		style: backgroundImage?.url
			? { backgroundImage: `url(${ backgroundImage.url })` }
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

	const removeButton = ( index ) => {
		setAttributes( {
			buttons: buttons.filter( ( _, i ) => i !== index ),
		} );
	};

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
									id: 0,
									url: '',
								},
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ `${ baseClass }__container ${ container } ${ centered }` }
				>
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
						className={ `${ baseClass }__description` }
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
						placeholder={ __( 'Enter description…', 'ft-blocks' ) }
					/>

					<div className={ `${ baseClass }__buttons` }>
						{ buttons.map( ( button, index ) => (
							<div
								key={ index }
								className={ `${ baseClass }__button-wrap` }
							>
								<FTButton
									baseClass={ baseClass }
									value={ button.text }
									onChange={ ( value ) =>
										updateButton( index, value )
									}
									variant="primary"
								/>
								{ buttons.length > 1 && (
									<RemoveButtonCross
										color="red"
										text={ __(
											'Remove button',
											'ft-blocks'
										) }
										handleClick={ () =>
											removeButton( index )
										}
									/>
								) }
							</div>
						) ) }

						<Button
							isPrimary
							title={ __( 'Add Button', 'ft-blocks' ) }
							onClick={ addButton }
							className="ft-button ft-admin-button"
						>
							{ buttons.length
								? '+'
								: __( 'Add Button', 'ft-blocks' ) }
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
