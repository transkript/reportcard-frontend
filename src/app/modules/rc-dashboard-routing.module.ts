import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RcHomeComponent} from "./rc-dashboard/components/rc-home/rc-home.component";

const routes: Routes = [
  {component: RcHomeComponent, path: 'home'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcDashboardRoutingModule {
}
