## オレオレgulpタスク


#### 確認環境

- Mac OSX11 Yosemite
- nodebrew 0.7.5
- node 0.10.33
- npm 1.4.28
- ruby 2.1.5p273
- gem 2.2.2
- Compass 1.0.1

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