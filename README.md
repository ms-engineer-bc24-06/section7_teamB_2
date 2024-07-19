# Task Manager for pre-engineer
**TEAM B: sayoko, ami, meme**

## 概要
駆け出しエンジニア向けのタスク管理アプリケーションを最終目標として開発中です。
#### 実装済みの機能
- タスクの登録、管理(ステータス変更)、更新、削除
  - 登録したタスクのステータスに応じて表示場所が変わるような設計を取り入れています: Not Started, In progress, done
- ユーザー登録、ログイン、ログアウト
#### 実装予定の機能
- プロジェクトごとにタスクを管理できる機能
- プロジェクトのメンバーでタスクの管理を共有できる機能
- スケジュールにタスクを埋め込める機能（日、週、月単位など)

## 技術スタック
#### フロントエンド
> TypeScript, Next.js(AppRouter)
#### バックエンド
> Python, Django
#### データベース
> PostgreSQL
#### テストフレームワーク
> playwright
#### 使用したプラットフォーム、サービス
> Docker, GitHub

## 各種ドキュメント
Documentsディレクトリに格納。
- API設計書
- DB設計書
- ER図

## なぜこのアプリケーションを開発したか？
必要な機能を実装したシンプルなタスク管理アプリが欲しいと思ったから。

## こだわったポイント
・基本的な要件を満たし、かつ、チーム開発における流れを体験すること
・今まで行ってきたことを他言語で再現すること
・こまめな情報共有や知見の共有をすること

## 課題の要件の達成/未達成
|評価|要件|備考|
|---|----|---|
| o |フロントエンドとバックエンドの分離|  |
| o |モノレポ構成|  |
| o |コンテナ環境での動作|  |
| o |サーバーサイドはJS/TS以外| python |
| o | フロントエンドはTS|  |
| △ |認証、認可によるユーザーの利用可能機能の分離|  |
| o | RDB/NoSQLでのCRUD|  |
| o |設計書等のドキュメント作成|  |
| x |セキュリティ: XSS, SQL injection|  |
| x |単体テスト|  |
| o |E2Eテスト、テストシナリオの作成|  |
| △ |ログ| バックエンドの一部とフロントエンド|
