import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEstateComponent } from './add-estate/add-estate.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminComponent } from './admin/admin.component';
import { AgentAllEstatesComponent } from './agent-all-estates/agent-all-estates.component';
import { AgentEstateRequestsComponent } from './agent-estate-requests/agent-estate-requests.component';
import { AgentComponent } from './agent/agent.component';
import { AllAgreedOffersComponent } from './all-agreed-offers/all-agreed-offers.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EstateInfoComponent } from './estate-info/estate-info.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { SettingsComponent } from './settings/settings.component';
import { ThreadInfoComponent } from './thread-info/thread-info.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { UpdateUsernameComponent } from './update-username/update-username.component';
import { UserEstatesComponent } from './user-estates/user-estates.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FrontPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'estateInfo/:id', component: EstateInfoComponent },
  {
    path: 'settings', component: SettingsComponent, children: [
      { path: 'updateUserInfo', component: UpdateUserInfoComponent },
      { path: 'updateUsername', component: UpdateUsernameComponent },
      { path: 'updateEmail', component: UpdateEmailComponent },
      { path: 'changePassword', component: ChangePasswordComponent }
    ]
  },
  { path: 'userEstates', component: UserEstatesComponent },
  { path: 'addEstate', component: AddEstateComponent },
  { path: 'editEstate/:id', component: EditEstateComponent },
  {
    path: 'inbox', component: InboxComponent, children: [
      { path: 'threadInfo/:id', component: ThreadInfoComponent }
    ]
  },
  { path: 'agent', component: AgentComponent },
  { path: 'agentEstateRequests', component: AgentEstateRequestsComponent },
  { path: 'agentAllEstates', component: AgentAllEstatesComponent },
  { path: 'allAgreedOffers', component: AllAgreedOffersComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'registrationRequests', component: RegistrationRequestsComponent },
  { path: 'editUser/:username', component: EditUserComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: '**', component: FrontPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
