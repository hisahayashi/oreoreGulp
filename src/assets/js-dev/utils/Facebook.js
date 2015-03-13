window.fbAsyncInit = function() {
  FB.init({
    appId      : 'xxx',
    xfbml      : true,
    version    : 'v2.2'
  });

  var dom = $('#head .share');

  FB.Event.subscribe( 'edge.create', function(response) {
    dom.transition({ right: 370 }, 0, 'easeInOutCirc', function(){});
  });

  FB.Event.subscribe( 'edge.remove', function(response) {
    dom.transition({ right: '' }, 0, 'easeInOutCirc', function(){});
  });

  FB.Event.subscribe( 'comment.create', function(response) {
    dom.transition({ right: '' }, 0, 'easeInOutCirc', function(){});
  });

  FB.Event.subscribe( 'comment.remove', function(response) {
    dom.transition({ right: '' }, 0, 'easeInOutCirc', function(){});
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/ja_JP/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
