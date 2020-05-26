import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from '../../app/components/top/top.component';
import { DetailComponent } from '../../app/components/detail/detail.component';
import { CreateComponent } from '../../app/components/create/create.component';
import { LoginComponent } from '../../app/auth/login/login.component';
import { SignupComponent } from '../../app/auth/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: '/top', pathMatch: 'full'},
  { path: 'top', component: TopComponent},
  { path: 'detail/:id', component: DetailComponent},
  { path: 'create', component: CreateComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
