import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-top-menu',
  styleUrls: ['./top-menu.component.scss'],
  template: `
    <div class="top-menu">
      <p-menubar styleClass="top-menu-bar">
        <ng-template pTemplate="start">
          <span class="h1 font-weight-bold p-menuitem-text rms-title">R . M . S</span>
        </ng-template>
        <ng-template pTemplate="end">
          <div class="d-flex">
            <div class="flex-item mx-2">
              <span class="fw-bold {{online ? 'online-text': 'offline-text' }}">{{online ? "ONLINE" : "OFFLINE"}}</span>
            </div>
            <div class="flex-item text-center">
              <ul>
                <li class="font-weight-bold">John Doe</li>
                <li>Admin</li>
              </ul>
            </div>
            <div class="flex-item">
              <button pButton label="Logout" icon="pi pi-power-off"></button>
            </div>
          </div>
        </ng-template>
      </p-menubar>
    </div>
  `
})
export class TopMenuComponent implements OnInit {

  online: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.checkOnlineStatus();
  }

  checkOnlineStatus(): void {
    setTimeout(() => {
      let req: XMLHttpRequest = new XMLHttpRequest();
      req.open("GET", `${environment.serverUrl}/api/default/test`, false);
      try {
        req.send();
        this.online = req.status == 200;
      } catch (e) {
        this.online = false;
        //console.clear(); // TODO this is quite dangerous
      }
    }, 500);
  }
}
