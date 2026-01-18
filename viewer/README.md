# Antigravity Universal File Explorer 🚀

GitHub Repository: [https://github.com/EisukeSeta/Antigravity-Files-Explorer](https://github.com/EisukeSeta/Antigravity-Files-Explorer)

![Deploy to S3](https://github.com/EisukeSeta/Antigravity-Files-Explorer/actions/workflows/deploy.yml/badge.svg)

## 🌐 ライブデモ

**[https://www.seta.mydns.jp/Antigravity-Files-Explorer/](https://www.seta.mydns.jp/Antigravity-Files-Explorer/)**

## 🌟 新しいコンセプト: 多目的プロジェクトマネージャー

これまでの「ローカルファイルの閲覧」という枠を超え、あらゆるファイル構成（ローカル、ウェブ、S3など）をプロジェクト単位で統合管理・閲覧できる「ユニバーサル・ファイルエクスプローラー」に進化しました。

### ✨ 主な新機能

1.  **マルチプロジェクト管理**:
    *   サイドバーから複数のプロジェクト（ファイル構成）を瞬時に切り替え可能。
    *   プロジェクトはブラウザにキャッシュされ、次回アクセス時もすぐに再開できます。
2.  **ファイル構成の動的読み込み (Import/URL)**:
    *   **JSON Import**: ローカルで生成した `file_data.json` をドラッグ＆ドロップで読み込み可能（サーバー不要）。
    *   **URL指定**: 外部サーバーやGitHub上に公開されているファイル構成JSONを指定して読み込み。
3.  **柔軟なパス解決 (Base URI)**:
    *   プロジェクトごとに「Base URI」を設定することで、ファイルのプレビュー先を自由に切り替えられます（例：S3バケット、ローカルサーバー、GitHub Raw等）。
4.  **プレミアム・ユーザーインターフェース**:
    *   洗練されたサイドバーレイアウト。
    *   グラスモフィズムを追求したモダンでレスポンシブなデザイン。

## 📂 構成ファイル

- `viewer/index.html`: 新しいプロジェクト管理機能を搭載したメインUI。
- `viewer/update_files.js`: ローカルディレクトリをスキャンし、インポート用の `file_data.json` を生成するツール。

## 🚀 使い方

### 1. プロジェクトの追加
*   **Import JSON**: `update_files.js` で生成したファイルをボタンから選択するだけで、ブラウザにプロジェクトとして登録されます。
*   **Add Project**: プロジェクト名、JSONのURL、およびプレビュー用のベースURLを入力して登録します。

### 2. ファイル構成の生成（ローカル用）
自分のPCのファイルを閲覧したい場合は、以下のコマンドで構成ファイルを作成し、それをアプリにインポートしてください。
```powershell
node viewer/update_files.js
```
生成された `viewer/file_data.json` をブラウザにドロップします。

## 🛠️ 技術スタック
- **Frontend**: Vanilla JS (ES6+), CSS3 (Modern Glassmorphism), [Marked.js](https://marked.js.org/)
- **Storage**: Browser LocalStorage (Project caching)
- **Deployment**: AWS S3 + GitHub Actions

---
&copy; 2026 Antigravity System | Universal Project Manager project
