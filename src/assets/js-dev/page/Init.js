$(function(){

  $(window).on('resize', function(){
    All.updateResponsive();
    All.setOrientation();
    return false;
  });

  // init
  rps = Utils.updateMediaMatch();

  // all
  Utils.addSmoothScroll();
  All.setupHeadNavigation();
  All.setupResponsive();
  All.setOrientation();

  if( $('#wrap').size() ){
    var main = new MAIN();
  }
});
