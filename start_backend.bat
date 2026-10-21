@echo off
echo ========================================================
echo Starting TaskFlow Spring Boot Backend (Port 8080)...
echo ========================================================
cd /d "%~dp0backend"
call .\mvnw.cmd spring-boot:run
pause
