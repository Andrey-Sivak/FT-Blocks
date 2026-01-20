'use strict';

import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'fslightbox';

( function () {
	class AboutSlider {
		constructor() {
			this.slider = document.querySelector(
				'.ft-blocks-about-me__slider'
			);

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
					delay: 3000,
					speed: 1000,
				},
				grabCursor: true,
				centeredSlides: false,
				pagination: {
					el: '.ft-blocks-about-me__pagination',
					clickable: true,
				},
				breakpoints: {},
			} );
		}
	}

	new AboutSlider();
} )();
