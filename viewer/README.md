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
- **`config.json`**: スキャン対象から除外するフォルダの設定
- **`file_data.json`**: viewerフォルダ内のファイル構成データ（Explorer Source用）
- **`repo_data.json`**: リポジトリ全体のファイル構成データ（Full Repository用）

## 🚀 使い方

### 1. アプリにアクセス
[ライブデモ](https://www.seta.mydns.jp/Antigravity-Files-Explorer/)を開くと、すぐに「Explorer Source」と「Full Repository」が利用できます。

### 2. 新しいプロジェクトを追加する

#### 方法 A: JSON Importを使う（最も簡単）
1. 左サイドバー下部の「📁 Import JSON」ボタンをクリック
2. ローカルで生成した構成ファイル（例: `my_project.json`）を選択
3. プロジェクト名とBase URIを設定して保存

#### 方法 B: URLから追加
1. 左サイドバー下部の「➕ Add Project」ボタンをクリック
2. 以下を入力：
   - **Project Name**: 任意のプロジェクト名
   - **JSON URL**: 構成ファイルのURL（例: `https://example.com/data.json`）
   - **Base URI**: ファイルプレビュー用のベースURL（例: `https://raw.githubusercontent.com/user/repo/main/`）
3. 保存してプロジェクトに切り替え

### 3. プロジェクト構成ファイルを生成する

自分のフォルダ構成をJSONファイル化するには、以下のコマンドを実行します。

**基本コマンド:**
```powershell
node viewer/update_files.js [対象ディレクトリ] [出力ファイル名]
```

**使用例:**
```powershell
# 現在のディレクトリをスキャン
node viewer/update_files.js

# 特定のフォルダをスキャン
node viewer/update_files.js C:\MyProject my_project.json

# リポジトリ全体をスキャン
node viewer/update_files.js C:\Win_tools\Antigravity repo_full.json
```

生成されたJSONファイルを「Import JSON」機能で読み込むか、ウェブ上に公開してURLで登録してください。

### 4. 除外設定のカスタマイズ

スキャン時に特定のフォルダを除外したい場合は、`viewer/config.json`を編集します。

```json
{
  "exclude": [
    ".git",
    "node_modules",
    "dist",
    "build",
    ".vscode"
  ]
}
```

### 5. プロジェクト設定の編集

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
- ✅ ローカルプロジェクトのファイル構成を可視化・共有
- ✅ S3バケット内のファイルをブラウザから直接閲覧
- ✅ 技術ドキュメントやコードベースのナビゲーション
- ✅ プロジェクトポートフォリオとしての活用

## 📝 ライセンス

このプロジェクトはオープンソースです。自由にご利用ください。

---

&copy; 2026 Antigravity System | Universal Project Manager
