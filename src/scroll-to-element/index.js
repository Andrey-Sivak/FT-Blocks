'use strict';

( function () {
	const origin = new URL( window.location.href ).origin;
	const buttons = [
		...document.querySelectorAll(
			`.ft-button a[href^="${ origin }#"], .ft-button a[href^="#"]`
		),
	];

	if ( buttons.length ) {
		buttons.forEach( ( button ) =>
			button.addEventListener( 'click', ( e ) => {
				scrollToElement( e );

				// if ( document.body.classList.contains( 'mob-menu-active' ) ) {
				// 	document.body.classList.remove( 'mob-menu-active' );
				// }
			} )
		);
	}

	function scrollToElement( e ) {
		e.preventDefault();

		const targetId = e.currentTarget
			.getAttribute( 'href' )
			.split( '#' )[ 1 ];

		if ( ! targetId ) {
			return;
		}

		const targetElement = document.getElementById( targetId );

		if ( targetElement ) {
			const targetPosition =
				targetElement.getBoundingClientRect().top + window.scrollY - 50;

			const startPosition = window.pageYOffset;
			const distance = targetPosition - startPosition;
			let startTime = null;

			function animationStep( currentTime ) {
				if ( startTime === null ) {
					startTime = currentTime;
				}

				const timeElapsed = currentTime - startTime;
				const progress = Math.min( timeElapsed / 500, 1 );

				window.scrollTo(
					0,
					startPosition + distance * easeInOutCubic( progress )
				);

				if ( timeElapsed < 500 ) {
					requestAnimationFrame( animationStep );
				}
			}

			function easeInOutCubic( t ) {
				return t < 0.5
					? 4 * t * t * t
					: 1 - Math.pow( -2 * t + 2, 3 ) / 2;
			}

			requestAnimationFrame( animationStep );
		}
	}
} )();
