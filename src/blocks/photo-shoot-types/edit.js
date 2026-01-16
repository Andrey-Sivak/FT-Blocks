/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import config from '../../../config.json';
import { ImageUploader, FTButton } from '../../components';
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
	const { heading, description, tabs, activeTab } = attributes;
	const { baseBlock, container, wrapper, centered, h2 } = config.classes;

	const baseClass = `${ baseBlock }-photo-shoot-types`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	const updateTab = ( index, key, value ) => {
		const newTabs = [ ...tabs ];
		newTabs[ index ] = {
			...newTabs[ index ],
			[ key ]: value,
		};
		setAttributes( { tabs: newTabs } );
	};

	const currentTab = tabs[ activeTab ] || tabs[ 0 ];

	return (
		<div { ...blockProps }>
			<div className={ `${ baseClass }__container ${ container }` }>
				<div className={ `${ baseClass }__header` }>
					<RichText
						tagName="h2"
						className={ `${ baseClass }__heading ${ h2 } ${ centered }` }
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
						placeholder={ __( 'Enter Subheading…', 'ft-blocks' ) }
					/>
				</div>

				<div className={ `${ baseClass }__tabs-nav` }>
					{ tabs.map( ( tab, index ) => (
						<button
							key={ index }
							type="button"
							className={ `${ baseClass }__tab-button ${
								activeTab === index ? 'is-active' : ''
							}` }
							onClick={ () =>
								setAttributes( { activeTab: index } )
							}
						>
							<RichText
								tagName="span"
								value={ tab.tabLabel }
								onChange={ ( value ) =>
									updateTab( index, 'tabLabel', value )
								}
								placeholder={ __( 'Tab Label', 'ft-blocks' ) }
							/>
						</button>
					) ) }
				</div>

				<div className={ `${ baseClass }__tabs-content` }>
					<div className={ `${ baseClass }__tab-panel` }>
						<div className={ `${ baseClass }__tab-image` }>
							<ImageUploader
								image={ currentTab.image?.url }
								onSelect={ ( media ) =>
									updateTab( activeTab, 'image', {
										id: media.id,
										url: media.url,
									} )
								}
								onRemove={ () =>
									updateTab( activeTab, 'image', {
										id: 0,
										url: '',
									} )
								}
							/>
						</div>

						<div className={ `${ baseClass }__tab-info` }>
							<RichText
								tagName="h3"
								className={ `${ baseClass }__tab-title` }
								value={ currentTab.title }
								onChange={ ( value ) =>
									updateTab( activeTab, 'title', value )
								}
								placeholder={ __(
									'Enter title…',
									'ft-blocks'
								) }
							/>
							<RichText
								tagName="p"
								className={ `${ baseClass }__tab-text` }
								value={ currentTab.text }
								onChange={ ( value ) =>
									updateTab( activeTab, 'text', value )
								}
								placeholder={ __( 'Enter text…', 'ft-blocks' ) }
							/>
							<FTButton
								baseClass={ baseClass }
								value={ currentTab.button }
								onChange={ ( value ) =>
									updateTab( activeTab, 'button', value )
								}
								variant="primary"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
