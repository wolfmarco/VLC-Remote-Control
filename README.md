# VLC-Remote-Control

Remote control for VLC media player as Angular Single Page Application (SPA)

# Development

## Setup

    Set-ExecutionPolicy RemoteSigned

## Create a new angular project

-i, --interactive => Keep STDIN open even if not attached
-t, --tty => Allocate a pseudo-TTY
-v, --volume list => Bind mount a volume

    docker run -it -v D:/Git-Repos/VLC-Remote-Control/src/:/src vlcremotecontrolwebui_ng-serve /bin/sh
    
    ng new vlc-remote-control-web-ui

## Create a new asp.net core project

    docker run -it -v D:/Git-Repos/VLC-Remote-Control/src/:/src vlcremotecontrolwebapi_??? /bin/sh

    docker run -it -v D:/Git-Repos/VLC-Remote-Control/src/:/src microsoft/dotnet:2.0.6-sdk-2.1.101-stretch /bin/sh
    dotnet new webapi

## Docker commands

### Delete all containers
docker rm $(docker ps -a -q)

### Delete all images
docker rmi $(docker images -q)