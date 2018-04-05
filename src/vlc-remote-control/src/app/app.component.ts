import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  @ViewChild("text") text: ElementRef;

  constructor(private _electronService: ElectronService) { }

  ngOnInit(): void {
    console.log("AppComponent: ngOnInit");
    if (this._electronService.isElectronApp)
    {
      const ret = this._electronService.remote.globalShortcut.register('CommandOrControl+X', () =>
      {
        console.log('CommandOrControl+X is pressed');
      });

      if (!ret)
      {
        console.log('registration failed');
      }

      console.log("isRegistered: " + this._electronService.remote.globalShortcut.isRegistered('CommandOrControl+X'));

      this._electronService.remote.app.on('will-quit', () =>
      {
        this._electronService.remote.globalShortcut.unregisterAll();
      });

      this._electronService.ipcRenderer.on('changeText', (event, arg) => {
        this.text.nativeElement.value = arg;
      });
    }
  }

  onClick() {
    console.log("onClick");
    this._electronService.ipcRenderer.send("testMessage","Hi!!!");
  }

  connectToCec() {
    this._electronService.ipcRenderer.send("cec","connect");
  }

  onKeyup(event: any) {
    console.log("------------------------------------------------");
    console.log("altKey: " + event.altKey);
    console.log("ctrlKey: " + event.ctrlKey);
    console.log("shiftKey: " + event.shiftKey);
    console.log("key: " + event.key );
    console.log("code: " + event.code );
    

    this.text.nativeElement.value = `${event.code}\n`;
  }
}


