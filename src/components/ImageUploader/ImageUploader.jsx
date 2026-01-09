import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Icon } from '@wordpress/components';
import { pencil, trash } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import './style.scss';

const baseClass = 'ft-image-uploader';

const ImageUploader = ( {
	image,
	onSelect,
	onRemove,
	buttonText = __( 'Add Image', 'ft-blocks' ),
	allowedTypes = [ 'image' ],
} ) => {
	const buttonClass = image
		? `${ baseClass }__image-button`
		: 'button-secondary ft-button ft-admin-button';

	const Image = ( { src } ) => (
		<img
			src={ src }
			alt={ __( 'Image', 'ft-blocks' ) }
			className={ `${ baseClass }__image` }
		/>
	);

	return (
		<div className={ `${ baseClass }` }>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onSelect }
					allowedTypes={ allowedTypes }
					value={ image }
					render={ ( { open } ) => (
						<div className={ `${ baseClass }__frame` }>
							<Button className={ buttonClass } onClick={ open }>
								{ image ? <Image src={ image } /> : buttonText }
							</Button>
							{ image && (
								<div className={ `${ baseClass }__actions` }>
									<Button
										className={ `${ baseClass }__actions_btn` }
										icon={ <Icon icon={ pencil } /> }
										label={ __(
											'Change image',
											'ft-blocks'
										) }
										onClick={ open }
										size="medium"
									/>
									{ onRemove && (
										<Button
											className={ `${ baseClass }__actions_btn` }
											icon={ <Icon icon={ trash } /> }
											label={ __(
												'Remove image',
												'ft-blocks'
											) }
											onClick={ onRemove }
											size="medium"
											isDestructive
										/>
									) }
								</div>
							) }
						</div>
					) }
				/>
			</MediaUploadCheck>
		</div>
	);
};

export default ImageUploader;
