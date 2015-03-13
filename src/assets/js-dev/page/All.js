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

  debug( rps.smp );

  var isSmp = Utils.isSmartDevice();
  // var smpViewport = 'width=375, user-scalable=no, target-densitydpi=medium-dpi';
  var smpViewport = 'width=375, user-scalable=no, target-densitydpi=device-dpi';
  var pcViewport = 'width=1024';

  if( rps.smp ){
    $('body').attr('id', 'smp');
    // viewport change
    $("meta[name='viewport']").attr( 'content', smpViewport);
  }
  else{
    $('body').attr('id', 'pc');
    // viewport change
    $('#viewport').attr( 'content', pcViewport);
  }

  // if( Utils.isSmartDevice() == 'smartphone' ){
  //   $('body').attr('id', 'smp');
  //   // viewport change
  //   $("meta[name='viewport']").attr( 'content', smpViewport);
  // }
};

All.updateResponsive = function(){
  rps = Utils.updateMediaMatch();
  All.setupResponsive();
};


