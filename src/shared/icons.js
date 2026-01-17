/**
 * Shared SVG icons
 */
import config from '../../config.json';

const icons = config.icons;

/**
 * Get icon string by name
 *
 * @param {string} name Icon name
 * @return {string} Icon SVG string
 */
export const getIcon = ( name ) => icons[ name ] || '';

/**
 * Icon component that renders SVG from string
 *
 * @param {Object} props           Component props.
 * @param {string} props.name      Icon name.
 * @param {string} props.className Additional class name.
 * @return {JSX.Element|null} Icon element.
 */
export const Icon = ( { name, className = '' } ) => {
	const svg = icons[ name ];

	if ( ! svg ) {
		return null;
	}

	return (
		<span
			className={ className }
			dangerouslySetInnerHTML={ { __html: svg } }
		/>
	);
};

export default icons;
