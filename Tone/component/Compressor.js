define(["Tone/core/Tone", "Tone/signal/Signal"], function(Tone){

	"use strict";

	/**
	 *  @class A thin wrapper around the DynamicsCompressorNode
	 *
	 *  @extends {Tone}
	 *  @constructor
	 *  @param {Decibels=} threshold The value above which the compression starts to be applied.
	 *  @param {Positive=} ratio The gain reduction ratio.
	 *  @example
	 *  var comp = new Tone.Compressor(-30, 3);
	 */
	Tone.Compressor = function(){

		var options = this.optionsObject(arguments, ["threshold", "ratio"], Tone.Compressor.defaults);

		/**
		 *  the compressor node
		 *  @type {DynamicsCompressorNode}
		 *  @private
		 */
		this._compressor = this.input = this.output = this.context.createDynamicsCompressor();

		/**
		 *  the threshold vaue
		 *  @type {Decibels}
		 *  @signal
		 */
		this.threshold = this._compressor.threshold;

		/**
		 *  The attack parameter
		 *  @type {Time}
		 *  @signal
		 */
		this.attack = new Tone.Signal(this._compressor.attack, Tone.Type.Time);

		/**
		 *  The release parameter
		 *  @type {Time}
		 *  @signal
		 */
		this.release = new Tone.Signal(this._compressor.release, Tone.Type.Time);

		/**
		 *  The knee parameter
		 *  @type {Decibels}
		 *  @signal
		 */
		this.knee = this._compressor.knee;

		/**
		 *  The ratio value
		 *  @type {Number}
		 *  @signal
		 */
		this.ratio = this._compressor.ratio;

		//set the defaults
		this._readOnly(["knee", "release", "attack", "ratio", "threshold"]);
		this.set(options);
	};

	Tone.extend(Tone.Compressor);

	/**
	 *  @static
	 *  @const
	 *  @type {Object}
	 */
	Tone.Compressor.defaults = {
		"ratio" : 12,
		"threshold" : -24,
		"release" : 0.25,
		"attack" : 0.003,
		"knee" : 30
	};

	/**
	 *  clean up
	 *  @returns {Tone.Compressor} `this`
	 */
	Tone.Compressor.prototype.dispose = function(){
		Tone.prototype.dispose.call(this);
		this._writable(["knee", "release", "attack", "ratio", "threshold"]);
		this._compressor.disconnect();
		this._compressor = null;
		this.attack.dispose();
		this.attack = null;
		this.release.dispose();
		this.release = null;
		this.threshold = null;
		this.ratio = null;
		this.knee = null;
		return this;
	};

	return Tone.Compressor;
});