/* ------------------------------------------------ */
/* 変数 */
/* ------------------------------------------------ */
var local_obj = {
  root: "/",
  api_root: "/",
};
var stage_obj = {
  root: "http://example.com/test/",
  api_root: "http://example.com/test/",
};
var prod_obj = {
  root: "http://example.com/",
  api_root: "http://example.com/",
};
var bsPort = 3000;


/* ------------------------------------------------ */
/* 初期設定 */
/* ------------------------------------------------ */
var gulp = require('gulp');
$ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

/* ------------------------------------------------ */
/* プラグイン */
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var bowerFiles = require('main-bower-files');

var fs = require('fs');
var pkg = require('./package.json');

/* ------------------------------------------------ */
/* 環境の判定 */
var env_flg = 'local';
if ($.util.env.local) env_flg = 'local';
else if ($.util.env.stage) env_flg = 'stage';
else if ($.util.env.prod) env_flg = 'prod';

var env_obj = {};

switch (env_flg) {
  case 'local':
    env_obj = local_obj;
    break;
  case 'stage':
    env_obj = stage_obj;
    break;
  case 'prod':
    env_obj = prod_obj;
    break;
}

console.log('env_flg: ' + env_flg);
console.log(env_obj.root);

var paths = {
  assets: ['./src/assets/'],
  dist: ['./dist/']
};

/* ------------------------------------------------ */
/* EJS のJSON読み込み */
var ejsdataPath = './src/data/ejs.json';
var ejsJson = JSON.parse(fs.readFileSync(ejsdataPath));

/* 置き換え */
ejsJson.global.root = env_obj.root;

/* ------------------------------------------------ */
/* bower のパス */
var bowerPath = './bower_components';

/* ------------------------------------------------ */
/* パス */
var selector = {
  ejs_data: [ejsdataPath],
  html: ['./src/html/**/*.html', './src/html/**/*.html'],
  html_usemin: ['./src/html/*.html'],
  html_copy: ['./src/html/**/', '!./src/html/*.html'],
  ejs: ['./src/ejs/*.ejs', './src/ejs/**/*.ejs'],
  ejs_w: ['./src/ejs/**/*.ejs', '!./src/ejs/common/*.ejs'],
  img: ['./src/assets/img/**/*'],
  sprite: ['./src/assets/img/sprite/*.png'],
  spriteParts: ['./src/assets/img/sprite_parts/*.png'],
  font: ['./src/assets/fonts/**/*'],
  video: ['./src/assets/video/*'],
  sound: ['./src/assets/sound/*'],
  js: ['./src/assets/js/**/*'],
  js_dev: ['./src/assets/js-dev/**/*'],
  js_libs: ['./src/assets/js-libs/**/*'],
  js_global: ['./src/assets/js-dev/global.js'],
  json: ['./src/assets/json/**/*'],
  php: ['./src/php/**/*'],
  php_env: ['./src/php/app/env.php'],
  css: ['./src/assets/css/**/*'],
  sass: ['./src/assets/sass/**/*']
};

/* ------------------------------------------------ */
/* 自動タスク */
/* ------------------------------------------------ */

gulp.task('ejs', function(callback) {
  return gulp.src(selector.ejs_w)
    .pipe($.ejs(ejsJson))
    .pipe($.rename({
      // suffix: '.min',
      extname: ".html"
    }))
    .pipe(gulp.dest('./src/html'))
    .on('end', function() {});
});

gulp.task('usemin', function(callback) {
  return gulp.src(selector.html_usemin)
    .pipe($.usemin())
    .pipe(gulp.dest('./dist'))
    .on('end', function() {});
});

gulp.task('uglify', function() {
  if (env_flg == 'prod') {
    return gulp.src('./dist/assets/js/*.js')
      .pipe($.uglify())
      .pipe(gulp.dest('./dist/assets/js'))
      .on('end', function() {
        console.log('done');
      });
  }
});

gulp.task('sass', function() {
  return gulp.src(selector.sass)
    .pipe($.plumber())
    // .pipe( $.sourcemaps.init() )
    .pipe($.sass({
      style: 'expanded',
      compass: true
    }))
    // .pipe( $.sourcemaps.write() )
    // .pipe(paths.assets + 'css');
    .pipe(gulp.dest(paths.dist + 'assets/css/'));
  // .pipe( $.browserSync.reload({
  //   stream: true
  // }));
});

gulp.task('pleeease', function() {
  return gulp.src([
      paths.dist + 'assets/css/styles.css'
    ])
    .pipe($.plumber())
    .pipe($.pleeease({
      autoprefixer: {
        browsers: ["> 1%", "last 4 versions", "Firefox ESR", "Opera 12.1", "Android 2.3"],
        cascade: true
      },
      minifier: true
    }))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + 'assets/css/'));
});

gulp.task('sprite', function(callback) {
  // Generate our spritesheet
  var spriteData = gulp.src(selector.spriteParts)
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss'
    }));

  // Pipe image stream through image optimizer and onto disk
  return spriteData.img
    .pipe($.imagemin())
    .pipe(gulp.dest('./src/assets/img/sprite/'))
    .on('end', function() {

      // Pipe CSS stream through CSS optimizer and onto disk
      spriteData.css
        // .pipe($.csso())
        // .pipe($.rename({
        //   // suffix: '.min',
        //   extname: ".scss"
        // }))
        .pipe(gulp.dest('./src/assets/sass/component/'));
    });

});

gulp.task('edit_global_js', function(callback) {
  return gulp.src(selector.js_global)
    .pipe($.edit(function(src, cb) {
      // this === file
      var err = null;
      var obj = ejsJson;
      // obj.debug = true;
      // if ($.util.env.stage || $.util.env.prod) obj.debug = false;
      src += 'var global = ' + JSON.stringify(obj);
      cb(err, src);
    }))
    .pipe($.rename({
      suffix: '.edit',
    }))
    .pipe(gulp.dest('./src/assets/js-dev/'))
    .on('end', function() {});
});

