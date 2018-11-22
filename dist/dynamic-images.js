'use strict';
/**
 * Instance reference for singleton. 
 * Manage only one instance of the class DynamicImages.
 *
 * @public
 * @type {DynamicImages}
 * @default null
 */

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var instance = null;
/**
 * Create dynamic <img> source.
 *
 * @class
 * @classdesc Create dynamic images based on the given configuration. See documentation for more information.
 */

var DynamicImages =
/*#__PURE__*/
function () {
  /**
   * Constructor method. 
   * 
   * @see https://stackoverflow.com/a/171256/3441223
   */
  function DynamicImages(options) {
    _classCallCheck(this, DynamicImages);

    if (!instance) {
      instance = this;
      this.options = _objectSpread({}, DynamicImages.defaults, options);
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


  _createClass(DynamicImages, [{
    key: "init",
    value: function init() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.images = document.querySelectorAll('img[data-dynamic]'); // Loop through the images

      for (var i = 0; i < this.images.length; i++) {
        this.draw(this.images[i]);
      }
    }
    /**
     * Draw the image from the canvas and assign the BLOB to the current image.
     *
     * @public
     * @param {object} img The <img> element.
     */

  }, {
    key: "draw",
    value: function draw(img) {
      // Retreive custom data attributes 
      var width = parseInt(img.dataset.width); // data-width

      var height = parseInt(img.dataset.height); // data-height

      var background = img.dataset.background; // data-background
      // Check for valid custom data attributes, if doesn't exist
      // fallback to defaults options.

      if (!width || typeof width != 'number') width = this.options.width;
      if (!height || typeof height != 'number') height = this.options.height;
      if (!background) background = this.options.background; // Set canvas width and height

      this.canvas.width = width;
      this.canvas.height = height; // Set the background color.

      this.ctx.fillStyle = background; // Draw the shape.

      this.ctx.fillRect(0, 0, width, height); // Draw text

      this.ctx.font = '40px Monospace';
      this.ctx.font = this.getFont(width, height);
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.strokeText(this.getText(width, height), width / 2, height / 2); // Assign BLOB to the <img> src

      img.src = this.canvas.toDataURL();
      this.reset();
    }
    /**
     * Return the calculated font.
     *
     * @private	
     * @param {int} width The width of the canvas.
     * @param {int} height The height of the canvas.
     * @return {string} The calculated font.
     */

  }, {
    key: "getFont",
    value: function getFont(width, height) {
      var ratio = 40 / this.options.width;
      var size = width * ratio;
      var textHeight = size * 1.2; // The default line height.

      if (textHeight >= height / 3) size = width / 2 * ratio;
      return (size | 0) + 'px Monospace';
    }
    /**
     * Redraw images.
     *
     * @public
     */

  }, {
    key: "redraw",
    value: function redraw() {
      this.init();
    }
    /**
     * Reset canvas for redrawing.
     * 
     * @see https://stackoverflow.com/a/2142549/3441223
     */

  }, {
    key: "reset",
    value: function reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Generate width x height text.
     *
     * @public
     * @param {number} width
     * @param {number} height
     */

  }, {
    key: "getText",
    value: function getText(width, height) {
      return "".concat(width, "x").concat(height);
    }
    /**
     * Shorthand for console.log
     *
     * @public
     * @static
     * @function
     * @param {string | object} message The message to log.
     */

  }], [{
    key: "log",
    value: function log(message) {
      console.log(message);
    }
  }]);

  return DynamicImages;
}();
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
//# sourceMappingURL=dynamic-images.js.map
