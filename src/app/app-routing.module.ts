import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDataComponent } from './admin/master-data.component';
import { TakeResourceComponent } from './normal/take-resource.component';
import { HistoryComponent } from './admin/history.component';
//import { LoginComponent } from './login.component';

const routes: Routes = [
  //{path:"", component: LoginComponent},
  {path:"", component: TakeResourceComponent},
  {path:"takeResource", component: TakeResourceComponent},
  {path:"admin", component: MasterDataComponent},
  {path:"allHistory", component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
