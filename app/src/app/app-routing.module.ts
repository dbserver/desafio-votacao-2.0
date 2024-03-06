import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './home/new-user/new-user.component';
import { NewPollComponent } from './home/poll/new-poll/new-poll.component';
import { PollReportComponent } from './home/poll/poll-report/poll-report.component';
import { PollComponent } from './home/poll/poll.component';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './services/guards/admin.guard';
import { authGuard } from './services/guards/auth.guard';
import { PollResolver } from './services/resolvers/pollResolver.resolver';

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
        path: 'user/new',
        canActivate: [adminGuard],
        component: NewUserComponent
      },
      {
        path: 'poll',
        component: PollComponent
      },
      {
        path: 'poll/new',
        canActivate: [adminGuard],
        component: NewPollComponent
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
        redirectTo: 'poll'
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
