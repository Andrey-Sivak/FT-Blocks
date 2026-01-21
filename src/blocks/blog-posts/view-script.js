'use strict';

import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

( function () {
	// Breakpoints matching SCSS variables
	const BP_SM = 576;
	const BP_LG = 1024;

	class BlogPostsSlider {
		constructor() {
			this.slider = document.querySelector(
				'.ft-blocks-blog-posts__grid'
			);

			if ( ! this.slider ) {
				return;
			}

			this.postsCount = parseInt(
				this.slider.dataset.postsCount || '0',
				10
			);

			this.init();
		}

		/**
		 * Get Swiper configuration based on posts count.
		 * @return {Object|null} Swiper config or null if no slider needed.
		 */
		getSliderConfig() {
			const baseConfig = {
				modules: [ Pagination, Navigation ],
				spaceBetween: 40,
				grabCursor: true,
				loop: true,
				pagination: {
					el: '.ft-blocks-blog-posts__pagination',
					clickable: true,
				},
				navigation: {
					prevEl: '.ft-blocks-blog-posts__nav-prev',
					nextEl: '.ft-blocks-blog-posts__nav-next',
				},
			};

			// 1 post: no slider at all
			if ( this.postsCount === 1 ) {
				return null;
			}

			// 2 posts: slider only below BP_LG (1 slide), disabled at BP_LG+
			if ( this.postsCount === 2 ) {
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

			// 3 posts: slider only below BP_LG (1 slide), disabled at BP_LG+
			if ( this.postsCount === 3 ) {
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

			// 4+ posts: always slider - 1 slide (<SM), 2 slides (SM-LG), 3 slides (LG+)
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

			// No slider for single post
			if ( ! config ) {
				this.slider.classList.add(
					'ft-blocks-blog-posts__grid--no-slider'
				);
				return;
			}

			this.slider.classList.add( 'ft-blocks-blog-posts__grid--slider' );

			this.swiper = new Swiper( this.slider, config );
		}
	}

	new BlogPostsSlider();
} )();
