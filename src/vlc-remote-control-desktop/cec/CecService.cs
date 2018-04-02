using CecSharp;
using ElectronNET.API;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace vlc_remote_control_desktop.cec
{
    public class CecService : CecCallbackMethods, IHostedService
    {
        //private int LogLevel;
        private LibCecSharp Lib;
        private LibCECConfiguration Config;
        private BrowserWindow browserWindow;

        public CecService()
        {
        }

        public override int ReceiveKeypress(CecKeypress key)
        {
            Electron.IpcMain.Send(browserWindow, "changeText", $"{key.Keycode} ({key.Duration})");
            return base.ReceiveKeypress(key);
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            browserWindow = Electron.WindowManager.BrowserWindows.First();

            Electron.IpcMain.On("cec", (args) => {
                if("connect".Equals(args))
                {
                    Electron.IpcMain.Send(browserWindow, "changeText", $"Connecting...");
                    Connect();
                }
            });

            Electron.IpcMain.Send(browserWindow, "changeText", $"Cec service started...");

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Lib?.Close();
            return Task.CompletedTask;
        }

        private void Connect()
        {
            Config = new LibCECConfiguration();
            Config.DeviceTypes.Types[0] = CecDeviceType.RecordingDevice;
            Config.DeviceName = "CEC Tester";
            Config.ClientVersion = LibCECConfiguration.CurrentVersion;
            Config.SetCallbacks(this);
            //LogLevel = (int)CecLogLevel.All;

            Lib = new LibCecSharp(Config);
            Lib.InitVideoStandalone();

            CecAdapter[] adapters = Lib.FindAdapters(string.Empty);
            if (adapters.Length > 0)
            {
                var isOpen = Lib.Open(adapters[0].ComPort, 10000);
                Electron.IpcMain.Send(browserWindow, "changeText", $"Open: {isOpen}");
            }
            else
            {
                Electron.IpcMain.Send(browserWindow, "changeText", $"No adapters found!");
            }
        }
    }
}
