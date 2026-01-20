/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ImagesSlider, FTButton, RemoveButtonCross } from '../../components';
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
	const [ activeStep, setActiveStep ] = useState( 0 );

	const { heading, steps, images, leftButton, rightButton } = attributes;
	const { baseBlock, container, wrapper, h2, h3 } = config.classes;

	const baseClass = `${ baseBlock }-process-steps`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	const updateStep = ( index, key, value ) => {
		const newSteps = [ ...steps ];
		newSteps[ index ] = {
			...newSteps[ index ],
			[ key ]: value,
		};
		setAttributes( { steps: newSteps } );
	};

	const removeStep = ( index ) => {
		const newSteps = [ ...steps ];
		newSteps.splice( index, 1 );
		setAttributes( { steps: newSteps } );
		setActiveStep( Math.max( 0, index - 1 ) );
	};

	const addStep = () => {
		const newStep = {
			title: '',
			text: '',
		};

		setAttributes( {
			steps: [ ...steps, newStep ],
		} );
		setActiveStep( steps.length );
	};

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__container ${ container }` }>
				<div className={ `${ baseClass }__header` }>
					<RichText
						tagName="p"
						className={ `${ baseClass }__heading ${ h2 }` }
						value={ heading }
						onChange={ ( value ) =>
							setAttributes( { heading: value } )
						}
						placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
					/>
				</div>

				<div className={ `${ baseClass }__content` }>
					<div className={ `${ baseClass }__steps` }>
						{ steps.map( ( step, index ) => (
							<div
								key={ index }
								className={ `${ baseClass }__step ${
									activeStep === index ? 'is-active' : ''
								}` }
							>
								<RemoveButtonCross
									color="red"
									text={ __( 'Remove Step', 'ft-blocks' ) }
									handleClick={ () => removeStep( index ) }
								/>
								<div
									className={ `${ baseClass }__step-header` }
								>
									<span
										className={ `${ baseClass }__step-number` }
									>
										{ index + 1 }.
									</span>
									<span
										className={ `${ baseClass }__step-label` }
									>
										{ __( 'step', 'ft-blocks' ) }
									</span>
								</div>

								<button
									type="button"
									className={ `${ baseClass }__step-toggle` }
									onClick={ () =>
										setActiveStep(
											activeStep === index ? -1 : index
										)
									}
								>
									<RichText
										tagName="span"
										className={ `${ baseClass }__step-title ${ h3 }` }
										value={ step.title }
										onChange={ ( value ) =>
											updateStep( index, 'title', value )
										}
										placeholder={ __(
											'Step title…',
											'ft-blocks'
										) }
									/>
									<span
										className={ `${ baseClass }__step-more` }
									>
										<span>
											{ __(
												'More information',
												'ft-blocks'
											) }
										</span>
										<span
											className={ `${ baseClass }__step-icon` }
										></span>
									</span>
								</button>

								{ activeStep === index && (
									<div
										className={ `${ baseClass }__step-content` }
									>
										<RichText
											tagName="p"
											className={ `${ baseClass }__step-text` }
											value={ step.text }
											onChange={ ( value ) =>
												updateStep(
													index,
													'text',
													value
												)
											}
											placeholder={ __(
												'Step description…',
												'ft-blocks'
											) }
										/>
									</div>
								) }
							</div>
						) ) }

						<Button
							isPrimary
							onClick={ addStep }
							className="ft-button ft-admin-button"
						>
							{ steps.length
								? __( 'Add Step', 'ft-blocks' )
								: __( 'Add First Step', 'ft-blocks' ) }
						</Button>

						<div className={ `${ baseClass }__button-left` }>
							<FTButton
								baseClass={ baseClass }
								value={ leftButton }
								onChange={ ( value ) =>
									setAttributes( { leftButton: value } )
								}
								variant="primary"
							/>
						</div>
					</div>

					<div className={ `${ baseClass }__gallery` }>
						<ImagesSlider
							images={ images }
							imagesAttrName="images"
							setAttributes={ setAttributes }
							baseClass={ baseClass }
						/>

						<div className={ `${ baseClass }__button-right` }>
							<FTButton
								baseClass={ baseClass }
								value={ rightButton }
								onChange={ ( value ) =>
									setAttributes( { rightButton: value } )
								}
								variant="secondary"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
