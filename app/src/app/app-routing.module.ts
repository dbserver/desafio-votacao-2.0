import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './utils/guards/auth.guard';
import { NewUserComponent } from './home/new-user/new-user.component';
import { PollComponent } from './home/poll/poll.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent,
    children: [
      {
        path: 'new-user',
        component: NewUserComponent
      },
      {
        path: 'poll',
        component: PollComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
