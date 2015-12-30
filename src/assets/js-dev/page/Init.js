$(function(){

  $(window).on('resize', function(){
    All.updateResponsive();
    var orientation = Utils.getDeviceOrientation();
    if( orientation == 'landscape' ){
      $('body').addClass('landscape');
      $('body').removeClass('portrait');
    }
    else{
      $('body').removeClass('landscape');
      $('body').addClass('portrait');
    }
    return false;
  });

  // init
  rps = Utils.updateMediaMatch();

  // all
  Utils.addSmoothScroll();
  All.setupHeadNavigation();
  All.setupResponsive();

  if( $('#wrap').size() ){
    var main = new MAIN();
  }
});
