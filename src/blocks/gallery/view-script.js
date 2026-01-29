'use strict';

import Masonry from 'masonry-layout';

( function () {
	const INITIALIZED_KEY = 'ftGalleryInitialized';
	const block = document.querySelector( '.ft-blocks-gallery' );

	if ( block.dataset[ INITIALIZED_KEY ] ) {
		return;
	}

	new Masonry( '.ft-blocks-gallery__images', {
		itemSelector: '.ft-blocks-gallery__image',
		percentPosition: true,
	} );
} )();
