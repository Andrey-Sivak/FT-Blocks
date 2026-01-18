'use strict';

import Swiper from 'swiper';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';

( function () {
	class ImageSlider {
		constructor() {
			this.slider = document.querySelector(
				'.ft-blocks-service-info__slider'
			);
			this.bgItems = document.querySelectorAll(
				'.ft-blocks-service-info__bg-item'
			);

			this.isDesktop = window.matchMedia( '(min-width: 768px)' );

			if ( ! this.slider || ! this.bgItems.length ) {
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
				modules: [ Pagination, Navigation, EffectFade ],
				slidesPerView: 1,
				loop: true,
				grabCursor: true,
				centeredSlides: false,
				pagination: {
					el: '.ft-blocks-service-info__pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
					addIcons: true,
				},
				breakpoints: {},
				on: {
					slideChange: ( swiper ) => {
						if ( this.isDesktop.matches ) {
							this.updateBackground( swiper.realIndex );
						}
					},
				},
			} );
		}

		updateBackground( index ) {
			this.bgItems.forEach( ( item, i ) => {
				item.classList.toggle( 'is-active', i === index );
			} );
		}
	}

	new ImageSlider();
} )();
