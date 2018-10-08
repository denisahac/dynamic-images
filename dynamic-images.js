'use strict';

/**
 * Instance reference for singleton. 
 * Manage only one instance of the class DynamicImages.
 *
 * @public
 * @type {DynamicImages}
 * @default null
 */
let instance = null;

/**
 * Create dynamic <img> source.
 *
 * @class
 * @classdesc Create dynamic images based on the given configuration. See documentation for more information.
 */
class DynamicImages {

	/**
	 * Constructor method. 
	 * 
	 * @see https://stackoverflow.com/a/171256/3441223
	 */
	constructor(options) {
		if(!instance) {
			instance = this;
			
			this.options = {...DynamicImages.defaults, ...options};
			this.init();
		}

		return instance;
	}

	/**
	 * Prepare the canvas for drawing, and the set the drawing context,
	 * in this case 2 Dimensional drawings. Query <img> tags where [data-dynamic] is present.
	 *
	 * @public
	 */
	init() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.images = document.querySelectorAll('img[data-dynamic]');

		// Loop through the images
		for(let i = 0; i < this.images.length; i++) {
			this.draw(this.images[i]);
		}
	}

	/**
	 * Draw the image from the canvas and assign the BLOB to the current image.
	 *
	 * @public
	 * @param {object} img The <img> element.
	 */
	draw(img) {
		// Retreive custom data attributes 
		let width = parseInt(img.dataset.width); // data-width
		let height = parseInt(img.dataset.height); // data-height
		let background = img.dataset.background; // data-background

		// Check for valid custom data attributes, if doesn't exist
		// fallback to defaults options.
		if(!width || (typeof width != 'number'))
			width = this.options.width;

		if(!height || (typeof height != 'number')) 
			height = this.options.height;

		if(!background)
			background = this.options.background;

		// Set canvas width and height
		this.canvas.width = width;
		this.canvas.height = height;

		// Set the background color.
		this.ctx.fillStyle = background;
		// Draw the shape.
		this.ctx.fillRect(0, 0, width, height);

		// Draw text
		this.ctx.font = '40px Monospace';
		this.ctx.textAlign = 'center';
		this.ctx.strokeText(this.getText(width, height), width / 2, height / 2);

		// Assign BLOB to the <img> src
		img.src = this.canvas.toDataURL();

		this.reset();
	}

	/**
	 * Redraw images.
	 *
	 * @public
	 */
	redraw() {
		this.init();
	}

	/**
	 * Reset canvas for redrawing.
	 * 
	 * @see https://stackoverflow.com/a/2142549/3441223
	 */
	reset() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Generate width x height text.
	 *
	 * @public
	 * @param {number} width
	 * @param {number} height
	 */
	getText(width, height) {
		return `${width}x${height}`;
	}

	/**
	 * Shorthand for console.log
	 *
	 * @public
	 * @static
	 * @function
	 * @param {string | object} message The message to log.
	 */
	static log(message) {
		console.log(message);
	}
}

/**
 * Set default properties.
 */
DynamicImages.defaults = {
	/**
	 * Default image width.
	 * 
	 * @type {number}
	 * @default 150
	 */
	width: 150,
	/**
	 * Default image height.
	 *
	 * @type {number}
	 * @default 150
	 */
	height: 150,
	/**
	 * Default background color for the image.
	 *
	 * @type {string}
	 * @default #ccc
	 */
	background: '#ccc'
};
