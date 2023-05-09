import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { EventDayComponent } from './event-day/event-day.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { EventComponent } from './event/event.component';

import { HTTPInterceptorService } from './httpinterceptor.service';
import { FriendComponent } from './friend/friend.component';
import { EventCreationPageComponent } from './event-creation-page/event-creation-page.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { EventTemplateComponent } from './event-template/event-template.component';
// import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
// import { AuthTokenService } from './auth-token.service';
import { config } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    EventDayComponent,
    FriendListComponent,
    EventComponent,
    FriendComponent,
    EventCreationPageComponent,
    CategoriesListComponent,
    TemplatesListComponent,
    EventTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // JwtModule.forRoot({
    //   config:{
    //     tokenGetter:function tokenGetter(){
    //       return AuthTokenService
    //     }
    //   }
    // }
    // ) ,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true},
    // {provide: JwtModule, useValue: JWT_OPTIONS}, JwtModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
