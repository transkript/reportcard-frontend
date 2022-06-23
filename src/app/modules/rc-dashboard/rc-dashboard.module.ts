import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PanelMenuModule} from "primeng/panelmenu";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";

import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashbodyComponent} from './components/dashbody/dashbody.component';
import {FooterComponent} from './components/footer/footer.component';
import {RcHomeComponent} from './components/rc-home/rc-home.component';
import {RcSubjectsComponent} from './components/rc-subjects/rc-subjects.component';
import {RcStudentsComponent} from './components/rc-students/rc-students.component';
import {RcClassesComponent} from './components/rc-classes/rc-classes.component';
import {RcClasslistsComponent} from './components/rc-classlists/rc-classlists.component';
import {RcSettingsComponent} from './components/rc-settings/rc-settings.component';
import {RcBodyIntroComponent} from './components/rc-body-intro/rc-body-intro.component';
import {DataViewModule} from "primeng/dataview";
import {ReusableModule} from "../reusable/reusable.module";
import {ToastModule} from "primeng/toast";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {RcApplicationsComponent} from './components/rc-applications/rc-applications.component';


@NgModule({
  declarations: [
    TopMenuComponent,
    SideMenuComponent,
    DashboardComponent,
    DashbodyComponent,
    FooterComponent,
    RcHomeComponent,
    RcSubjectsComponent,
    RcStudentsComponent,
    RcClassesComponent,
    RcClasslistsComponent,
    RcSettingsComponent,
    RcBodyIntroComponent,
    RcApplicationsComponent
  ],
  imports: [
    CommonModule,
    ReusableModule,
    MenubarModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    PanelMenuModule,
    RippleModule,
    CardModule,
    DividerModule,
    DataViewModule,
    ToastModule,
    FormsModule,
    TableModule,
    InputSwitchModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class RcDashboardModule {
}
