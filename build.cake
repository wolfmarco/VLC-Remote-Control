#addin nuget:?package=Cake.Docker&version=0.9.0

var target = Argument("target", "Default");

Task("stop")
  .Does(() =>
{
  DockerComposeKill(new DockerComposeKillSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-controli"
  });
});

Task("run")
  .IsDependentOn("stop")
  .Does(() =>
{
  DockerComposeUp(new DockerComposeUpSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control"
  },"run");
});

Task("build")
  .IsDependentOn("stop")
  .Does(() =>
{
  DockerComposeUp(new DockerComposeUpSettings() {
    Files = new string[] {
      "./docker-compose.yml"
    },
    ProjectName = "vlc-remote-control"
  },"build");
});

Task("Default")
  .IsDependentOn("run")
  .Does(() =>
{
});

RunTarget(target);