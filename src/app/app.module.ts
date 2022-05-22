import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SampleComponent} from './components/sample/sample.component';
import {RcAuthModule} from './modules/rc-auth/rc-auth.module';
import {RcDashboardModule} from "./modules/rc-dashboard/rc-dashboard.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {injectables} from "./services/injectables/rc-api.injectables";
import {MessageService} from "primeng/api";


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
    HttpClientModule,
  ],
  providers: [
    injectables,
    {provide: MessageService, useClass: MessageService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
