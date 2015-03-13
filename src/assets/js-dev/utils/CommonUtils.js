/*------------------------------------------------------------*/
/*  */
Utils.addSmoothScroll = function(){
  $('a[href^="#"]').on('click.scroll',function() {
    var href = this.hash;
    var $target = $(href == '#_top' ? 'body' : href );
    if ($target.size()) {

      $.smoothScroll({
        scrollElement: $('html,body'),
        scrollTarget: $target,
        direction: 'top',
        offset: 0,
        speed: 600,
        easing: 'easeInOutExpo',
        preventDefault: true,
        beforeScroll: function(){},
        afterScroll: function(){}
      });
    }
    return false;
  });
}

Utils.removeSmoothScroll = function(){
  $('a[href^="#"]').off('click.scroll' );
}

/*------------------------------------------------------------*/
/*  */
Utils.updateMediaMatch = function(){
  var obj = {};
  obj.smp = false;
  obj.tablet = false;
  obj.pc = false;
  var browser = Utils.getBrowser();
  if( browser != 'ie6' && browser != 'ie7' && browser != 'ie8' && browser != 'ie9' ){
    obj.smp = window.matchMedia( '(max-width: 667px)' ).matches;
    obj.tablet = window.matchMedia( '(min-width: 668px) and (max-width: 1024px)' ).matches;
    obj.pc = window.matchMedia( '(min-width: 1025px)' ).matches;
  }
  return obj;
}
