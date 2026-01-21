/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	FormTokenField,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import config from '../../../config.json';
import { FTButton } from '../../components';
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
	const {
		heading,
		description,
		sectionLabel,
		postsCount,
		orderBy,
		order,
		excludePosts,
		includePosts,
		button,
	} = attributes;

	const { baseBlock, container, wrapper, h2, h3 } = config.classes;
	const baseClass = `${ baseBlock }-blog-posts`;

	const blockProps = useBlockProps( {
		className: `${ baseClass } ${ wrapper }`,
	} );

	// Fetch posts for preview and token field
	const { posts, allPosts, categories, isLoading } = useSelect(
		( select ) => {
			const { getEntityRecords, isResolving } = select( coreStore );

			const queryArgs = {
				per_page: postsCount,
				order,
				_embed: true,
				status: 'publish', // Only get published posts
			};

			// Handle include/exclude logic
			if ( includePosts && includePosts.length > 0 ) {
				queryArgs.include = includePosts;
			} else {
				// Only set orderby if not using include
				queryArgs.orderby = orderBy;

				if ( excludePosts && excludePosts.length > 0 ) {
					queryArgs.exclude = excludePosts;
				}
			}

			const postsQuery = getEntityRecords(
				'postType',
				'post',
				queryArgs
			);
			const allPostsQuery = getEntityRecords( 'postType', 'post', {
				per_page: 100,
				orderby: 'title',
				order: 'asc',
				status: 'publish',
			} );

			const categoriesQuery = getEntityRecords( 'taxonomy', 'category', {
				per_page: 100,
			} );

			return {
				posts: postsQuery,
				allPosts: allPostsQuery,
				categories: categoriesQuery,
				isLoading: isResolving( 'getEntityRecords', [
					'postType',
					'post',
					queryArgs,
				] ),
			};
		},
		[ postsCount, orderBy, order, excludePosts, includePosts ]
	);

	// Convert posts to suggestions for token field
	const postSuggestions =
		allPosts?.map( ( post ) => post.title.rendered ) || [];

	// Get post titles by IDs for token field values
	const getPostTitlesByIds = ( ids ) => {
		if ( ! allPosts || ! ids || ids.length === 0 ) {
			return [];
		}
		return ids
			.map( ( id ) => {
				const post = allPosts.find( ( p ) => p.id === id );
				return post ? post.title.rendered : null;
			} )
			.filter( Boolean );
	};

	// Get post IDs by titles
	const getPostIdsByTitles = ( titles ) => {
		if ( ! allPosts || ! titles || titles.length === 0 ) {
			return [];
		}
		return titles
			.map( ( title ) => {
				const post = allPosts.find(
					( p ) => p.title.rendered === title
				);
				return post ? post.id : null;
			} )
			.filter( Boolean );
	};

	const getCategoriesByIds = ( ids ) => {
		if ( ! categories || ! ids || ids.length === 0 ) {
			return [];
		}
		return ids
			.map( ( id ) => categories.find( ( cat ) => cat.id === id ) )
			.filter( Boolean );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Query Settings', 'ft-blocks' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Number of posts', 'ft-blocks' ) }
						value={ postsCount }
						onChange={ ( value ) =>
							setAttributes( { postsCount: value } )
						}
						min={ 1 }
						max={ 12 }
					/>

					<SelectControl
						label={ __( 'Order by', 'ft-blocks' ) }
						value={ orderBy }
						options={ [
							{
								label: __( 'Date', 'ft-blocks' ),
								value: 'date',
							},
							{
								label: __( 'Title', 'ft-blocks' ),
								value: 'title',
							},
							{
								label: __( 'Modified', 'ft-blocks' ),
								value: 'modified',
							},
							{
								label: __( 'Random', 'ft-blocks' ),
								value: 'rand',
							},
							{
								label: __( 'Menu Order', 'ft-blocks' ),
								value: 'menu_order',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { orderBy: value } )
						}
						disabled={ includePosts && includePosts.length > 0 }
					/>

					<SelectControl
						label={ __( 'Order', 'ft-blocks' ) }
						value={ order }
						options={ [
							{
								label: __( 'Descending', 'ft-blocks' ),
								value: 'desc',
							},
							{
								label: __( 'Ascending', 'ft-blocks' ),
								value: 'asc',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { order: value } )
						}
						disabled={ includePosts && includePosts.length > 0 }
					/>

					<FormTokenField
						label={ __( 'Include specific posts', 'ft-blocks' ) }
						value={ getPostTitlesByIds( includePosts ) }
						suggestions={ postSuggestions }
						onChange={ ( tokens ) =>
							setAttributes( {
								includePosts: getPostIdsByTitles( tokens ),
								excludePosts: [],
							} )
						}
						__experimentalExpandOnFocus
						__experimentalShowHowTo={ false }
					/>

					<FormTokenField
						label={ __( 'Exclude posts', 'ft-blocks' ) }
						value={ getPostTitlesByIds( excludePosts ) }
						suggestions={ postSuggestions }
						onChange={ ( tokens ) =>
							setAttributes( {
								excludePosts: getPostIdsByTitles( tokens ),
								includePosts: [],
							} )
						}
						__experimentalExpandOnFocus
						__experimentalShowHowTo={ false }
						disabled={ includePosts && includePosts.length > 0 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `${ baseClass }__container ${ container }` }>
					<div className={ `${ baseClass }__header` }>
						<div className={ `${ baseClass }__header-content` }>
							<RichText
								tagName="p"
								className={ `${ baseClass }__heading ${ h2 }` }
								value={ heading }
								onChange={ ( value ) =>
									setAttributes( { heading: value } )
								}
								placeholder={ __(
									'Enter Heading…',
									'ft-blocks'
								) }
							/>

							<RichText
								tagName="p"
								className={ `${ baseClass }__description` }
								value={ description }
								onChange={ ( value ) =>
									setAttributes( { description: value } )
								}
								placeholder={ __(
									'Enter description…',
									'ft-blocks'
								) }
							/>
						</div>
						<div className={ `${ baseClass }__header-button` }>
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

					{ /* Posts Grid */ }
					<div className={ `${ baseClass }__grid-wrap` }>
						<RichText
							tagName="p"
							className={ `${ baseClass }__section-label` }
							value={ sectionLabel }
							onChange={ ( value ) =>
								setAttributes( { sectionLabel: value } )
							}
							placeholder={ __(
								'Section label (e.g. "Tips")…',
								'ft-blocks'
							) }
						/>
						<div className={ `${ baseClass }__grid` }>
							{ isLoading && <Spinner /> }

							{ ! isLoading &&
								posts &&
								posts.length > 0 &&
								posts.map( ( post ) => (
									<article
										key={ post.id }
										className={ `${ baseClass }__item` }
									>
										{ post._embedded?.[
											'wp:featuredmedia'
										]?.[ 0 ]?.source_url && (
											<figure
												className={ `${ baseClass }__item-image` }
											>
												<img
													src={
														post._embedded[
															'wp:featuredmedia'
														][ 0 ].source_url
													}
													alt={
														post._embedded[
															'wp:featuredmedia'
														][ 0 ].alt_text || ''
													}
												/>
											</figure>
										) }
										<div
											className={ `${ baseClass }__item-categories` }
										>
											{ getCategoriesByIds(
												post.categories
											).map( ( cat, index ) => (
												<span key={ cat.id }>
													{ index > 0 && ', ' }
													<span>{ cat.name }</span>
												</span>
											) ) }
										</div>
										<h3
											className={ `${ baseClass }__item-title ${ h3 }` }
											dangerouslySetInnerHTML={ {
												__html: post.title.rendered,
											} }
										/>
										<div
											className={ `${ baseClass }__item-excerpt` }
											dangerouslySetInnerHTML={ {
												__html: post.excerpt.rendered,
											} }
										/>
										<div
											className={ `${ baseClass }__item-date` }
										>
											{ new Intl.DateTimeFormat(
												'cs-CZ',
												{
													day: 'numeric',
													month: 'long',
													year: 'numeric',
												}
											)
												.format( new Date( post.date ) )
												.replace( ' ', ' ' )
												.replace( ' ', ' ' ) }
										</div>
									</article>
								) ) }

							{ ! isLoading &&
								( ! posts || posts.length === 0 ) && (
									<p>
										{ __( 'No posts found.', 'ft-blocks' ) }
									</p>
								) }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
