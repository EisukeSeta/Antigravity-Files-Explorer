# Antigravity Universal File Explorer 🚀

GitHub Repository: [https://github.com/EisukeSeta/Antigravity-Files-Explorer](https://github.com/EisukeSeta/Antigravity-Files-Explorer)

![Deploy to S3](https://github.com/EisukeSeta/Antigravity-Files-Explorer/actions/workflows/deploy.yml/badge.svg)

## 🌐 ライブデモ

**[https://www.seta.mydns.jp/Antigravity-Files-Explorer/](https://www.seta.mydns.jp/Antigravity-Files-Explorer/)**

## 🌟 コンセプト: ユニバーサル・プロジェクト・マネージャー

あらゆるプロジェクトのファイル構成を一箇所で統合管理・閲覧できる「ユニバーサル・ファイルエクスプローラー」です。ローカル、ウェブ、GitHub、S3など、異なる環境のファイルをプロジェクト単位でシームレスに切り替えながら閲覧できます。

### ✨ 主な機能

#### 1. **マルチプロジェクト管理**
- 左サイドバーから複数のプロジェクトを瞬時に切り替え可能
- プロジェクトはブラウザのlocalStorageにキャッシュされ、次回アクセス時も即座に利用可能
- プリセットで「Explorer Source」と「Full Repository」が用意されており、すぐに使い始められます

#### 2. **柔軟なプロジェクト追加方法**
- **📁 Import JSON**: ローカルで生成したJSON構成ファイルをドラッグ＆ドロップで読み込み（サーバー不要）
- **➕ Add Project**: プロジェクト名、JSON URL、Base URIを入力して手動で追加
- **URL指定**: GitHub RawやS3など、外部に公開されているJSON構成ファイルから読み込み可能

#### 3. **プロジェクト編集・管理機能**
- **⚙️ 編集**: プロジェクト名にホバーして設定を変更（名前、JSON URL、Base URI）
- **🔄 更新**: データを最新版に再取得
- **✕ 削除**: 不要なプロジェクトを削除（プリセットを除く）

#### 4. **Base URI によるプレビュー先の制御**
- プロジェクトごとに「Base URI」を設定し、ファイルのプレビュー元を自由に切り替え
- 例: GitHub Raw URL、S3バケット、ローカルサーバーなど
- デフォルトはGitHub Raw URLで、リポジトリのファイルを直接プレビュー可能

#### 5. **豊富なプレビュー対応形式**
- **画像**: `.jpg`, `.png`, `.gif`, `.webp`, `.svg`
- **Markdown**: `.md`（リッチHTMLとしてレンダリング）
- **コード**: `.js`, `.json`, `.css`, `.py`, `.html`, `.txt`, `.xml`
- **シェルスクリプト**: `.ps1`, `.sh`
- **設定ファイル**: `.yml`, `.yaml`
- その他: `LICENSE`ファイル

#### 6. **プレミアムUI/UX**
- モダンなグラスモフィズムデザイン
- 折りたたみ可能なフォルダツリー
- リアルタイム検索（ファイル名フィルタリング）
- レスポンシブレイアウト

## 📂 構成ファイル

- **`index.html`**: プロジェクト管理機能を搭載したメインUI
- **`update_files.js`**: ディレクトリをスキャンして`file_data.json`を生成するNode.jsツール
- **`server.js`**: ローカルファイルを閲覧するためのCORS対応軽量Webサーバー
- **`config.json`**: スキャン対象から除外するフォルダの設定
- **`file_data.json`**: viewerフォルダ内のファイル構成データ（Explorer Source用）
- **`3d-viewer.json`**: 3Dビューワーリポジトリのファイル構成データ
- **`repo_data.json`**: リポジトリ全体のファイル構成データ（Full Repository用）

## 🚀 使い方

### 1. アプリにアクセス
[ライブデモ](https://www.seta.mydns.jp/Antigravity-Files-Explorer/)を開くと、すぐに「Explorer Source」と「Full Repository」が利用できます。

### 2. ローカルファイルを閲覧する（重要）

ブラウザのセキュリティ制限（Mixed Content）により、HTTPS環境のアプリからHTTPのローカルサーバーへのアクセスはブロックされます。ローカルファイルを閲覧する場合は、**アプリ自体もローカルサーバー経由で開く**必要があります。

1.  **ローカルサーバーを起動する**:
    ```powershell
    cd C:\Win_tools\Antigravity
    node viewer/server.js
    ```
2.  **ブラウザでローカル版アプリを開く**:
    `http://localhost:8000/viewer/index.html`
3.  **プロジェクト設定を調整する**:
    「Full Repository」の設定（⚙️）を開き、**Base URI** を `http://localhost:8000/` に設定します。

### 3. プロジェクト構成ファイルを生成する

自分のフォルダ構成をJSONファイル化するには、以下のコマンドを実行します。

**基本コマンド:**
```powershell
node viewer/update_files.js [対象ディレクトリ] [出力ファイル名]
```

**使用例:**
```powershell
# 特定のフォルダをスキャン
node viewer/update_files.js C:\MyProject my_project.json
```

### 4. プロジェクト設定の管理

サイドバーのプロジェクト名にマウスを合わせると、以下のアイコンが表示されます：
- **⚙️**: 設定を編集（名前、JSON URL、Base URI）
- **🔄**: データを再取得
- **✕**: プロジェクトを削除

## 🛠️ 技術スタック

- **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Glassmorphism)
- **Markdown**: [Marked.js](https://marked.js.org/)
- **Storage**: Browser LocalStorage（プロジェクト設定のキャッシュ）
- **Deployment**: AWS S3 + CloudFront + GitHub Actions

## 🎯 ユースケース

- ✅ 複数のGitHubリポジトリを一箇所で閲覧
- ✅ ローカルプロジェクトのファイル構成を可視化・共有（未コミットの変更も確認可能）
- ✅ S3バケット内のファイルをブラウザから直接閲覧
- ✅ 技術ドキュメントやコードベースのナビゲーション

## 📝 ライセンス

このプロジェクトはオープンソースです。自由にご利用ください。

---

&copy; 2026 Antigravity System | Universal Project Manager
