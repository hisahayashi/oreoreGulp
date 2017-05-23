var MAIN = (function() {
  'use strict';

  /**
   * [MAIN description]
   */
  MAIN = function() {
    this.init();
  };

  /**
   * [init description]
   * @return {[type]} [description]
   */
  function init(){
    var that = this;

    // sound
    this.layout = new MAIN.Layout();
    // this.sound = new MAIN.Sound();
    // this.api = new MAIN.API();
    this.utils = new MAIN.Utils();

    this.loadStart();
  };

  /**
   * [loadStart description]
   * @return {[type]} [description]
   */
  function loadStart() {
    var that = this;

    // loader
    var imageAry = [];
    var params = {
      container: $('#wrap'),
      img: true,
      background: true,
      list: imageAry,
      start: true
    };

    this.loader = new MAIN.Loader(params);
    this.loader.on(this.loader.EventAlways, function(e) {
      debug('always', e.instance);
      that.loader.off(this.loader.EventAlways, function(){});
      that.loadComplete();
    });

    this.loader.on(this.loader.EventProgress, function(e) {
      debug('progress', e.image.img.src);
      that.loader.off(this.loader.EventProgress, function(e) {});
    });
  };

  /**
   * [loadComplete description]
   * @return {[type]} [description]
   */
  function loadComplete() {
    var that = this;

    // sound
    // this.sound.start();

    // api
    // this.api.getIndexJson(this.api);
    // this.api.on('COMPLETE', function(data) {
    //   debug(data);
    // });

    // utils
    // this.utils.statsSetup();
    // this.utils.statsBegin();
    // var update = function(e) {
    //   that.utils.statsBegin();
    //   that.utils.statsEnd();
    //   requestAnimationFrame(update);
    // };
    // update();

  };

  MAIN.prototype = Object.create(new EventEmitter2());
  MAIN.prototype.constructor = MAIN;

  MAIN.prototype.init = init;
  MAIN.prototype.loadStart = loadStart;
  MAIN.prototype.loadComplete = loadComplete;

  return MAIN;
}());
