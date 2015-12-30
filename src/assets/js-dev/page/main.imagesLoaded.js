MAIN.ImageLoaded = (function() {
  'use strict';

  /**
   * [ImageLoaded description]
   * @param {[type]} _this.elements [description]
   * @param {[type]} _is_start [description]
   */
  MAIN.ImageLoaded = function( _elements, _is_start ) {
    this.loader;
    this.elements = _elements;

    if( _is_start ){
      this.loadStart();
    }
  };

  /**
   * [init description]
   * @return {[type]} [description]
   */
  function init(){
    // this.on(this.EventProgress, function(){});
    // this.on(this.EventFail, function(){});
    // this.on(this.EventDone, function(){});
    // this.on(this.EventAlways, function(){});
  };

  /**
   * [loadStart description]
   * @return {[type]} [description]
   */
  function loadStart(){
    this.loader = new imagesLoaded( this.elements );
    this.loader.on( 'progress', this.onProgress );
    this.loader.on( 'fail', this.onFail );
    this.loader.on( 'done', this.onDone );
    this.loader.on( 'always', this.onAlways );

    this.loader.root = this;
  };

  /**
   * [loadComplete description]
   * @param  {[type]} instance [description]
   * @return {[type]}          [description]
   */
  function loadComplete() {
    this.loader.off( 'progress', this.onProgress );
    this.loader.off( 'fail', this.onFail );
    this.loader.off( 'done', this.onDone );
    this.loader.off( 'always', this.onAlways );
    this.loader = null;
  };

  /**
   * [onProgress description]
   * @param  {[type]} instance [description]
   * @param  {[type]} image    [description]
   * @return {[type]}          [description]
   */
  function onProgress( instance, image ){
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
  function onFail( instance ){
    var that = this.root;
    // debug('FAIL - all images loaded, at least one is broken');
    that.emit(that.EventFail, { instance: instance });
  };

  /**
   * [onDone description]
   * @param  {[type]} instance [description]
   * @return {[type]}          [description]
   */
  function onDone( instance ){
    var that = this.root;
    // debug('DONE  - all images have been successfully loaded');
    that.emit(that.EventDone, { instance: instance });
  };

  /**
   * [onAlways description]
   * @param  {[type]} instance [description]
   * @return {[type]}          [description]
   */
  function onAlways( instance ) {
    var that = this.root;
    // debug('all images are loaded');
    that.emit(that.EventAlways, { instance: instance });
    that.loadComplete();
  };

  /**
   * [setElements description]
   * @param {[type]} _this.elements [description]
   */
  function setElements( _elements ){
    this.elements = _elements;
  };

  MAIN.ImageLoaded.prototype = Object.create(new EventEmitter2());
  MAIN.ImageLoaded.prototype.constructor = MAIN.ImageLoaded;

  MAIN.ImageLoaded.prototype.loadStart = loadStart;
  MAIN.ImageLoaded.prototype.loadComplete = loadComplete;

  MAIN.ImageLoaded.prototype.onProgress = onProgress;
  MAIN.ImageLoaded.prototype.onFail = onFail;
  MAIN.ImageLoaded.prototype.onDone = onDone;
  MAIN.ImageLoaded.prototype.onAlways = onAlways;

  MAIN.ImageLoaded.prototype.EventAlways = 'EVENT_ALWAYS';
  MAIN.ImageLoaded.prototype.EventDone = 'EVENT_DONE';
  MAIN.ImageLoaded.prototype.EventFail = 'EVENT_FAIL';
  MAIN.ImageLoaded.prototype.EventProgress = 'EVENT_PROGRESS';

  MAIN.ImageLoaded.prototype.setElements = setElements;

  return MAIN.ImageLoaded;
}());
