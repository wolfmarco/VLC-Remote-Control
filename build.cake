#addin nuget:?package=Cake.Docker&version=0.9.0

var target = Argument("target", "Default");

Task("Stop")
  .Does(() =>
{
  DockerComposeKill(new DockerComposeKillSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-controli"
  });
});

Task("Run")
  .IsDependentOn("Stop")
  .Does(() =>
{
  DockerComposeUp(new DockerComposeUpSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control"
  },"run");
});

Task("Default")
  .IsDependentOn("Run")
  .Does(() =>
{
});

RunTarget(target);