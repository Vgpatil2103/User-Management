import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:"user-list",
    pathMatch:'full'
  },
  {
    path:'user-list',
    component:UserListComponent,
    pathMatch:'full'
  },
  {
    path:'add-user',
    component:AddUpdateUserComponent,
    pathMatch:'full'
  },
  {
    path:'update-user/:id',
    component:AddUpdateUserComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'user-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
