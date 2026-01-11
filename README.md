# Antigravity File Explorer

GitHub Repository: [https://github.com/EisukeSeta/Antigravity-Files-Explorer](https://github.com/EisukeSeta/Antigravity-Files-Explorer)

Antigravityがアクセス可能なローカルディレクトリのファイルを可視化し、ブラウザ上で高度な操作が可能な次世代ファイルエクスプローラーです。

## 🌟 主な機能

- **美しい階層構造表示**: フォルダとファイルをツリー形式で美しく表示。ディレクトリのネストも一目で把握できます。
- **リアルタイム検索 (New!)**: 
    - 入力と同時にリストをフィルタリングする高速検索機能を搭載。
    - 一致したファイル名はハイライト表示され、その場所（パス）も維持したまま表示されます。
- **マルチ形式プレビュー (New!)**: 
    - ファイルをクリックするだけで、その場で内容を確認できるプレビューモーダルを搭載。
    - **画像**: `.jpg`, `.png`, `.gif`, `.webp`, `.svg` に対応。
    - **マークダウン**: `.md` ファイルをリッチなHTMLとしてレンダリング。
    - **テキスト・コード**: `.txt`, `.js`, `.py`, `.html`, `LICENSE` 等のコードを整形表示。
- **ワンクリック更新**: 「リストを更新」ボタンで最新のファイル状態を再スキャンし、即座に反映。
- **モダンUI**: グラスモフィズムとダークモードを基調とした、直感的で洗練されたデザイン。

## 📂 デプロイ構成

- `viewer/index.html`: ファイル検索・プレビューエンジンを内蔵したメインUI。
- `viewer/server.js`: API（ファイルスキャン実行）と静的ファイル提供を行うNode.jsサーバー。
- `viewer/update_files.js`: ローカルディレクトリを高速走査し、メタデータ構造を抽出するコアロジック。
- `viewer/config.json`: スキャンから除外するフォルダを指定する設定ファイル。
- `viewer/file_data.json`: スキャンされたファイル構成のキャッシュデータ（自動生成）。

## ✨ 設定 (Config)

`viewer/config.json` を編集することで、エクスプローラーに表示させたくないフォルダ（管理用フォルダなど）を指定できます。

```json
{
  "exclude": [
    ".git",
    "node_modules"
  ]
}
```
- **exclude**: 表示から除外したいディレクトリ名のリストを指定します。編集後、「リストを更新」ボタンを押すと反映されます。

## 🚀 使い方

### 1. サーバーを起動する
ターミナルを開き、リポジトリのルートで以下のコマンドを実行します。
```powershell
node viewer/server.js
```

### 2. ブラウザでアクセス
以下のURLを開いてください。
[http://localhost:8000/viewer/index.html](http://localhost:8000/viewer/index.html)

### 3. 操作ガイド
- **検索**: 上部の検索バーに文字を入れると、即座に絞り込まれます。
- **閲覧**: ファイルをクリックするとプレビューが表示されます。モーダルの外側をクリックすると閉じます。
- **同期**: ローカルでファイルを操作（追加・削除・編集）した後は、画面上の「リストを更新」を押してください。

## 🛠️ 技術スタック
- **Frontend**: Vanilla JS (ES6+), CSS3 (Glassmorphism), [Marked.js](https://marked.js.org/) (MD Rendering)
- **Backend**: Node.js (Built-in http module), PowerShell/cmd integration

---
&copy; 2026 Antigravity System | Advanced Agentic Coding Project
