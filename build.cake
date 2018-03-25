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
  },"ng-serve");
});

Task("Default")
  .IsDependentOn("Run-WebUi")
  .Does(() =>
{
});

RunTarget(target);