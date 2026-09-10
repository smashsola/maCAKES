param([switch]$SyncOnly)
$ErrorActionPreference = 'Stop'
$sourceDirectory = Split-Path -Parent $PSScriptRoot
$previewDirectory = Join-Path $env:LOCALAPPDATA 'maCAKES-preview'
# Reuse the already prepared local runtime when available.
$preparedDirectory = Join-Path $env:USERPROFILE '.cache\macakes-preview'
if (Test-Path -LiteralPath (Join-Path $preparedDirectory 'node_modules')) { $previewDirectory = $preparedDirectory }
New-Item -ItemType Directory -Force -Path $previewDirectory | Out-Null
$sourceFolders = @('app', 'components', 'hooks', 'lib', 'public', '.openai')
$sourceFiles = @('package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'vite.config.ts', 'next.config.ts', 'tsconfig.json', 'next-env.d.ts')
function Sync-Preview {
  foreach ($folder in $sourceFolders) {
    $folderPath = Join-Path $sourceDirectory $folder
    if (!(Test-Path -LiteralPath $folderPath)) { continue }
    foreach ($file in Get-ChildItem -LiteralPath $folderPath -Recurse -File) {
      $relativePath = $file.FullName.Substring($sourceDirectory.Length + 1)
      $destination = Join-Path $previewDirectory $relativePath
      $existing = Get-Item -LiteralPath $destination -ErrorAction SilentlyContinue
      if (!$existing -or $existing.LastWriteTimeUtc -ne $file.LastWriteTimeUtc -or $existing.Length -ne $file.Length) {
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $destination) | Out-Null
        Copy-Item -LiteralPath $file.FullName -Destination $destination -Force
      }
    }
  }
  foreach ($name in $sourceFiles) {
    $file = Get-Item -LiteralPath (Join-Path $sourceDirectory $name) -ErrorAction SilentlyContinue
    if (!$file) { continue }
    $destination = Join-Path $previewDirectory $name
    $existing = Get-Item -LiteralPath $destination -ErrorAction SilentlyContinue
    if (!$existing -or $existing.LastWriteTimeUtc -ne $file.LastWriteTimeUtc) { Copy-Item -LiteralPath $file.FullName -Destination $destination -Force }
  }
}
Sync-Preview
if (!$SyncOnly) {
  Push-Location $previewDirectory
  try {
    if (!(Test-Path 'node_modules/.bin/vinext.cmd')) { & pnpm install --frozen-lockfile; if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel instalar as dependencias.' } }
    $running = $false
    try { $running = (Invoke-WebRequest 'http://localhost:3000/' -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200 } catch { }
    if (!$running) {
      $serverProcess = Start-Process -FilePath (Get-Command pnpm.cmd).Source -ArgumentList @('dev') -WorkingDirectory $previewDirectory -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $previewDirectory 'preview.log') -RedirectStandardError (Join-Path $previewDirectory 'preview-error.log')
    }
    Write-Host 'maCAKES: http://localhost:3000/ - arquivos sincronizados da pasta original. Feche esta janela para encerrar a sincronizacao.'
  } finally { Pop-Location }
}
while ($true) { Start-Sleep -Seconds 2; Sync-Preview }
