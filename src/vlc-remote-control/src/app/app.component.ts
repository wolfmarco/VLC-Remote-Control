import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private _electronService: ElectronService) { }

  ngOnInit(): void {
    console.log("AppComponent: ngOnInit");

    const ret = this._electronService.remote.globalShortcut.register('CommandOrControl+X', () => {
      console.log('CommandOrControl+X is pressed')
    });
    if (!ret) {
      console.log('registration failed')
    }
    console.log("isRegistered: " + this._electronService.remote.globalShortcut.isRegistered('CommandOrControl+X'));

    this._electronService.remote.app.on('will-quit', () => {
      this._electronService.remote.globalShortcut.unregisterAll();
    })
  }
}
