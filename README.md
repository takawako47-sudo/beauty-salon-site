# BEAUTY SALON - 美容・エステサロン用Webサイト

Next.js と Google Drive API を用いて構築された美容・エステサロン向けのWebサイトです。
GitHub Pagesへの無料デプロイを前提としており、ギャラリー画像はGoogle Driveから自動取得します。

## ディレクトリ構成

- `src/app/`
  - `page.tsx` ... トップページ
  - `services/page.tsx` ... サービス紹介ページ
  - `pricing/page.tsx` ... 料金ページ
  - `info/page.tsx` ... 店舗情報ページ
  - `contact/page.tsx` ... お問い合わせページ（Googleフォーム埋め込み）
  - `gallery/page.tsx` ... ギャラリーページ（Google Drive API連携）
- `src/components/` ... 共通レイアウトコンポーネント（Header, Footer）
- `.github/workflows/deploy.yml` ... GitHub Pages自動デプロイ用のアクション設定

## Google Drive 連携設定手順

ギャラリーページに画像を表示するには、Google Cloud PlatformにてAPIキーを取得し、Google Driveのフォルダを公開設定にする必要があります。

1. **Google Cloud Consoleでプロジェクトを作成**
   - https://console.cloud.google.com/ にアクセスし、新しいプロジェクトを作成します。
2. **Google Drive API を有効化**
   - 「APIとサービス」>「ライブラリ」から `Google Drive API` を検索し、有効にします。
3. **APIキーの作成**
   - 「APIとサービス」>「認証情報」から、「認証情報を作成」>「APIキー」を選択してキーを取得します。
4. **Google Drive フォルダの公開設定**
   - ギャラリー用の画像を保存するフォルダをGoogle Drive上に作成します。
   - フォルダの共有設定で「リンクを知っている全員」が「閲覧者」となるように変更します。
   - フォルダのURLからID（`https://drive.google.com/drive/folders/この部分`）を取得します。

## ローカル環境セットアップ手順（初心者向け）

1. このリポジトリをパソコンにダウンロード（または`git clone`）します。
2. Node.js（推奨バージョン 20以上）がインストールされていることを確認します。
3. コマンドプロンプトやターミナルを開き、プロジェクトのフォルダに移動します。
4. 以下のコマンドを実行して必要なパッケージをインストールします。
   ```bash
   npm install
   ```
5. プロジェクトのルート（一番上の階層）に `.env.local` という名前のファイルを作成し、以下の内容を記述します。
   ```env
   GOOGLE_API_KEY=取得したAPIキー
   GOOGLE_DRIVE_FOLDER_ID=取得したフォルダID
   ```
6. 以下のコマンドを実行してローカルサーバーを起動します。
   ```bash
   npm run dev
   ```
7. ブラウザで `http://localhost:3000` にアクセスしてサイトが表示されれば成功です。

## GitHub Pagesへのデプロイ手順

このプロジェクトはGitHub Actionsを使用して自動的にデプロイされるように設定されています（`.github/workflows/deploy.yml`）。

1. このプロジェクトをGitHubのリポジトリにプッシュします。
2. GitHubリポジトリの設定（Settings）を開きます。
3. 左サイドバーの `Secrets and variables` > `Actions` を選択します。
4. `New repository secret` ボタンを押し、以下の2つのシークレットを登録します。
   - Name: `GOOGLE_API_KEY` / Secret: 取得したAPIキー
   - Name: `GOOGLE_DRIVE_FOLDER_ID` / Secret: 取得したフォルダID
5. 左サイドバーの `Pages` 設定を開き、`Build and deployment` の Source を **GitHub Actions** に変更します。
6. 設定完了後、自動的にビルドとデプロイが行われます。
   - 毎日定期的に自動ビルドが行われ、Google Driveに追加された画像がギャラリーに反映されます。

## 動作確認（手動ビルド）

ローカル環境で静的HTMLが正しく生成されるか確認するには、以下を実行します。

```bash
npm run build
npx serve@latest out
```

`http://localhost:3000` にアクセスして、動作を確認してください。
