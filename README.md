# 簡易掲示板

### 使用技術
* インフラ・バックエンド＝firebase
* フロントエンド= angular(version9)

### 対象のURL
* アプリのURL
https://sy-bulletin-board.firebaseapp.com
* GitHub URL
https://github.com/satouyuuki/angular-bulletin-board

## ルーティング設計

|URL|画面|
|:---|:---|
|/|トップページ |
|/create|スレッド登録 |
|/detail/{id}|スレッド詳細 |
|/edit/{id}|スレッド編集 |
|/account/login|ログイン画面|
|/account/signup|アカウント登録画面|
|/account/signup|アカウント登録画面|
|TOTAL|合計6ページ|

## 実装した機能
* CRUD
* 認証
* Guard

### 工夫した点
コンポーネントとサービスを分け、コンポーネントにデータを持たせないようにした。

Angularのguardを実装し、セッションによってページの出し分けをした。

自分のコメントのみ編集、削除可能。

### 反省点
単体テスト、e2eテストを時間があればやりたかったが手が回らなかった。

validationをつけること

型をもう少し厳格にしたい。
