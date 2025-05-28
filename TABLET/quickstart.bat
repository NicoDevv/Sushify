@echo off
REM filepath: c:\Users\admin\Documents\GitHub\Sushify\Sushify-main\TABLET\start-sushify.bat
echo ===================================
echo    SUSHIFY QUICKSTART LAUNCHER
echo ===================================
echo.

REM Imposta i percorsi
set BACKEND_DIR=backend
set FRONTEND_DIR=frontend

echo [1/4] Verificando l'ambiente...
where python >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERRORE] Python non trovato. Assicurati di avere Python installato.
    goto :error
)

where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERRORE] npm non trovato. Assicurati di avere Node.js installato.
    goto :error
)

echo [2/4] Avvio del server backend sulla porta 8080...
start cmd /k "cd %BACKEND_DIR% && echo Avvio del backend Sushify... && python main.py"
echo Backend in avvio... attendere 5 secondi
timeout /t 5 /nobreak > nul

echo [3/4] Avvio del frontend sulla porta 5171...
start cmd /k "cd %FRONTEND_DIR% && echo Avvio del frontend Sushify... && npm run dev"

echo [4/4] Apertura dell'applicazione nel browser...
timeout /t 5 /nobreak > nul
start http://localhost:5171/table-select

echo.
echo ===================================
echo Sushify è in esecuzione!
echo.
echo Backend:   http://localhost:8080
echo Frontend:  http://localhost:5171
echo.
echo Premi un tasto qualsiasi per terminare tutti i processi...
echo ===================================
pause > nul

echo Chiusura di tutti i processi...
taskkill /f /im node.exe > nul 2>&1
taskkill /f /im python.exe > nul 2>&1
echo Applicazione terminata.
goto :eof

:error
echo.
echo Avvio fallito. Verifica i requisiti e riprova.
pause
exit /b 1