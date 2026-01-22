'use strict';

import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';

( function () {
	const INITIALIZED_KEY = 'ftTestimonialsInitialized';

	// Breakpoints matching SCSS variables
	const BP_SM = 576;
	const BP_LG = 1024;

	class TestimonialsSlider {
		constructor( block ) {
			if ( block.dataset[ INITIALIZED_KEY ] ) {
				return;
			}

			this.block = block;
			this.slider = document.querySelector(
				'.ft-blocks-testimonials__slider'
			);

			if ( ! this.slider ) {
				return;
			}

			this.itemsCount = parseInt(
				this.slider.dataset.itemsCount || '0',
				10
			);

			this.init();
		}

		/**
		 * Get Swiper configuration based on items count.
		 * @return {Object|null} Swiper config or null if no slider needed.
		 */
		getSliderConfig() {
			const baseConfig = {
				modules: [ Pagination, Navigation ],
				spaceBetween: 40,
				grabCursor: true,
				loop: true,
				pagination: {
					el: '.ft-blocks-testimonials__pagination',
					clickable: true,
				},
				navigation: {
					prevEl: '.ft-blocks-testimonials__nav-prev',
					nextEl: '.ft-blocks-testimonials__nav-next',
				},
			};

			// 1 item: no slider at all
			if ( this.itemsCount === 1 ) {
				return null;
			}

			// 2 items: slider only below BP_LG (1 slide), disabled at BP_LG+
			if ( this.itemsCount === 2 ) {
				return {
					...baseConfig,
					slidesPerView: 1,
					breakpoints: {
						0: {
							slidesPerView: 1,
							enabled: true,
						},
						[ BP_SM ]: {
							slidesPerView: 2,
							enabled: true,
						},
						[ BP_LG ]: {
							slidesPerView: 2,
							enabled: false,
						},
					},
				};
			}

			// 3 items: slider only below BP_LG (1 slide), disabled at BP_LG+
			if ( this.itemsCount === 3 ) {
				return {
					...baseConfig,
					slidesPerView: 1,
					breakpoints: {
						0: {
							slidesPerView: 1,
							enabled: true,
						},
						[ BP_SM ]: {
							slidesPerView: 2,
							enabled: true,
						},
						[ BP_LG ]: {
							slidesPerView: 3,
							enabled: false,
						},
					},
				};
			}

			// 4+ items: always slider - 1 slide (<SM), 2 slides (SM-LG), 3 slides (LG+)
			return {
				...baseConfig,
				slidesPerView: 1,
				breakpoints: {
					0: {
						slidesPerView: 1,
					},
					[ BP_SM ]: {
						slidesPerView: 2,
					},
					[ BP_LG ]: {
						slidesPerView: 3,
					},
				},
			};
		}

		init() {
			const config = this.getSliderConfig();

			// No slider for single item
			if ( ! config ) {
				this.slider.classList.add(
					'ft-blocks-testimonials__slider--no-slider'
				);
				return;
			}

			this.slider.classList.add(
				'ft-blocks-testimonials__slider--slider'
			);

			this.swiper = new Swiper( this.slider, config );
		}
	}

	document
		.querySelectorAll( '.ft-blocks-testimonials' )
		.forEach( ( block ) => new TestimonialsSlider( block ) );
} )();
