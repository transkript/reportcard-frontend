import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbody',
  styleUrls: ['./dashbody.component.scss'],
  template: `
    <div class="dash-body">
      <span class="h2 text-primary text-capitalize">Title</span>

      <router-outlet ></router-outlet>
    </div>
  `
})
export class DashbodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
