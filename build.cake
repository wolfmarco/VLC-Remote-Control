#addin nuget:?package=Cake.Docker&version=0.9.0

var target = Argument("target", "Default");

Task("Stop-WebUi")
  .Does(() =>
{
  DockerComposeKill(new DockerComposeKillSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-ui"
  });
});

Task("Run-WebUi")
  .IsDependentOn("Stop-WebUi")
  .Does(() =>
{
  DockerComposeUp(new DockerComposeUpSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-ui"
  },"run-web-ui");
});

Task("Stop-WebApi")
  .Does(() =>
{
  DockerComposeKill(new DockerComposeKillSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-api"
  });
});

Task("Build-WebApi")
  .IsDependentOn("Stop-WebApi")
  .Does(() =>
{
  DockerComposeUp(new DockerComposeUpSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-api"
  },"build-web-api");
});

Task("Run-WebApi")
  .IsDependentOn("Stop-WebApi")
  .Does(() =>
{
  DockerComposeUp(new DockerComposeUpSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control-web-api"
  },"run-web-api");
});

Task("Default")
  .IsDependentOn("Run-WebApi")
  .Does(() =>
{
});

RunTarget(target);