gulp.task('edit_global_php', function(callback) {
  return gulp.src(selector.php_env)
    .pipe($.edit(function(src, cb) {
      // this === file
      var err = null;
      var obj = ejsJson;
      obj.debug = true;
      if ($.util.env.stage || $.util.env.prod) obj.debug = false;
      var src = "<?php" + '\n';
      src += "define('API_KEY', '" + env_obj.root + "');" + '\n';
      cb(err, src);
    }))
    .pipe($.rename({
      suffix: '.edit',
    }))
    .pipe(gulp.dest('./src/php/app/'))
    .on('end', function() {});
});

gulp.task('clean', function() {
  return gulp.src(paths.dist)
    .pipe($.clean({
      force: true
    }))
    .on('end', function() {});
});

gulp.task('clean_css', function() {
  return gulp.src([
      paths.dist + 'assets/css/styles.css',
      paths.dist + 'assets/css/component',
      paths.dist + 'assets/css/scene',
    ])
    .pipe($.clean({
      force: true
    }))
    .on('end', function() {});
});

gulp.task('clean_html', function() {
  return gulp.src('./src/html')
    .pipe($.clean({
      force: true
    }))
    .on('end', function() {});
});

gulp.task('copy_html', function(callback) {
  runSequence('copy_second', callback);
});

gulp.task('copy_second', function(callback) {
  return gulp.src(selector.html_copy)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + '/'))
    // .pipe($.debug())
    .on('end', function() {});
});

/*
gulp.task('task', folder(pathToFolder, function(folder){
    //This will loop over all folders inside pathToFolder main, secondary
    //Return stream so gulp-folders can concatenate all of them
    //so you still can use safely use gulp multitasking

    return gulp.src(path.join(pathToFolder, folder, '*.js'))
        .pipe(concat(folder + '.js'))
        .pipe(gulp.dest('dist'));
}));
*/

gulp.task('copy_img', function() {
  return gulp.src(selector.img)
    .pipe($.imagemin())
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + 'assets/img/'));
});

gulp.task('copy_font', function() {
  return gulp.src(selector.font)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + 'assets/fonts/'));
});

gulp.task('copy_json', function() {
  return gulp.src(selector.json)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + 'assets/json/'));
});

gulp.task('copy_video', function() {
  return gulp.src(selector.video)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + 'assets/video/'));
});

gulp.task('copy_sound', function() {
  return gulp.src(selector.sound)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + 'assets/sound/'));
});

gulp.task('copy_php', function() {
  return gulp.src(selector.php)
    .pipe($.plumber())
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('bs_connect', function() {
  $.connectPhp.server({
    port: bsPort,
    base: './dist',
    bin: '/Applications/MAMP/bin/php/php5.6.2/bin/php',
    ini: '/Applications/MAMP/bin/php/php5.6.2/conf/php.ini'
  }, function() {
    browserSync.init(null, {
      server: {
        baseDir: paths.dist
      },
      port: bsPort,
      open: false,
      notify: true,
      xip: false
    });
  });
});

gulp.task('bs', function() {
  return browserSync.init(null, {
    server: {
      baseDir: paths.dist
    },
    port: bsPort,
    open: false,
    notify: true,
    xip: false
  });
});

// Reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Bower
gulp.task('bower', function(callback) {
  return gulp.src(bowerFiles())
    .pipe($.flatten())
    .pipe(gulp.dest(paths.assets + 'js-libs'))
    .on('end', function() {});
});

// sftp
gulp.task('sftp', function(callback) {
  return gulp.src('./dist/**/*')
    .pipe($.sftp({
      host: '[host]',
      port: 22,
      user: '[user]',
      pass: '[password]',
      remotePath: '[remotePath]',
    }))
    .on('end', function() {});
});


/* ------------------------------------------------ */
/* watch */
/* ------------------------------------------------ */
gulp.task('watch', function() {
  gulp.watch(selector.ejs, ['watchJS']);
  gulp.watch(selector.ejs_w, ['watchJS']);
  gulp.watch(selector.js_dev, ['watchJS']);
  gulp.watch(selector.js_lib, ['watchJS']);
  gulp.watch(selector.json, ['watchJS']);
  gulp.watch(selector.ejs_data, ['watchJS']);
  gulp.watch(selector.php, ['watchPHP']);

  var watch = gulp.watch(selector.sass, ['watchCSS']);
  watch.on('change', function(e) {
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
  });

  // gulp.watch( selector.spriteParts, [ 'watchSprite' ] );
});

gulp.task('watchJS', function(callback) {
  runSequence(
    'edit_global_js', 'ejs', 'usemin', 'uglify', 'copy_html', 'clean_html', 'copy_json', callback
  );
});

gulp.task('watchPHP', function(callback) {
  runSequence(
    'edit_global_php', 'copy_php', callback
  );
});

gulp.task('watchCSS', function(callback) {
  runSequence(
    'sass', 'pleeease', 'clean_css', callback
  );
});

gulp.task('watchSprite', function(callback) {
  runSequence(
    'sprite', callback
  );
});

/* ------------------------------------------------ */
/* default */
/* ------------------------------------------------ */
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    'edit_global_js', 'edit_global_php', 'ejs', 'usemin', 'uglify', 'copy_html', 'clean_html', 'copy_json', 'copy_php',
    'sass', 'pleeease', 'clean_css',
    'copy_img', 'copy_video', 'copy_font', 'copy_sound',
    'bs_connect', 'watch', callback
  );
});
