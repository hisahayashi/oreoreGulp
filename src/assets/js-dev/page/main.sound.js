MAIN.Sound = (function() {
  'use strict';

  /**
   * [Sound description]
   * @param {[type]} _main [description]
   */
  MAIN.Sound = function( _main ) {
    this.init();
  };

  /**
   * [init description]
   * @return {[type]} [description]
   */
  function init() {

    // this.bpm
    this.bpm = 95;
    this.note_time = 1000 * 60 / this.bpm;
    this.note_half_time = this.note_time * 0.5;
    this.note_count = 0;
    this.note_half_count = 0;
    this.current_time_before = 0;

    // audiodata
    this.context;
    this.analyser;
    this.gain_node;
    this.bufferLoader;
    this.source;
    this.buffers;
    this.pauseTime = 0;
    this.start_time = null;
    this.is_play = false;

    this.is_smp = Utils.isSmartDevice();

    // flags
    this.is_initplay = 0;

    // dom
    this.dom = {
      cont: $('.cont'),
      btn: $('.btn')
    };

    // update
    this.update_count = 0;
    this.update_step = 2;

    // fft
    this.timeDomainData;
    this.td_total = 0;
    this.td_values = [];
    this.frequencyData;
    this.f_total = 0;
    this.f_values = [];
  };

  /**
   * [start description]
   * @return {[type]} [description]
   */
  function start(){
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    if( window.AudioContext ){
      this.startLoading();
    }
    else{
      this.startNotAvarableMode();
    }
  };

  /**
   * [startLoading description]
   * @return {[type]} [description]
   */
  function startLoading(){
    var that = this;

    // setup
    // var url_mp3 = ['assets/sound/sample.mp3', 'assets/sound/sample.mp3'];
    // var url_ogg = ['assets/sound/sample.ogg', 'assets/sound/sample.ogg'];
    var url_mp3 = [];
    var url_ogg = [];
    var url = url_mp3;
    var browser = Utils.getBrowser();
    var random = 0;//Math.round(Math.random());
    // debug('browser: ' + browser);

    if( !url_mp3.length ) return false;

    if( browser == 'chrome' || browser == 'firefox' || browser == 'opera' ){
      url = url_ogg;
    }
    else if( browser == 'safari' ){
      url = url_mp3;
    };

    // check
    var ls = localStorage;
    if( Number(ls.stopped) ){
      this.is_initplay = false;
    }
    else{
      this.is_initplay = true;
    }

    if( this.is_smp ){
      this.is_initplay = false;
    }

    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.connect( this.context.destination );

    this.context.createGain = this.context.createGain || this.context.createGainNode;
    this.gain_node = this.context.createGain();
    this.gain_node.connect( this.analyser );

    this.timeDomainData = new Uint8Array( this.analyser.frequencyBinCount );
    this.frequencyData = new Uint8Array( this.analyser.frequencyBinCount );

    this.bufferLoader = new BufferLoader(
      that.context, [
        url[random]
      ],
      function(e){
        that.finishedLoading(e);
      }
    );

    this.on(this.NoteEvent, function(){
    });

    this.on(this.NoteHalfEvent, function(){
    });

    this.bufferLoader.load();
  };

  function finishedLoading(bufferList) {
    this.buffers = bufferList;
    this.dom.cont.addClass('on');

    if( this.is_initplay ){
      this.dom.cont.addClass('playing');
      this.play(0);
    }
    else{
    }

    this.update();
    this.addEvents();
  };

  function addEvents(){
    this.dom.btn.on('click', btnClickEvent);
  };

  function removeEvents(){
    this.dom.btn.off('click');
  };

  function btnClickEvent(e){
    var $t = $(this);
    var $p = $t.parent();
    if( $t.hasClass('playing') ){
      $t.removeClass('playing');
      stop();
    }
    else{
      $t.addClass('playing');
      this.play(0);
    }
    return false;
  };

  function update(){
    var that = this;
    if( this.update_count % this.update_step == 0 ){
      this.updateFFT();
    }
    this.updateNotes();
    requestAnimationFrame(function(){
      that.update();
    });
    this.update_count++;
  };

  function updateFFT(){
    this.analyser.getByteTimeDomainData( this.timeDomainData ); // 時間
    this.analyser.getByteFrequencyData( this.frequencyData ); // 周波数

    this.td_total = 0;
    this.f_total = 0;
    this.td_values = [];
    this.f_values = [];

    for( var i = 0; i < this.timeDomainData.length; i++ ){
      // 正規化
      this.td_values[i] = parseInt( this.frequencyData[i] ) / 255;
      this.f_values[i] = parseInt( this.timeDomainData[i] ) / 255;
      this.td_total += this.td_values[i];
      this.f_total += this.f_values[i];
    }

    this.f_total = this.f_total / this.frequencyData.length; // 正規化
    this.td_total = this.td_total / this.timeDomainData.length; // 正規化
  };

  function updateNotes(){
    // this.bpm
    var diff_time = ( this.context.currentTime - this.current_time_before ) *  1000;
    this.note_count += diff_time;
    this.note_half_count += diff_time;

    // 1 / 1
    if( this.note_count >= this.note_time ){
      this.note_count = 0;
      this.emit(this.NoteEvent, this.context.currentTime);
    }

    // 1 / 2
    if( this.note_half_count >= this.note_half_time ){
      this.note_half_count = 0;
      this.emit(this.NoteHalfEvent, this.context.currentTime);
    }

    this.current_time_before = this.context.currentTime;
  };

  function play(){
    debug( this.source );

    this.start_time = this.context.currentTime;

    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffers[0];
    this.source.loop = true;
    this.source.connect( this.gain_node );

    this.gain_node.gain.value = 0.3; // volume

    this.source.start(0);
    this.dom.btn.addClass('playing');

    this.is_play = true;

    try{
      localStorage.stopped = 0;
    }
    catch(e){}
  };

  function stop(){
    this.source.stop(0);
    this.dom.btn.removeClass('playing');

    this.is_play = false;

    try{
      localStorage.stopped = 1;
    }
    catch(e){}
  };

  function startNotAvarableMode(){
    var celar = setInterval(function(){
      this.emit(this.NoteHalfEvent, 0);
    }, 1000);

    var celar = setInterval(function(){
      this.emit(this.NoteEvent, 0);
    }, 4000);
  };

  function getCurrentTime(){
    var time = this.context.currentTime - this.start_time;
    if( this.start_time == null ){
      time = 0;
    }
    return time;
  };

  function getNoteTime(){
    return this.note_time;
  };

  function getPlay(){
    return this.is_play;
  };

  function getTimeDomainValues(){
    return this.td_values;
  };

  function getTimeDomainTotal(){
    return this.td_total;
  };

  function getFrequencyValues(){
    return this.f_values;
  };

  function getFrequencyTotal(){
    return this.f_total;
  };

  function getSplitValues( values, split_size ){
    var split_length = Math.floor( values.length / split_size );
    var splits = [];
    for( var i = 0; i < split_length; i++ ){
      var start = split_length * i;
      var end = split_length * ( i + 1 );
      splits[i] = 0;
      for( var j = start; j < end; j++ ){
        if( values[j] ) splits[i] += values[j];
      }
    }
    return splits;
  };


  MAIN.Sound.prototype = Object.create(new EventEmitter2());
  MAIN.Sound.prototype.constructor = MAIN.Sound;

  MAIN.Sound.prototype.init = init;
  MAIN.Sound.prototype.startLoading = startLoading;
  MAIN.Sound.prototype.startNotAvarableMode = startNotAvarableMode;
  MAIN.Sound.prototype.finishedLoading = finishedLoading;
  MAIN.Sound.prototype.update = update;
  MAIN.Sound.prototype.updateFFT = updateFFT;
  MAIN.Sound.prototype.updateNotes = updateNotes;
  MAIN.Sound.prototype.addEvents = addEvents;

  MAIN.Sound.prototype.NoteEvent = 'NOTE_EVENT';
  MAIN.Sound.prototype.NoteHalfEvent = 'NOTE_HALF_EVENT';

  MAIN.Sound.prototype.start = start;
  MAIN.Sound.prototype.play = play;
  MAIN.Sound.prototype.stop = stop;

  MAIN.Sound.prototype.getCurrentTime = getCurrentTime;
  MAIN.Sound.prototype.getNoteTime = getNoteTime;
  MAIN.Sound.prototype.getPlay = getPlay;

  MAIN.Sound.prototype.getTimeDomainValues = getTimeDomainValues;
  MAIN.Sound.prototype.getTimeDomainTotal = getTimeDomainTotal;
  MAIN.Sound.prototype.getFrequencyValues = getFrequencyValues;
  MAIN.Sound.prototype.getFrequencyTotal = getFrequencyTotal;

  MAIN.Sound.prototype.getSplitValues = getSplitValues;



  return MAIN.Sound;
}());
