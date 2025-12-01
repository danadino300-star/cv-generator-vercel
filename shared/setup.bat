@echo off
echo 🚀 Demarrage de ProCVBuilder...
echo.

echo 📦 Installation des dependances du client...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dependances du client
    pause
    exit /b %errorlevel%
)

echo.
echo 📦 Installation des dependances du serveur...
cd ..\server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dependances du serveur
    pause
    exit /b %errorlevel%
)

echo.
echo 📦 Installation des dependances partagees...
cd ..\shared
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dependances partagees
    pause
    exit /b %errorlevel%
)

cd ..

echo.
echo ✅ Installation terminee avec succes!
echo.
echo Pour demarrer le projet:
echo   1. Ouvrez un terminal et executez: cd server ^&^& npm run dev
echo   2. Ouvrez un autre terminal et executez: cd client ^&^& npm run dev
echo.
echo N'oubliez pas de configurer le fichier .env dans le dossier server!
pause
