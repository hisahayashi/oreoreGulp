## オレオレgulpタスク


#### 確認環境

- Mac OSX: 10.10.4
- gem: 2.4.4
- ruby: 2.0.0
- gulp: CLI version 3.9.0
- node: v0.12.4

- browser-sync : ^2.7.13
- compass : ^0.1.1
- gulp : ^3.9.0
- gulp-bower-files : ^0.2.7
- gulp-clean : ^0.3.1
- gulp-copy : 0.0.2
- gulp-debug : ^2.0.1
- gulp-ejs : ^1.1.0
- gulp-flatten : 0.1.0
- gulp-ignore : ^1.2.1
- gulp-imagemin : ^2.3.0
- gulp-load-plugins : ^1.0.0-rc
- gulp-pleeease : ^1.2.0
- gulp-plumber : ^1.0.1
- gulp-rename : ^1.2.2
- gulp-sass : ^2.0.3
- gulp-sourcemaps : ^1.5.2
- gulp-uglify : ^1.2.0
- gulp-usemin : ^0.3.11
- gulp-util : ^3.0.6
- gulp.spritesmith : ^3.8.2
- run-sequence : ^1.1.1"


#### 構成
HTMLテンプレートにEJSを使用し、JSは生、CSSはSCSSを使用。
JSのminifiyにはuseminを使用している、ちょっと変則的な構成です。
普通のサイトを作るように最適化されている気がします。


---

### まずはじめに

まずは対象のディレクトリに移動してください。

	$ cd [path]
	
続いてnpmで必要なものをインストール。
するとpackage.jsonに書いてある内容がインストールされます。
※ インストールが失敗する可能性があるので、今後の作業でエラーが出る場合はnpmのキャッシュを消した後、再度インストールを試して下さい

	$ npm i 
	
bowerで必要なJSライブラリをインストール。

	$ bower i
	
続いてJSライブラリを bower を使って持ってきます。

	$ gulp bower
	
すると、pc/src/js-libs にライブラリが移動されます。
いくつかのファイルは手動で持ってくる必要があります。

- eventemitter2.js 等

ここまできたらデフォルトタスクでWatchが走るので、作業を開始できます。

	$ gulp --local

その他、環境に合わせてコマンドを変えてパプリッシュします。

	$ gulp --stage
	$ gulp --prod