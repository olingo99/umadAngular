import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventCreationPageComponent } from './event-creation-page/event-creation-page.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { AddFriendPageComponent } from './add-friend-page/add-friend-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path : 'eventCreation', component: EventCreationPageComponent},
  {path: 'allEvents', component: AllEventsComponent},
  {path:'addFriend', component: AddFriendPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
