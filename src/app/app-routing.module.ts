import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './components/top/top.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';

const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  {
    path: '',
    component: TopComponent,
    canActivate: [AuthGuard],
  },
  { path: 'detail/:id', component: DetailComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'create', component: CreateComponent },
  {
    path: 'account',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
