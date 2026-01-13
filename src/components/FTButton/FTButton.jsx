import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import config from '../../../config.json';

const FTButton = ( { baseClass, variant = 'primary', value, onChange } ) => {
	const { button } = config.classes;

	return (
		<RichText
			tagName="p"
			className={ `${ baseClass }__button ${ button } ${ button }-${ variant }` }
			value={ value }
			onChange={ onChange }
			placeholder={ __( 'Button text', 'ft-blocks' ) }
			allowedFormats={ [ 'core/link' ] }
		/>
	);
};

export default FTButton;
