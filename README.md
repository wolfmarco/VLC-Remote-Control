# VLC-Remote-Control

Remote control for VLC media player as Angular Single Page Application (SPA)

# Development

## Setup

    Set-ExecutionPolicy RemoteSigned

## Build

    .\build.ps1 -Target build

## Run a interactive PowerShell inside docker container

-i, --interactive => Keep STDIN open even if not attached
-t, --tty => Allocate a pseudo-TTY
-v, --volume list => Bind mount a volume

    docker run -it -v D:/Git-Repos/VLC-Remote-Control/src/:C:/src vlcremotecontrol_run powershell

## Docker commands

### Stop all containers

docker stop $(docker ps -a -q)

### Delete all containers
docker rm $(docker ps -a -q)

### Delete all images
docker rmi $(docker images -q)