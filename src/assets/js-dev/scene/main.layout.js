MAIN.Layout = (function() {
  'use strict';

  /**
   * [Layout description]
   * @param {[type]} _main [description]
   */
  MAIN.Layout = function(_main) {
    this.init();
  };

  /**
   * [init description]
   * @return {[type]} [description]
   */
  function init() {
    var that = this;
    this.setupResponsive();
  };

  /**
   * [setupResponsive description]
   * @return {[type]} [description]
   */
  function setupResponsive() {
    var that = this;

    $(window).on('resize', function() {
      that.rps = Utils.updateMediaMatch();
      that.setupViewport();
      that.setupOrientation();
      return false;
    });

    // init
    this.rps = Utils.updateMediaMatch();

    // all
    Utils.addSmoothScroll();
    this.setupViewport();
    this.setupOrientation();
  };

  /**
   * [setupViewport description]
   * @return {[type]} [description]
   */
  function setupViewport() {
    var isSmp = Utils.isSmartDevice();
    var smpViewport = 'width=device-width,user-scalable=no';
    var pcViewport = 'width=1024';

    if (isSmp) {
      $('body').attr('id', 'smp');
    } else {
      $('body').attr('id', 'pc');
    }

    if (this.rps.smp) {
      $('meta[name="viewport"]').attr('content', smpViewport);
    } else {
      $('meta[name="viewport"]').attr('content', pcViewport);
    }
  };

  /**
   * [setupOrientation description]
   * @return {[type]} [description]
   */
  function setupOrientation() {
    var orientation = Utils.getDeviceOrientation();
    if (orientation == 'landscape') {
      $('body').addClass('landscape');
      $('body').removeClass('portrait');
    } else {
      $('body').removeClass('landscape');
      $('body').addClass('portrait');
    }
  };


  MAIN.Layout.prototype = Object.create(new EventEmitter2());
  MAIN.Layout.prototype.constructor = MAIN.Layout;

  MAIN.Layout.prototype.init = init;
  MAIN.Layout.prototype.setupResponsive = setupResponsive;
  MAIN.Layout.prototype.setupViewport = setupViewport;
  MAIN.Layout.prototype.setupOrientation = setupOrientation;

  return MAIN.Layout;
}());
