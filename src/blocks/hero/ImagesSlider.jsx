import { __ } from '@wordpress/i18n';
import { ImageUploader } from '../../components';
import { Button, Icon } from '@wordpress/components';
import { seen, closeSmall } from '@wordpress/icons';

const ImagesSlider = ( {
	baseClass,
	setAttributes,
	images,
	imagesAttrName,
	previewImageIndex,
	setPreviewImageIndex,
} ) => {
	const togglePreviewImage = ( index ) => {
		setPreviewImageIndex( previewImageIndex === index ? null : index );
	};

	const updateImage = ( index, newImage ) => {
		const newImages = [ ...images ];
		newImages[ index ] = newImage;
		setAttributes( { [ imagesAttrName ]: newImages } );

		setPreviewImageIndex( index );
	};

	const addImage = () => {
		const newImages = [
			...images,
			{
				id: null,
				url: '',
			},
		];
		setAttributes( { [ imagesAttrName ]: newImages } );
	};

	const removeImage = ( index ) => {
		if ( previewImageIndex === index ) {
			setPreviewImageIndex( null );
		}

		const newImages = [ ...images ];
		newImages.splice( index, 1 );
		setAttributes( { [ imagesAttrName ]: newImages } );
	};

	return (
		<div className={ `${ baseClass }__slider` }>
			{ images.map( ( image, index ) => {
				const isPreviewActive = previewImageIndex === index;

				return (
					<div
						key={ index }
						className={ `${ baseClass }__slide ${
							image.id ? '' : 'ft-empty'
						}` }
					>
						{ image.id && (
							<Button
								className={ `${ baseClass }__slide_show-preview` }
								icon={
									<Icon
										icon={
											isPreviewActive ? closeSmall : seen
										}
									/>
								}
								label={
									isPreviewActive
										? __( 'Hide preview', 'ft-blocks' )
										: __( 'Show preview', 'ft-blocks' )
								}
								onClick={ () => togglePreviewImage( index ) }
								size="medium"
							/>
						) }

						<ImageUploader
							image={ image.url }
							onSelect={ ( media ) =>
								updateImage( index, {
									id: media.id,
									url: media.url,
								} )
							}
							onRemove={ () => removeImage( index ) }
						/>
					</div>
				);
			} ) }

			<div className={ `${ baseClass }__slider_add-button` }>
				<Button
					isPrimary
					onClick={ addImage }
					className="ft-button ft-admin-button"
				>
					{ images.length
						? __( 'Add Image', 'ft-blocks' )
						: __( 'Add First Image', 'ft-blocks' ) }
				</Button>
			</div>
		</div>
	);
};

export default ImagesSlider;
