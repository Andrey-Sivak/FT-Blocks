'use strict';

( function () {
	class Animations {
		observer = null;

		constructor() {
			this.itemsToAnimate = [
				...document.querySelectorAll( '.ft-blocks-animate' ),
			];

			this.initCommonAnimations();
			this.init();
		}

		initCommonAnimations() {
			if ( this.itemsToAnimate.length ) {
				this.observer = new IntersectionObserver(
					( entries, observer ) => {
						entries.forEach( ( entry ) => {
							if ( entry.isIntersecting ) {
								entry.target.classList.add(
									'ft-blocks-visible'
								);
								observer.unobserve( entry.target );
							}
						} );
					},
					{
						root: null,
						rootMargin: '0px',
						threshold: 0.5,
					}
				);
			}
		}

		init() {
			this.itemsToAnimate.forEach( ( item ) => {
				this.observer.observe( item );
			}, this );
		}
	}

	new Animations();
} )();
