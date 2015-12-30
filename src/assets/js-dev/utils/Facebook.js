window.fbAsyncInit = function() {
  FB.init({
    appId      : global.facebook.appid,
    xfbml      : true,
    version    : 'v2.2'
  });

  // FB.Event.subscribe( 'edge.create', function(response) {
  // });

  // FB.Event.subscribe( 'edge.remove', function(response) {
  // });

  // FB.Event.subscribe( 'comment.create', function(response) {
  // });

  // FB.Event.subscribe( 'comment.remove', function(response) {
  // });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/ja_JP/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
