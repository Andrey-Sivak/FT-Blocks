import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Icon } from '@wordpress/components';
import { pencil, trash } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import config from '../../../config.json';
import './style.scss';

const { textDomain, prefix } = config;
const baseClass = `${ prefix }-image-uploader`;

const ImageUploader = ( {
	image,
	onSelect,
	onRemove,
	buttonText = __( 'Add Image', textDomain ),
	allowedTypes = [ 'image' ],
} ) => {
	const buttonClass = image
		? `${ baseClass }__image-button`
		: 'button-secondary ft-button ft-admin-button';

	const Image = ( { src } ) => (
		<img
			src={ src }
			alt={ __( 'Image', textDomain ) }
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
											textDomain
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
												textDomain
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
