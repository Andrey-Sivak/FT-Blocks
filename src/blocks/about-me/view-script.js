'use strict';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
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
				modules: [ Pagination ],
				slidesPerView: 1,
				loop: true,
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
