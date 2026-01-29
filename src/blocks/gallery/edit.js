/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { ImagesSlider } from '../../components';
import config from '../../../config.json';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function to update attributes.
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { images } = attributes;
	const { baseBlock, container, wrapper } = config.classes;

	const baseClass = `${ baseBlock }-gallery`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	return (
		<div { ...blockProps }>
			<div className={ container }>
				<ImagesSlider
					images={ images }
					imagesAttrName="images"
					setAttributes={ setAttributes }
				/>
			</div>
		</div>
	);
}
