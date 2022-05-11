import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './components/sample/sample.component';
import {RcDashboardModule} from "./modules/rc-dashboard/rc-dashboard.module";

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
  ],
  imports: [
    RcDashboardModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
