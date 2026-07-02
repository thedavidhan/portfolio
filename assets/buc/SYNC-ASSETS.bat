@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "sync-assets.ps1"
