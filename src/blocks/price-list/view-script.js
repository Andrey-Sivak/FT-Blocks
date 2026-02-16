'use strict';

import { __ } from '@wordpress/i18n';

( function () {
	const INITIALIZED_KEY = 'ftPriceListInitialized';

	class PriceList {
		constructor( block ) {
			if ( block.dataset[ INITIALIZED_KEY ] ) {
				return;
			}

			this.block = block;
			this.items = block.querySelectorAll(
				'.ft-blocks-price-list__item'
			);
			this.toggleButtons = block.querySelectorAll(
				'.ft-blocks-price-list__item-details-label'
			);

			if ( this.items.length === 0 ) {
				return;
			}

			this.block.dataset[ INITIALIZED_KEY ] = 'true';

			this.init();
		}

		init() {
			this.toggleButtons.forEach( ( button ) => {
				button.addEventListener(
					'click',
					this.toggleItem.bind( this )
				);
			} );
		}

		toggleItem( e ) {
			const target = e.currentTarget;
			const item = target.closest( '.ft-blocks-price-list__item' );
			const isActive = item.classList.contains( 'is-active' );

			if ( ! isActive ) {
				item.classList.add( 'is-active' );
				target.setAttribute( 'aria-expanded', 'true' );
				target.innerHTML = __( 'Hide details', 'ft-blocks' );
				return;
			}

			item.classList.remove( 'is-active' );
			target.setAttribute( 'aria-expanded', 'false' );
			target.innerHTML = __( 'More details', 'ft-blocks' );
		}
	}

	document
		.querySelectorAll( '.ft-blocks-price-list' )
		.forEach( ( block ) => new PriceList( block ) );
} )();
