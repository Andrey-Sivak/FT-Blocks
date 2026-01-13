'use strict';

import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

( function () {
	class AboutSlider {
		constructor() {
			this.slider = document.querySelector( '.ft-blocks-hero__slider' );

			if ( ! this.slider ) {
				return;
			}

			this.init();
		}

		init() {
			const slideCount =
				this.slider.querySelectorAll( '.swiper-slide' ).length;

			if ( slideCount <= 1 ) {
				return;
			}

			new Swiper( this.slider, {
				modules: [ Pagination, Autoplay ],
				slidesPerView: 1,
				loop: true,
				autoplay: {
					delay: 4000,
					speed: 1000,
				},
				grabCursor: true,
				centeredSlides: false,
				pagination: {
					el: '.ft-blocks-hero__pagination',
					clickable: true,
				},
				breakpoints: {},
			} );
		}
	}

	new AboutSlider();
} )();
