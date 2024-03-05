import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './services/guards/auth.guard';
import { NewUserComponent } from './home/new-user/new-user.component';
import { PollComponent } from './home/poll/poll.component';
import { PollReportComponent } from './home/poll/poll-report/poll-report.component';
import { PollResolver } from './services/resolvers/pollResolver.resolver';
import { adminGuard } from './services/guards/admin.guard';

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
        canActivate: [adminGuard],
        component: NewUserComponent
      },
      {
        path: 'poll',
        component: PollComponent
      },
      {
        path: 'poll/:pollId',
        canActivate: [adminGuard],
        resolve: {
          poll: PollResolver
        },
        component: PollReportComponent
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
