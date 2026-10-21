@echo off
echo ========================================================
echo Starting TaskFlow MySQL Database Server (Port 3306)...
echo ========================================================
"D:\software\bin\mysqld.exe" --datadir="%~dp0mysql_data" --port=3306 --console
pause
