#addin nuget:?package=Cake.Docker&version=0.9.0

var target = Argument("target", "Default");

Task("Build-Docker-WebUi")
  .Does(() =>
{
  DockerComposeBuild( new DockerComposeBuildSettings() {
    Files = new string[] {
      "./docker/vlc-remote-control-web-ui/docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-ui"
  });
});

Task("Run-Docker-WebUi")
  .Does(() =>
{
  DockerComposeKill(new DockerComposeKillSettings() {
    Files = new string[] {
      "./docker/vlc-remote-control-web-ui/docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-ui"
  });
  DockerComposeUp(new DockerComposeUpSettings() {
    Files = new string[] {
      "./docker/vlc-remote-control-web-ui/docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-ui"
  },"ng-serve");
});

Task("Default")
  .IsDependentOn("Build-Docker-WebUi")
  .IsDependentOn("Run-Docker-WebUi")
  .Does(() =>
{
});

RunTarget(target);