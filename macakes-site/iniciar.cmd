@echo off
setlocal
cd /d "%~dp0"
echo Preparando maCAKES a partir desta pasta.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\preview-local.ps1"
if errorlevel 1 pause

