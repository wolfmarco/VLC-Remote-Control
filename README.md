# VLC-Remote-Control

Remote control for VLC media player as Angular Single Page Application (SPA)

# Development

## Setup

    Set-ExecutionPolicy RemoteSigned
    npm install --global --production windows-build-tools
    npm config set python "%USERPROFILE%\.windows-build-tools\python27\python.exe"
    ./node_modules/.bin/electron-rebuild

## Build

    .\build.ps1 -Target build
