/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import config from '../../../config.json';
import { RemoveButtonCross } from '../../components';
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
	const { items, activeItem, heading } = attributes;
	const { baseBlock, h2, h3 } = config.classes;

	const baseClass = `${ baseBlock }-post-faq`;

	const blockProps = useBlockProps( {
		className: baseClass,
	} );

	const updateItem = ( index, key, value ) => {
		const newItems = [ ...items ];
		newItems[ index ] = {
			...newItems[ index ],
			[ key ]: value,
		};
		setAttributes( { items: newItems } );
	};

	const toggleItem = ( index ) => {
		setAttributes( {
			activeItem: activeItem === index ? -1 : index,
		} );
	};

	const addItem = () => {
		setAttributes( {
			items: [ ...items, { question: '', answer: '' } ],
		} );

		// toggleItem( items.length - 1 );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, i ) => i !== index );
		setAttributes( {
			items: newItems,
			activeItem: -1,
		} );
	};

	return (
		<div { ...blockProps }>
			<RichText
				tagName="p"
				className={ `${ baseClass }__heading ${ h2 }` }
				value={ heading }
				onChange={ ( value ) =>
					setAttributes( { heading: value } )
				}
				placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
			/>

			<div className={ `${ baseClass }__items` }>
				{ items.length &&
					items.map( ( item, index ) => (
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
	);
}
