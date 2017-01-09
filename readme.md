## オレオレgulpタスク


#### 確認環境

- Mac OSX: 10.12.1
- 
- gulp: CLI version 3.9.1
- node: v5.11.0
(- ruby: 2.2.0p)
(- gem: 2.4.5)


#### 構成
HTMLテンプレートにEJSを使用し、JSはネイティブ、CSSはSCSSを使用しています。

##### EJS
http://ejs.co/

##### JS
https://ja.wikipedia.org/wiki/JavaScript

##### SCSS
http://sass-lang.com/


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
