/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';

import config from '../../../config.json';

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
	const { heading, formShortcode } = attributes;
	const { baseBlock, container, wrapper, h2 } = config.classes;
	const baseClass = `${ baseBlock }-contact-form`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__container ${ container }` }>
				<div className={ `${ baseClass }__form` }>
					<RichText
						tagName="p"
						className={ `${ baseClass }__heading ${ h2 }` }
						value={ heading }
						onChange={ ( value ) =>
							setAttributes( { heading: value } )
						}
						placeholder={ __( 'Enter Heading…', 'ft-blocks' ) }
					/>
					<TextControl
						label={ __( 'Contact Form 7 Shortcode', 'ft-blocks' ) }
						value={ formShortcode }
						onChange={ ( newShortcode ) =>
							setAttributes( { formShortcode: newShortcode } )
						}
						placeholder={ __(
							"Enter the form shortcode, for example: [contact-form-7 id='123' title='Contact Form']",
							'ft-blocks'
						) }
					/>
					<div className={ `${ baseClass }__form-placeholder` }>
						{ formShortcode ? (
							<p>
								{ __(
									'The form will be displayed on the website using the shortcode:',
									'ft-blocks'
								) }{ ' ' }
								{ formShortcode }
							</p>
						) : (
							<p>
								{ __(
									'Add the Contact Form 7 shortcode to display the form.',
									'ft-blocks'
								) }
							</p>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
