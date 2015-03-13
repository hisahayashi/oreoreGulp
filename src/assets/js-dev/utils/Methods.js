/*------------------------------------------------------------*/
/*  */
;
(function($) {

  $.fn.autoOver = function(duration) {
    var options = {};
    var d = {
      str: '_on',
      duration: 0
    };
    var o = $.extend(d, options);
    var image_cache = new Object();
    var $that = $(this);

    $that.each(function(i) {
      var $t = $(this);
      var t = this;
      var imgsrc = t.src;
      var dot = t.src.lastIndexOf('.');
      var imgsrc_on = t.src.substr(0, dot) + o.str + t.src.substr(dot, 4);
      image_cache[t.src] = new Image();
      image_cache[t.src].src = imgsrc_on;

      $t.hover(
        function() {
          debug(t.src);
          t.src = imgsrc_on;
        },
        function() {
          t.src = imgsrc;
        });

    });

    return $that;
  };

  $.fn.alphaAuto = function(opacity, duration, callback) {
    var options = {};
    var d = {
      opacity: 0,
      duration: 0,
      callback: null
    };
    var o = $.extend(d, options);
    o.opacity = (opacity != undefined) ? opacity : o.opacity;
    o.duration = (duration != undefined) ? duration : o.duration;
    o.callback = ($.isFunction(callback)) ? callback : o.callback;

    var $that = $(this);

    $that.each(function(i) {
      var $t = $(this);
      if (o.opacity <= 0) {
        $t.animate({
          opacity: 0
          , filter: 'alpha( opacity=0 );'
        }, o.duration, 'linear', function() {
          $t.css({
            display: 'none'
          });
          if ($.isFunction(o.callback)) o.callback();
        });
      } else {
        $t.css({
          display: 'block'
        });
        $t.animate({
          opacity: o.opacity
          , filter: 'alpha( opacity=' + o.opacity + ' );'
        }, o.duration, 'linear', function() {
          if ($.isFunction(o.callback)) o.callback();
        });
      }
    });

    return $that;
  };

})(jQuery);
