#addin nuget:?package=Cake.Yarn&version=0.3.7

var target = Argument("target", "Default");
DirectoryPath electronDirectory = "./src/vlc-remote-control/";

Task("build")
  .Does(() =>
{
  Yarn.FromPath(electronDirectory).Install();
  Yarn.FromPath(electronDirectory).RunScript("build");
});

Task("Default")
  .IsDependentOn("build")
  .Does(() =>
{
});

RunTarget(target);