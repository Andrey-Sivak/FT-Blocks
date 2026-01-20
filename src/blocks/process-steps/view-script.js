'use strict';

import Masonry from 'masonry-layout';
import 'fslightbox';

( function () {
	const INITIALIZED_KEY = 'ftProcessStepsInitialized';

	class ProcessStepsAccordion {
		constructor( block ) {
			if ( block.dataset[ INITIALIZED_KEY ] ) {
				return;
			}

			this.block = block;
			this.steps = block.querySelectorAll(
				'.ft-blocks-process-steps__step'
			);
			this.toggleButtons = block.querySelectorAll(
				'.ft-blocks-process-steps__step-toggle'
			);

			if ( this.steps.length === 0 ) {
				return;
			}

			block.dataset[ INITIALIZED_KEY ] = 'true';
			this.init();
		}

		init() {
			this.toggleButtons.forEach( ( button, index ) => {
				button.addEventListener( 'click', () =>
					this.toggleStep( index )
				);
			} );
		}

		toggleStep( index ) {
			const step = this.steps[ index ];
			const content = step.querySelector(
				'.ft-blocks-process-steps__step-content'
			);
			const button = this.toggleButtons[ index ];
			const isActive = step.classList.contains( 'is-active' );

			// Close all steps
			this.steps.forEach( ( s, i ) => {
				s.classList.remove( 'is-active' );
				const c = s.querySelector(
					'.ft-blocks-process-steps__step-content'
				);
				if ( c ) {
					// c.hidden = true;
				}
				this.toggleButtons[ i ].setAttribute(
					'aria-expanded',
					'false'
				);
			} );

			// Open clicked step if it wasn't active
			if ( ! isActive ) {
				step.classList.add( 'is-active' );
				if ( content ) {
					// content.hidden = false;
				}
				button.setAttribute( 'aria-expanded', 'true' );
			}
		}
	}

	document
		.querySelectorAll( '.ft-blocks-process-steps' )
		.forEach( ( block ) => new ProcessStepsAccordion( block ) );

	new Masonry( '.ft-blocks-process-steps__images', {
		itemSelector: '.ft-blocks-process-steps__image',
		columnWidth: 250,
		percentPosition: true,
	} );
} )();
