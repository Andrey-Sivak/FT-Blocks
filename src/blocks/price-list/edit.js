/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
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
	const { heading, items, button } = attributes;
	const { baseBlock, container, wrapper, centered, h2, h3 } = config.classes;

	const baseClass = `${ baseBlock }-price-list`;

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
		const newItems = [
			...items,
			{
				image: {
					id: null,
					url: '',
				},
				title: '',
				price: '',
			},
		];

		setAttributes( { items: newItems } );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( item, i ) => i !== index );
		setAttributes( { items: newItems } );
	};

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__container ${ container }` }>
				<div className={ `${ baseClass }__header` }>
					<h2
						className={ `${ baseClass }__heading ${ h2 } ${ centered }` }
					>
						<RichText
							tagName="span"
							value={ heading }
							onChange={ ( value ) =>
								setAttributes( { heading: value } )
							}
							placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
						/>
					</h2>
				</div>

				<div className={ `${ baseClass }__grid` }>
					{ items.map( ( item, index ) => (
						<div key={ index } className={ `${ baseClass }__item` }>
							<RemoveButtonCross
								color="red"
								text={ __( 'Remove Item', 'ft-blocks' ) }
								handleClick={ () => removeItem( index ) }
							/>

							<div className={ `${ baseClass }__item-image` }>
								<ImageUploader
									image={ item.image?.url }
									onSelect={ ( media ) =>
										updateItem( index, 'image', {
											id: media.id,
											url: media.url,
										} )
									}
									onRemove={ () =>
										updateItem( index, 'image', {
											id: null,
											url: '',
										} )
									}
								/>
							</div>

							<div className={ `${ baseClass }__item-content` }>
								<RichText
									tagName="h3"
									className={ `${ baseClass }__item-title ${ h3 }` }
									value={ item.title }
									onChange={ ( value ) =>
										updateItem( index, 'title', value )
									}
									placeholder={ __(
										'Service title…',
										'ft-blocks'
									) }
								/>
								<RichText
									tagName="p"
									className={ `${ baseClass }__item-price` }
									value={ item.price }
									onChange={ ( value ) =>
										updateItem( index, 'price', value )
									}
									placeholder={ __(
										'Enter price…',
										'ft-blocks'
									) }
								/>
							</div>
						</div>
					) ) }

					<Button
						isPrimary
						onClick={ addItem }
						className="ft-button ft-admin-button"
					>
						{ items.length
							? __( 'Add Item', 'ft-blocks' )
							: __( 'Add First Item', 'ft-blocks' ) }
					</Button>
				</div>

				<div className={ `${ baseClass }__footer ${ centered }` }>
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
	);
}
