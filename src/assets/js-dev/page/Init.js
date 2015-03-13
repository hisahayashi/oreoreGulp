$(function(){

  $(window).on('resize', function(){
    All.updateResponsive();
    return false;
  });

  // init
  rps = Utils.updateMediaMatch();

  // all
  Utils.addSmoothScroll();
  All.setupHeadNavigation();
  All.setupResponsive();
});
