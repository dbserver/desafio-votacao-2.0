import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { InterceptorHandler } from './services/interceptor/interceptor.interceptor';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './home/new-user/new-user.component';
import { MenuComponent } from './home/menu/menu.component';
import { PollComponent } from './home/poll/poll.component';
import { PollReportComponent } from './home/poll/poll-report/poll-report.component';
import {  NgChartsModule } from 'ng2-charts';
import { NewPollComponent } from './home/poll/new-poll/new-poll.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewUserComponent,
    MenuComponent,
    PollComponent,
    PollReportComponent,
    NewPollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgChartsModule,
    QuillModule.forRoot()
  ],
  providers: [
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHandler,
      multi: true,
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
