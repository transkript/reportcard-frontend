import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './components/sample/sample.component';
import { RcAuthModule } from './modules/rc-auth/rc-auth.module';
import {RcDashboardModule} from "./modules/rc-dashboard/rc-dashboard.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";







@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,

  ],
  imports: [
    RcDashboardModule,
    RcAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
