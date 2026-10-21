@echo off
echo ========================================================
echo Starting TaskFlow React Frontend (Port 5173)...
echo ========================================================
cd /d "%~dp0frontend"
npm run dev
pause
