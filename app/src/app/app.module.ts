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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewUserComponent,
    MenuComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective
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
