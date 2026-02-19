'use strict';

( function () {
	const INITIALIZED_KEY = 'ftContactFormInitialized';

	class Form {
		form = null;
		submitBtn = null;
		// formUID = null;
		loaderContainer = null;
		successContainer = null;

		constructor( block ) {
			if ( ! block ) {
				return;
			}

			this.block = block;
			this.form = this.block.querySelector( '.wpcf7-form' );
			if ( ! this.form ) {
				return;
			}

			this.submitBtn = this.form.querySelector( 'input[type="submit"]' );
			// const actionAttr = this.form.getAttribute('action');
			// const formIdMatch = actionAttr.match(/#wpcf7-f(\d+)-\w\d+/);
			// this.formUID = formIdMatch
			// 	? formIdMatch[0]
			// 	: actionAttr.substring(actionAttr.lastIndexOf('/') + 1);
			this.loaderContainer = this.block.querySelector(
				'.ft-blocks-contact-form__form_loading'
			);
			this.successContainer = this.block.querySelector(
				'.ft-blocks-contact-form__form_success'
			);

			block.dataset[ INITIALIZED_KEY ] = 'true';
			this.init();
		}

		// /contact-us/#wpcf7-f814-p818-o1
		// wpcf7-f811-p88-o1

		init() {
			this.submitBtn.addEventListener( 'click', () => {
				this.block.classList.add( 'ft-loading' );
			} );

			document.addEventListener( 'wpcf7mailsent', () => {
				// const formUID = e.detail.apiResponse.into;
				// if (formUID !== this.formUID) return;

				this.handleSuccess();
			} );

			document.addEventListener( 'wpcf7mailfailed', () => {
				// const formUID = e.detail.apiResponse.into;
				// if (formUID !== this.formUID) return;

				this.block.classList.remove( 'ft-loading' );
			} );

			document.addEventListener( 'wpcf7invalid', () => {
				// const formUID = e.detail.apiResponse.into;
				// if (formUID !== this.formUID) return;

				this.block.classList.remove( 'ft-loading' );
			} );
		}

		handleSuccess() {
			this.block.classList.remove( 'ft-loading' );
			setTimeout( () => {
				this.form.classList.add( 'init' );
				this.form.classList.remove( 'invalid' );
				this.block.classList.add( 'ft-success' );
			}, 10 );
		}
	}

	document
		.querySelectorAll( '.ft-blocks-contact-form__form' )
		.forEach( ( block ) => new Form( block ) );
} )();
