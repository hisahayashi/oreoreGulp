MAIN.API = (function(){
  'use strict';

  /**
   * [API description]
   * @param {[type]} _main [description]
   */
  MAIN.API = function( _main ) {
    this.api_root = global.global.api_root;
    this.local_json = '/assets/json/';
  };

  /**
   * [get description]
   * @param  {[type]} url            [description]
   * @param  {[type]} params         [description]
   * @param  {[type]} successHandler [description]
   * @param  {[type]} errorHandler   [description]
   * @return {[type]}                [description]
   */
  function get( url, params, successHandler, errorHandler ){
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: params,
      timeout: 10000,
      success: function( json ) {
        successHandler( json );
      },
      error: function( xhr, status, error ) {
        errorHandler( error );
    }});
  };

  /**
   * [post description]
   * @param  {[type]} url            [description]
   * @param  {[type]} params         [description]
   * @param  {[type]} successHandler [description]
   * @param  {[type]} errorHandler   [description]
   * @return {[type]}                [description]
   */
  function post( url, params, successHandler, errorHandler ){
    $.ajax({
      url: url,
      type: 'post',
      // dataType: 'json',
      data: params,
      timeout: 10000,
      success: function( json ) {
        successHandler( json );
      },
      error: function( xhr, status, error ) {
        errorHandler( error );
    }});
  };

  /**
   * [getIndexJson description]
   * @param  {[type]} event_target [description]
   * @return {[type]}              [description]
   */
  function getIndexJson( event_target ){
    var url = this.local_json + 'index.json';
    var params = {};
    var successHandler = function( json ){
      event_target.emit('COMPLETE', json);
    };
    var errorHandler = function( error ){
      alert( error );
    };
    this.get( url, params, successHandler, errorHandler );
  };

  MAIN.API.prototype = Object.create( new EventEmitter2() );
  MAIN.API.prototype.constructor = MAIN.API;

  MAIN.API.prototype.get = get;
  MAIN.API.prototype.post = post;

  MAIN.API.prototype.getIndexJson = getIndexJson;

  return MAIN.API;
}());
