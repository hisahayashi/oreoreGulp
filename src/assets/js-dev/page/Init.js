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
    window.main = new MAIN();
  }
});

function onYouTubeIframeAPIReady(){
  if(window.main.page_class) window.main.page_class.onYouTubeIframeAPIReady();
};
