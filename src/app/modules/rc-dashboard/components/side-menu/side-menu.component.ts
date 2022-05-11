import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
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
