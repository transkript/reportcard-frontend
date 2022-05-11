import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-side-menu',
  styleUrls: ['./side-menu.component.scss'],
  template: `
    <div class="side-menu-bar">
      <p-panelMenu [model]="sideMenuItems"
                   [multiple]="false"
                   styleClass="side-menu-bar">
      </p-panelMenu>
    </div>
  `
})
export class SideMenuComponent implements OnInit {
  sideMenuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.sideMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard/home'],
      },
      {
        label: 'Subjects',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/dashboard/subjects'],
      },
      {
        label: 'Students',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/dashboard/students'],
      },
      {
        label: 'Classes',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/dashboard/classes'],
      },
      {
        label: 'Class Lists',
        icon: 'pi pi-fw pi-folder',
        routerLink: ['/dashboard/class-lists'],
      },

      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/dashboard/settings'],
      }

    ]
  }

}
