#addin nuget:?package=Cake.Yarn&version=0.3.7

var target = Argument("target", "Default");
DirectoryPath electronDirectory = "./src/vlc-remote-control/";

Task("clean")
  .Does(() =>
{
  try
  {
    DeleteDirectories(new DirectoryPath[]
    {
      electronDirectory.Combine("obj"),
      electronDirectory.Combine("bin")
    }, new DeleteDirectorySettings
    {
      Recursive = true,
      Force = true
    });
  }
  catch(Exception exception)
  {
    Information( exception.ToString() );
  }
});

Task("restore")
.Does (() =>
{
  DotNetCoreRestore(new DotNetCoreRestoreSettings
  {
    WorkingDirectory = electronDirectory
  });
});

Task("build")
  .Does(() =>
{
  Yarn.FromPath(electronDirectory).Install();
  Yarn.FromPath(electronDirectory).RunScript("build");

  // var exitCodeWithArgument = StartProcess("dotnet", new ProcessSettings
  // { 
  //   Arguments = "electronize start",
  //   WorkingDirectory = electronDirectory
  // });
  // Information("Exit code: {0}", exitCodeWithArgument);
});

Task("Default")
  .IsDependentOn("build")
  .Does(() =>
{
});

RunTarget(target);