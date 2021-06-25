import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEstateComponent } from './add-estate/add-estate.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminAgentGuard } from './admin-agent.guard';
import { AgentAllEstatesComponent } from './agent-all-estates/agent-all-estates.component';
import { AgentEstateRequestsComponent } from './agent-estate-requests/agent-estate-requests.component';
import { AgentGuard } from './agent.guard';
import { AgentComponent } from './agent/agent.component';
import { AllAgreedOffersComponent } from './all-agreed-offers/all-agreed-offers.component';
import { AuthGuard } from './auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EstateInfoComponent } from './estate-info/estate-info.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeGuard } from './home.guard';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { SettingsGuard } from './settings.guard';
import { SettingsComponent } from './settings/settings.component';
import { ThreadInfoComponent } from './thread-info/thread-info.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { UpdateUsernameComponent } from './update-username/update-username.component';
import { UserEstatesComponent } from './user-estates/user-estates.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FrontPageComponent, canActivate: [HomeGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'estateInfo/:id', component: EstateInfoComponent, canActivate: [AuthGuard] },
  {
    path: 'settings', component: SettingsComponent, canActivate: [SettingsGuard], children: [
      { path: 'updateUserInfo', component: UpdateUserInfoComponent, canActivate: [SettingsGuard] },
      { path: 'updateUsername', component: UpdateUsernameComponent, canActivate: [SettingsGuard] },
      { path: 'updateEmail', component: UpdateEmailComponent, canActivate: [SettingsGuard] },
      { path: 'changePassword', component: ChangePasswordComponent, canActivate: [SettingsGuard] }
    ]
  },
  { path: 'userEstates', component: UserEstatesComponent, canActivate: [AuthGuard] },
  { path: 'addEstate', component: AddEstateComponent, canActivate: [AuthGuard] },
  { path: 'editEstate/:id', component: EditEstateComponent, canActivate: [AuthGuard] },
  {
    path: 'inbox', component: InboxComponent, canActivate: [AuthGuard], children: [
      { path: 'threadInfo/:id', component: ThreadInfoComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'agent', component: AgentComponent, canActivate: [AgentGuard] },
  { path: 'agentEstateRequests', component: AgentEstateRequestsComponent, canActivate: [AdminAgentGuard] },
  { path: 'agentAllEstates', component: AgentAllEstatesComponent, canActivate: [AdminAgentGuard] },
  { path: 'allAgreedOffers', component: AllAgreedOffersComponent, canActivate: [AdminAgentGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'registrationRequests', component: RegistrationRequestsComponent, canActivate: [AdminGuard] },
  { path: 'editUser/:username', component: EditUserComponent, canActivate: [AdminGuard] },
  { path: 'addUser', component: AddUserComponent, canActivate: [AdminGuard] },
  { path: '**', component: FrontPageComponent, canActivate: [HomeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
