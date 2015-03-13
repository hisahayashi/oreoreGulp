/*------------------------------------------------------------*/
/* console.log のかわり */
var debug = function( $obj ) {
  if( window.console && window.console.log ) {
    if( Global.debug ) window.console.log( $obj );
  }
};

var Utils = [];

/*------------------------------------------------------------*/
/*  */
Utils.zeroPad = function( number, length ) {
  return( Array( length ).join( '0' ) + number ).slice( -length );
};

Utils.numComma = function( num ) {
  return String( num ).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
}

/*------------------------------------------------------------*/
/*  */
Utils.separate = function( num ) {
  return String( num ).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
};

Utils.browserLanguage = function() {
  var ua = window.navigator.userAgent.toLowerCase();
  try {
    // chrome
    if( ua.indexOf( 'chrome' ) != -1 ){
      return ( navigator.languages[0] || navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
    }
    // それ以外
    else{
      return ( navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
    }
  }
  catch( e ) {
    return undefined;
  }
}

/*------------------------------------------------------------*/
/* スマートフォンの判定 */
Utils.isSmartDevice = function() {
  var ua = navigator.userAgent;
  var flag = false;

  if( ( ua.indexOf( 'iPhone' ) > 0 && ua.indexOf( 'iPad' ) == -1 ) || ua.indexOf( 'iPod' ) > 0 || ua.indexOf( 'Android' ) > 0 && ua.indexOf( 'Mobile' ) > 0 ) {
    flag = 'smartphone';
  } else if( ua.indexOf( 'iPad' ) > 0 || ua.indexOf( 'Android' ) > 0 ) {
    flag = 'tablet';
  }
  return flag;
};

/*------------------------------------------------------------*/
/*
 *  OSを取得
 *  @return (win, mac, linux)
 */
Utils.getOS = function() {
  var os;
  var ua = window.navigator.userAgent.toLowerCase();
  if( ua.match( /win/ ) ) {
    os = "win";
  } else if( ua.match( /mac|ppc/ ) ) {
    os = "mac";
  } else if( ua.match( /linux/ ) ) {
    os = "linux";
  } else {
    os = "other";
  }
  return os;
}

/*------------------------------------------------------------*/
/*
 *  ブラウザ名を取得
 *  @return (ie6、ie7、ie8、ie9、ie10、ie11、chrome、safari、opera、firefox、unknown)
 */
Utils.getBrowser = function() {
  var ua = window.navigator.userAgent.toLowerCase();
  var ver = window.navigator.appVersion.toLowerCase();
  var name = 'unknown';

  if( ua.indexOf( "msie" ) != -1 ) {
    if( ver.indexOf( "msie 6." ) != -1 ) {
      name = 'ie6';
    } else if( ver.indexOf( "msie 7." ) != -1 ) {
      name = 'ie7';
    } else if( ver.indexOf( "msie 8." ) != -1 ) {
      name = 'ie8';
    } else if( ver.indexOf( "msie 9." ) != -1 ) {
      name = 'ie9';
    } else if( ver.indexOf( "msie 10." ) != -1 ) {
      name = 'ie10';
    } else {
      name = 'ie';
    }
  } else if( ua.indexOf( 'trident/7' ) != -1 ) {
    name = 'ie11';
  } else if( ua.indexOf( 'chrome' ) != -1 ) {
    name = 'chrome';
  } else if( ua.indexOf( 'safari' ) != -1 ) {
    name = 'safari';
  } else if( ua.indexOf( 'opera' ) != -1 ) {
    name = 'opera';
  } else if( ua.indexOf( 'firefox' ) != -1 ) {
    name = 'firefox';
  }
  return name;
};

/*------------------------------------------------------------*/
/*
 *  対応ブラウザかどうか判定
 *  @param browsers 対応ブラウザ名を配列で渡す(ie6、ie7、ie8、ie9、ie10、ie11、chrome、safari、opera、firefox)
 *  @return サポートしてるかどうかをtrue/falseで返す
 */
Utils.isSupported = function( browsers ) {
  var thusBrowser = getBrowser();
  for( var i = 0; i < browsers.length; i++ ) {
    if( browsers[ i ] == thusBrowser ) {
      return true;
      exit;
    }
  }
  return false;
};


/*------------------------------------------------------------*/
/*  */
Utils.normalize = function( point, scale ) {
  var norm = Math.sqrt( point.x * point.x + point.y * point.y );
  if( norm != 0 ) { // as3 return 0,0 for a point of zero length
    point.x = scale * point.x / norm;
    point.y = scale * point.y / norm;
  }
};

/*------------------------------------------------------------*/
/*  */
Utils.normalize3 = function( p, scale ) {
  var norm = Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z );
  if( norm != 0 ) { // as3 return 0,0 for a point of zero length
    p.x = scale * p.x / norm;
    p.y = scale * p.y / norm;
    p.z = scale * p.z / norm;
  }
  return p;
};

/*------------------------------------------------------------*/
/*  */
Utils.pointLength3 = function( p ) {
  return Math.sqrt( p.x * p.x + p.y * p.y + p.z * p.z );
};

/*------------------------------------------------------------*/
/*  */
Utils.getParams = function( params ) {
  var obj = params;
  var params = location.href.split( '?' )[ 1 ];

  var hash = function( key, value ) {
    var h = {};
    h[ key ] = value;
    return h;
  }

  if( params ) {
    params = params.split( '&' );
    for( var i = 0; i < params.length; i++ ) {
      var p = params[ i ].split( '=' );
      $.extend( obj, hash( p[ 0 ], p[ 1 ] ) );
      //debug( obj[i] );
    }
  }
  return obj;
};

/*------------------------------------------------------------*/
/*  */
Utils.getQuery = function() {
  var query = window.location.search.substring( 1 );
  var parms = query.split( '&' );
  var p = {};

  for( var i = 0; i < parms.length; i++ ) {
    var pos = parms[ i ].indexOf( '=' );
    if( pos > 0 ) {
      var key = parms[ i ].substring( 0, pos );
      var val = parms[ i ].substring( pos + 1 );
      p[ key ] = val;
    }
  }
  return p;
}

/*------------------------------------------------------------*/
/* set requestAnimationFrame to window (with vendor prefixes) */
;
( function( w, r ) {
  w[ 'r' + r ] = w[ 'r' + r ] || w[ 'webkitR' + r ] || w[ 'mozR' + r ] || w[ 'msR' + r ] || w[ 'oR' + r ] || function( c ) {
    w.setTimeout( c, 1000 / 60 );
  };
} )( window, 'equestAnimationFrame' );
