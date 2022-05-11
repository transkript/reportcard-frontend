import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
