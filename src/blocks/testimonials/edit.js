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
	const { heading, description, testimonials, button } = attributes;
	const { baseBlock, container, wrapper, h2, centered } = config.classes;

	const baseClass = `${ baseBlock }-testimonials`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	const updateTestimonial = ( index, key, value ) => {
		const newTestimonials = [ ...testimonials ];
		newTestimonials[ index ] = {
			...newTestimonials[ index ],
			[ key ]: value,
		};
		setAttributes( { testimonials: newTestimonials } );
	};

	const addTestimonial = () => {
		setAttributes( {
			testimonials: [ ...testimonials, { quote: '', author: '' } ],
		} );
	};

	const removeTestimonial = ( index ) => {
		const newTestimonials = testimonials.filter( ( _, i ) => i !== index );
		setAttributes( { testimonials: newTestimonials } );
	};

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__container ${ container }` }>
				{ /* Header */ }
				<div className={ `${ baseClass }__header ${ centered }` }>
					<RichText
						tagName="span"
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
				</div>

				<div className={ `${ baseClass }__slider` }>
					{ testimonials.map( ( testimonial, index ) => (
						<div
							key={ index }
							className={ `${ baseClass }__slide ${ centered }` }
						>
							<RichText
								tagName="p"
								className={ `${ baseClass }__quote` }
								value={ testimonial.quote || '' }
								onChange={ ( value ) =>
									updateTestimonial( index, 'quote', value )
								}
								placeholder={ __(
									'"Enter testimonial quote…"',
									'ft-blocks'
								) }
							/>
							<span className={ `${ baseClass }__decor` } />
							<RichText
								tagName="p"
								className={ `${ baseClass }__author` }
								value={ testimonial.author || '' }
								onChange={ ( value ) =>
									updateTestimonial( index, 'author', value )
								}
								placeholder={ __( 'Author name', 'ft-blocks' ) }
							/>
							<RemoveButtonCross
								color="red"
								text={ __( 'Remove Testimonial', 'ft-blocks' ) }
								handleClick={ () => removeTestimonial( index ) }
							/>
						</div>
					) ) }

					<Button
						variant="primary"
						onClick={ addTestimonial }
						className="ft-button ft-admin-button"
						title={ __( 'Add Testimonial', 'ft-blocks' ) }
					>
						{ testimonials.length
							? __( 'Add Testimonial', 'ft-blocks' )
							: __( 'Add First Testimonial', 'ft-blocks' ) }
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
