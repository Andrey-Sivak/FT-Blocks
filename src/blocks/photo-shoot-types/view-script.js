'use strict';

( function () {
	const INITIALIZED_KEY = 'ftPhotoShootTabsInitialized';

	class PhotoShootTypesTabs {
		constructor( block ) {
			if ( block.dataset[ INITIALIZED_KEY ] ) {
				return;
			}

			this.block = block;
			this.tabButtons = block.querySelectorAll(
				'.ft-blocks-photo-shoot-types__tab-button'
			);
			this.tabPanels = block.querySelectorAll(
				'.ft-blocks-photo-shoot-types__tab-panel'
			);

			if ( this.tabButtons.length === 0 || this.tabPanels.length === 0 ) {
				return;
			}

			block.dataset[ INITIALIZED_KEY ] = 'true';

			this.init();
		}

		init() {
			this.tabButtons.forEach( ( button ) => {
				button.addEventListener( 'click', ( e ) =>
					this.handleTabClick( e )
				);
				button.addEventListener( 'keydown', ( e ) =>
					this.handleKeydown( e )
				);
			} );
		}

		handleTabClick( e ) {
			const button = e.currentTarget;
			const tabIndex = parseInt( button.dataset.tabIndex, 10 );

			this.activateTab( tabIndex );
		}

		handleKeydown( e ) {
			const currentIndex = parseInt(
				e.currentTarget.dataset.tabIndex,
				10
			);
			let newIndex;

			switch ( e.key ) {
				case 'ArrowLeft':
					newIndex =
						currentIndex > 0
							? currentIndex - 1
							: this.tabButtons.length - 1;
					break;
				case 'ArrowRight':
					newIndex =
						currentIndex < this.tabButtons.length - 1
							? currentIndex + 1
							: 0;
					break;
				case 'Home':
					newIndex = 0;
					break;
				case 'End':
					newIndex = this.tabButtons.length - 1;
					break;
				default:
					return;
			}

			e.preventDefault();
			this.activateTab( newIndex );
			this.tabButtons[ newIndex ].focus();
		}

		activateTab( index ) {
			// Update buttons
			this.tabButtons.forEach( ( button, i ) => {
				const isActive = i === index;
				button.classList.toggle( 'is-active', isActive );
				button.setAttribute(
					'aria-selected',
					isActive ? 'true' : 'false'
				);
			} );

			// Update panels
			this.tabPanels.forEach( ( panel, i ) => {
				const isActive = i === index;
				panel.classList.toggle( 'is-active', isActive );
				panel.hidden = ! isActive;
			} );
		}
	}

	// Initialize all Photo Shoot Types blocks on the page
	document
		.querySelectorAll( '.ft-blocks-photo-shoot-types' )
		.forEach( ( block ) => new PhotoShootTypesTabs( block ) );
} )();
