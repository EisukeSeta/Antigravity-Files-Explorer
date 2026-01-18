# Antigravity File Explorer - S3デプロイスクリプト
# 使用方法: .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  File Explorer - S3デプロイスクリプト" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# S3バケットとパス
$s3Bucket = "s3://www.seta.mydns.jp/Antigravity-Files-Explorer/"

# アップロードするファイル
$files = @(
    "index.html",
    "file_data.json",
    "config.json"
)

Write-Host "[1/2] ファイルをS3にアップロード中..." -ForegroundColor Yellow

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  - $file をアップロード中..." -ForegroundColor Gray
        aws s3 cp $file "$s3Bucket$file"
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ $file のアップロードに失敗しました" -ForegroundColor Red
            exit 1
        }
    }
    else {
        Write-Host "⚠️  $file が見つかりません" -ForegroundColor Yellow
    }
}

Write-Host "✅ アップロード完了" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  デプロイ成功! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "アクセスURL: https://www.seta.mydns.jp/Antigravity-Files-Explorer/" -ForegroundColor Cyan
Write-Host ""
