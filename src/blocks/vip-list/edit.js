/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import config from '../../../config.json';
import { FTButton, RemoveButtonCross } from '../../components';
import { Icon } from '../../shared/icons';
import './editor.scss';

const wave = config.decorativeVectors.wave;

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
	const { heading, leftText, rightHeading, rightText, button, button2, features } =
		attributes;
	const { baseBlock, wrapper, container, h2, h3 } = config.classes;

	const baseClass = `${ baseBlock }-vip-list`;

	const blockProps = useBlockProps( {
		className: baseClass + ' ' + wrapper,
	} );

	const addFeature = () => {
		const newFeatures = [
			...features,
			{
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
			<figure
				className={ `${ baseClass }__decorative-vector` }
				dangerouslySetInnerHTML={ { __html: wave } }
			/>
			<div className={ `${ baseClass }__container ${ container }` }>
				{ /* Top Section */ }
				<div className={ `${ baseClass }__top` }>
					<div className={ `${ baseClass }__top-left` }>
						<RichText
							tagName="p"
							className={ `${ baseClass }__heading ${ h2 }` }
							value={ heading }
							onChange={ ( value ) =>
								setAttributes( { heading: value } )
							}
							placeholder={ __(
								'Enter left heading…',
								'ft-blocks'
							) }
						/>
						<RichText
							tagName="p"
							className={ `${ baseClass }__text` }
							value={ leftText }
							onChange={ ( value ) =>
								setAttributes( { leftText: value } )
							}
							placeholder={ __(
								'Enter left text…',
								'ft-blocks'
							) }
						/>
					</div>

					<div className={ `${ baseClass }__top-right` }>
						<RichText
							tagName="p"
							className={ `${ baseClass }__top-right_heading ${ h3 }` }
							value={ rightHeading }
							onChange={ ( value ) =>
								setAttributes( { rightHeading: value } )
							}
							placeholder={ __(
								'Enter right heading…',
								'ft-blocks'
							) }
						/>
						<RichText
							tagName="p"
							className={ `${ baseClass }__text` }
							value={ rightText }
							onChange={ ( value ) =>
								setAttributes( { rightText: value } )
							}
							placeholder={ __(
								'Enter right text…',
								'ft-blocks'
							) }
						/>
						<div className={ `${ baseClass }__buttons` }>
							<FTButton
								baseClass={ baseClass }
								value={ button }
								onChange={ ( value ) =>
									setAttributes( { button: value } )
								}
								variant="primary"
							/>
							<FTButton
								baseClass={ baseClass }
								value={ button2 }
								onChange={ ( value ) =>
									setAttributes( { button2: value } )
								}
								variant="primary"
							/>
						</div>
					</div>
				</div>

				<div className={ `${ baseClass }__features` }>
					{ features.map( ( feature, index ) => (
						<div
							key={ index }
							className={ `${ baseClass }__feature` }
						>
							<RemoveButtonCross
								color="red"
								text={ __( 'Remove Feature', 'ft-blocks' ) }
								handleClick={ () => removeFeature( index ) }
							/>

							<Icon
								name="star"
								className={ `${ baseClass }__feature-icon` }
							/>

							<RichText
								tagName="p"
								className={ `${ baseClass }__feature-title ${ h3 }` }
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
								className={ `${ baseClass }__feature-text` }
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
