/**
 * Registers a new block provided a unique name and an object defining its behavior.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { baseBlockIcon } from '../../shared/block-icon';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	...metadata,
	icon: {
		...baseBlockIcon,
		src: 'cover-image',
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * Dynamic block - rendered via PHP
	 */
	save: () => null,
} );
