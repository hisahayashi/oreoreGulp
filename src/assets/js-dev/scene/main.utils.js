MAIN.Utils = (function() {
  'use strict';

  /**
   * [Utils description]
   */
  MAIN.Utils = function() {
    this.stats = new Stats();
    this.gui;
    this.gui_text;
  };

  /**
   * [statsSetup description]
   * @return {[type]} [description]
   */
  function statsSetup() {
    // 0: fps, 1: ms, 2: mb
    this.stats.setMode(0);
    var $stats = $(this.stats.domElement);
    $stats.css({
      position: 'absolute',
      left: 0,
      top: 0,
      width: 120 + 'px',
      zIndex: 9999
    });
    $('body').append(this.stats.domElement);
  };

  /**
   * [statsBegin description]
   * @return {[type]} [description]
   */
  function statsBegin() {
    this.stats.begin();
  };

  /**
   * [statsUpdate description]
   * @return {[type]} [description]
   */
  function statsUpdate() {
    this.stats.update();
  };

  /**
   * [statsEnd description]
   * @return {[type]} [description]
   */
  function statsEnd() {
    this.stats.end();
  };

  /**
   * [guiSetup description]
   * @return {[type]} [description]
   */
  function guiSetup(){
    var GuiText = function() {
      this.message = 'dat.gui';
      this.speed = 0.8;
      this.displayOutline = false;
      this.explode = function() {};
    };

    this.gui_text = new GuiText();
    this.gui = new dat.GUI();
    this.gui.add(this.gui_text, 'message');
    this.gui.add(this.gui_text, 'speed', -5, 5);
    this.gui.add(this.gui_text, 'displayOutline');
    this.gui.add(this.gui_text, 'explode');
    this.gui.close();
  };

  /**
   * [guiAdd description]
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  function guiAdd( key, value ){
    if( typeof value == 'object' ){
      this.gui.add(this.gui_text, key, value.from, value.to);
    }
    else{
      this.gui.add(this.gui_text, key);
    }
  };

  /**
   * [prototype description]
   * @type {Object}
   */
  MAIN.Utils.prototype = {
    constructor: MAIN.Utils,

    // stats
    statsSetup: statsSetup,
    statsBegin: statsBegin,
    statsUpdate: statsUpdate,
    statsEnd: statsEnd,

    // gui
    guiSetup: guiSetup,
    guiAdd: guiAdd
  };

  return MAIN.Utils;
}());
