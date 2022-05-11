import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./modules/rc-dashboard/components/dashboard/dashboard.component";
import {RcHomeComponent} from "./modules/rc-dashboard/components/rc-home/rc-home.component";
import {RcSubjectsComponent} from "./modules/rc-dashboard/components/rc-subjects/rc-subjects.component";
import {RcStudentsComponent} from "./modules/rc-dashboard/components/rc-students/rc-students.component";
import {RcClassesComponent} from "./modules/rc-dashboard/components/rc-classes/rc-classes.component";
import {RcClasslistsComponent} from "./modules/rc-dashboard/components/rc-classlists/rc-classlists.component";

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard',
    children: [
      {component: RcHomeComponent, path: 'home'},
      {component: RcSubjectsComponent, path: 'subjects'},
      {component: RcStudentsComponent, path: 'students'},
      {component: RcClassesComponent, path: 'classes'},
      {component: RcClasslistsComponent, path: 'class-lists'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
