import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./modules/rc-dashboard/components/dashboard/dashboard.component";
import {RcHomeComponent} from "./modules/rc-dashboard/components/rc-home/rc-home.component";
import {RcSubjectsComponent} from "./modules/rc-dashboard/components/rc-subjects/rc-subjects.component";
import {RcStudentsComponent} from "./modules/rc-dashboard/components/rc-students/rc-students.component";
import {RcClassesComponent} from "./modules/rc-dashboard/components/rc-classes/rc-classes.component";
import {RcClasslistsComponent} from "./modules/rc-dashboard/components/rc-classlists/rc-classlists.component";
import {HomeComponent} from './modules/rc-auth/components/home/home.component';
import {RcWelcomeComponent} from "./components/rc-welcome/rc-welcome.component";
import {RcSettingsComponent} from "./modules/rc-dashboard/components/rc-settings/rc-settings.component";
import {RcApplicationsComponent} from "./modules/rc-dashboard/components/rc-applications/rc-applications.component";

const routes: Routes = [
  {
    component: RcWelcomeComponent,
    path: '',
    children: []
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
    children: [
      {component: RcHomeComponent, path: 'home'},
      {component: RcSubjectsComponent, path: 'subjects'},
      {component: RcClassesComponent, path: 'classes'},
      {component: RcStudentsComponent, path: 'students'},
      {component: RcApplicationsComponent, path: 'applications'},
      {component: RcClasslistsComponent, path: 'class-lists'},
      {component: RcSettingsComponent, path: 'settings'}
    ]
  },
  {
    component: HomeComponent,
    path: 'auth',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
