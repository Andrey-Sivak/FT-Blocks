/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import config from '../../../config.json';
import { ImageUploader, RemoveButtonCross } from '../../components';
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
	const { heading, description, features } = attributes;
	const { baseBlock, container, wrapper, centered, h2, h3 } = config.classes;

	const baseClass = `${ baseBlock }-features`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	const addFeature = () => {
		const newFeatures = [
			...features,
			{
				icon: {
					id: null,
					url: '',
				},
				title: '',
				text: '',
			},
		];
		setAttributes( { features: newFeatures } );
	};

	const updateFeature = ( index, key, value ) => {
		const newFeatures = [ ...features ];
		newFeatures[ index ] = {
			...newFeatures[ index ],
			[ key ]: value,
		};

		setAttributes( { features: newFeatures } );
	};

	const removeFeature = ( index ) => {
		const newFeatures = [ ...features ];
		newFeatures.splice( index, 1 );
		setAttributes( { features: newFeatures } );
	};

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__container ${ container }` }>
				<div className={ `${ baseClass }__header` }>
					<RichText
						tagName="p"
						className={ `${ baseClass }__heading ${ centered } ${ h2 }` }
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
						placeholder={ __( 'Enter text…', 'ft-blocks' ) }
					/>
				</div>

				<div className={ `${ baseClass }__grid` }>
					{ features.map( ( feature, index ) => (
						<div key={ index } className={ `${ baseClass }__item` }>
							<RemoveButtonCross
								color="red"
								text={ __( 'Remove Feature', 'ft-blocks' ) }
								handleClick={ () => removeFeature( index ) }
							/>
							<div className={ `${ baseClass }__icon` }>
								<ImageUploader
									image={ feature.icon?.url }
									onSelect={ ( media ) => {
										updateFeature( index, 'icon', {
											id: media.id,
											url: media.url,
										} );
									} }
									onRemove={ () =>
										updateFeature( index, 'icon', {
											id: null,
											url: '',
										} )
									}
								/>
							</div>
							<RichText
								tagName="p"
								className={ `${ baseClass }__item-title ${ h3 }` }
								value={ feature.title }
								onChange={ ( value ) =>
									updateFeature( index, 'title', value )
								}
								placeholder={ __(
									'Feature title…',
									'ft-blocks'
								) }
							/>
							<RichText
								tagName="p"
								className={ `${ baseClass }__item-text` }
								value={ feature.text }
								onChange={ ( value ) =>
									updateFeature( index, 'text', value )
								}
								placeholder={ __(
									'Feature description…',
									'ft-blocks'
								) }
							/>
						</div>
					) ) }

					<Button
						isPrimary
						onClick={ addFeature }
						className="ft-button ft-admin-button"
					>
						{ features.length
							? __( 'Add Feature', 'ft-blocks' )
							: __( 'Add First Feature', 'ft-blocks' ) }
					</Button>
				</div>
			</div>
		</div>
	);
}
