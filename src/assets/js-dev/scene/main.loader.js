MAIN.Loader = (function() {
  'use strict';

  /**
   * [Loader description]
   * @param {[type]} _this.elements [description]
   * @param {[type]} _is_start [description]
   */
  MAIN.Loader = function(_elements, _is_start) {
    this.loader;
    this.elements = _elements;

    if (_is_start) {
      this.loadStart();
    }
  };

  /**
   * [init description]
   * @return {[type]} [description]
   */
  function init() {
    // this.on(this.EventProgress, function(){});
    // this.on(this.EventFail, function(){});
    // this.on(this.EventDone, function(){});
    // this.on(this.EventAlways, function(){});
  };

  /**
   * [loadStart description]
   * @return {[type]} [description]
   */
  function loadStart() {
    this.loader = new imagesLoaded(this.elements);
    this.loader.on('progress', this.onProgress);
    this.loader.on('fail', this.onFail);
    this.loader.on('done', this.onDone);
    this.loader.on('always', this.onAlways);

    this.loader.root = this;
  };

  /**
   * [loadComplete description]
   * @param  {[type]} instance [description]
   * @return {[type]}          [description]
   */
  function loadComplete() {
    this.loader.off('progress', this.onProgress);
    this.loader.off('fail', this.onFail);
    this.loader.off('done', this.onDone);
    this.loader.off('always', this.onAlways);
    this.loader = null;
  };

  /**
   * [onProgress description]
   * @param  {[type]} instance [description]
   * @param  {[type]} image    [description]
   * @return {[type]}          [description]
   */
  function onProgress(instance, image) {
    var that = this.root;
    var result = image.isLoaded ? 'loaded' : 'broken';
    // debug( 'image is ' + result + ' for ' + image.img.src );
    that.emit(that.EventProgress, { instance: instance, image: image });
  };

  /**
   * [onFail description]
   * @param  {[type]} instance [description]
   * @return {[type]}          [description]
   */
  function onFail(instance) {
    var that = this.root;
    // debug('FAIL - all images loaded, at least one is broken');
    that.emit(that.EventFail, { instance: instance });
  };

  /**
   * [onDone description]
   * @param  {[type]} instance [description]
   * @return {[type]}          [description]
   */
  function onDone(instance) {
    var that = this.root;
    // debug('DONE  - all images have been successfully loaded');
    that.emit(that.EventDone, { instance: instance });
  };

  /**
   * [onAlways description]
   * @param  {[type]} instance [description]
   * @return {[type]}          [description]
   */
  function onAlways(instance) {
    var that = this.root;
    // debug('all images are loaded');
    that.emit(that.EventAlways, { instance: instance });
    that.loadComplete();
  };

  /**
   * [setElements description]
   * @param {[type]} _this.elements [description]
   */
  function setElements(_elements) {
    this.elements = _elements;
  };

  MAIN.Loader.prototype = Object.create(new EventEmitter2());
  MAIN.Loader.prototype.constructor = MAIN.Loader;

  MAIN.Loader.prototype.loadStart = loadStart;
  MAIN.Loader.prototype.loadComplete = loadComplete;

  MAIN.Loader.prototype.onProgress = onProgress;
  MAIN.Loader.prototype.onFail = onFail;
  MAIN.Loader.prototype.onDone = onDone;
  MAIN.Loader.prototype.onAlways = onAlways;

  MAIN.Loader.prototype.EventAlways = 'EVENT_ALWAYS';
  MAIN.Loader.prototype.EventDone = 'EVENT_DONE';
  MAIN.Loader.prototype.EventFail = 'EVENT_FAIL';
  MAIN.Loader.prototype.EventProgress = 'EVENT_PROGRESS';

  MAIN.Loader.prototype.setElements = setElements;

  return MAIN.Loader;
}());
