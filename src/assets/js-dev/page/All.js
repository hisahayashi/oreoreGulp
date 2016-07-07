var All = {};

/*------------------------------------------------------------*/
/* header */
All.setupHeadNavigation = function(){

  var $openBtn = $('#head .open_btn > a');
  var $closeBtn = $('#head .head_nav > .close_btn > a');
  var $closeInNav = $('#head .head_nav > .close > a');
  var $headNav = $('#head .head_nav');

  $openBtn.on('click', function(){
    addNav();
    return false;
  });

  $closeBtn.on('click', function(){
    removeNav();
    return false;
  });

  $closeInNav.on('click', function(){
    removeNav();
    return false;
  });

  var addNav = function(){
    $headNav.addClass('on');
    $headNav.height('auto');
    var h = $headNav.height();
    $headNav.height( h );
  }

  var removeNav = function(){
    $headNav.removeClass('on');
    $headNav.height( 0 );
  }

};

/*------------------------------------------------------------*/
/* smp */
All.setupResponsive = function(){
  var isSmp = Utils.isSmartDevice();
  var smpViewport = 'width=device-width,user-scalable=no';
  var pcViewport = 'width=1024';

  if(isSmp){
    $('body').attr('id', 'smp');
  }
  else{
    $('body').attr('id', 'pc');
  }

  if( rps.smp ){
    $('meta[name="viewport"]').attr('content', smpViewport);
  }
  else{
    $('meta[name="viewport"]').attr( 'content', pcViewport);
  }
};

/*------------------------------------------------------------*/
/*  */
All.updateResponsive = function(){
  rps = Utils.updateMediaMatch();
  All.setupResponsive();
};

/*------------------------------------------------------------*/
/*  */
All.setOrientation = function(){
  var orientation = Utils.getDeviceOrientation();
  if( orientation == 'landscape' ){
    $('body').addClass('landscape');
    $('body').removeClass('portrait');
  }
  else{
    $('body').removeClass('landscape');
    $('body').addClass('portrait');
  }
};


