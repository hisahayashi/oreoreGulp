var MAIN = (function(){
  'use strict';

  /**
   * [MAIN description]
   */
  MAIN = function() {

    /**
     * update
     */
    var images = [];
    var img = new Image();
    img.src = 'assets/img/common/share.jpg';
    images.push(img);
    var loader = new MAIN.ImageLoaded(images, true);
    loader.on(loader.EventAlways, function(){
      debug('always');
    });

    /**
     * sound
     */
    var sound = new MAIN.Sound();
    sound.start();

    /**
     * api
     */
    var api = new MAIN.API();
    api.getIndexJson(api);
    api.on('COMPLETE', function(data){
      debug(data);
    });

    /**
     * utils
     */
    var utils = new MAIN.Utils();
    utils.statsSetup();
    utils.statsBegin();

    var update = function(e){
      utils.statsBegin();
      utils.statsEnd();
      requestAnimationFrame(update);
    };
    update();

  };

  MAIN.prototype = Object.create( new EventEmitter2() );
  MAIN.prototype.constructor = MAIN;

  return MAIN;
}());
