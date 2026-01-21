/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import config from '../../../config.json';
import { FTButton, RemoveButtonCross } from '../../components';
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
	const { heading, description, button, items, activeItem } = attributes;
	const { baseBlock, container, wrapper, h2, h3 } = config.classes;

	const baseClass = `${ baseBlock }-faq`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	const updateItem = ( index, key, value ) => {
		const newItems = [ ...items ];
		newItems[ index ] = {
			...newItems[ index ],
			[ key ]: value,
		};
		setAttributes( { items: newItems } );
	};

	const addItem = () => {
		setAttributes( {
			items: [ ...items, { question: '', answer: '' } ],
		} );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, i ) => i !== index );
		setAttributes( {
			items: newItems,
			activeItem: -1,
		} );
	};

	const toggleItem = ( index ) => {
		setAttributes( {
			activeItem: activeItem === index ? -1 : index,
		} );
	};

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__container ${ container }` }>
				{ /* Left Column - Intro */ }
				<div className={ `${ baseClass }__intro` }>
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

					<FTButton
						baseClass={ baseClass }
						value={ button }
						onChange={ ( value ) =>
							setAttributes( { button: value } )
						}
						variant="secondary"
					/>
				</div>

				{ /* Right Column - FAQ Items */ }
				<div className={ `${ baseClass }__items` }>
					{ items.map( ( item, index ) => (
						<div
							key={ index }
							className={ `${ baseClass }__item ${
								activeItem === index ? 'is-active' : ''
							}` }
						>
							<div className={ `${ baseClass }__item-header` }>
								<button
									type="button"
									className={ `${ baseClass }__item-toggle` }
									onClick={ () => toggleItem( index ) }
								>
									<RichText
										tagName="span"
										className={ `${ baseClass }__item-question ${ h3 }` }
										value={ item.question }
										onChange={ ( value ) =>
											updateItem(
												index,
												'question',
												value
											)
										}
										placeholder={ __(
											'Question…',
											'ft-blocks'
										) }
									/>
									<span
										className={ `${ baseClass }__item-icon` }
									></span>
								</button>
								{ items.length > 1 && (
									<RemoveButtonCross
										color="red"
										text={ __(
											'Remove item',
											'ft-blocks'
										) }
										handleClick={ () =>
											removeItem( index )
										}
									/>
								) }
							</div>

							{ activeItem === index && (
								<div
									className={ `${ baseClass }__item-content` }
								>
									<RichText
										tagName="p"
										className={ `${ baseClass }__item-answer` }
										value={ item.answer }
										onChange={ ( value ) =>
											updateItem( index, 'answer', value )
										}
										placeholder={ __(
											'Answer…',
											'ft-blocks'
										) }
									/>
								</div>
							) }
						</div>
					) ) }

					<Button
						variant="primary"
						onClick={ addItem }
						className="ft-button ft-admin-button"
					>
						{ items.length
							? __( 'Add Question', 'ft-blocks' )
							: __( 'Add First Question', 'ft-blocks' ) }
					</Button>
				</div>
			</div>
		</div>
	);
}
