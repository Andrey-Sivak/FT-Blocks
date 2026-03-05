'use strict';

( function () {
	const INITIALIZED_KEY = 'ftPostFaqInitialized';

	class FaqAccordion {
		constructor( block ) {
			if ( block.dataset[ INITIALIZED_KEY ] ) {
				return;
			}

			this.block = block;
			this.items = block.querySelectorAll( '.ft-blocks-post-faq__item' );
			this.toggleButtons = block.querySelectorAll(
				'.ft-blocks-post-faq__item-toggle'
			);

			if ( this.items.length === 0 ) {
				return;
			}

			block.dataset[ INITIALIZED_KEY ] = 'true';
			this.init();
		}

		init() {
			this.toggleButtons.forEach( ( button, index ) => {
				button.addEventListener( 'click', () =>
					this.toggleItem( index )
				);
			} );
		}

		toggleItem( index ) {
			const item = this.items[ index ];
			const button = this.toggleButtons[ index ];
			const isActive = item.classList.contains( 'is-active' );

			const activeItem = [ ...this.items ].find( ( i ) =>
				i.classList.contains( 'is-active' )
			);
			const hasActiveItem = activeItem && activeItem !== item;

			this.items.forEach( ( i, idx ) => {
				i.classList.remove( 'is-active' );
				this.toggleButtons[ idx ]?.setAttribute(
					'aria-expanded',
					'false'
				);
			} );

			if ( ! isActive ) {
				if ( hasActiveItem ) {
					const openAccordion = () => {
						item.classList.add( 'is-active' );
						button.setAttribute( 'aria-expanded', 'true' );
						activeItem.removeEventListener(
							'transitionend',
							openAccordion
						);
					};

					activeItem.addEventListener(
						'transitionend',
						openAccordion,
						{ once: true }
					);
				} else {
					item.classList.add( 'is-active' );
					button.setAttribute( 'aria-expanded', 'true' );
				}
			}
		}
	}

	document
		.querySelectorAll( '.ft-blocks-post-faq' )
		.forEach( ( block ) => new FaqAccordion( block ) );
} )();
