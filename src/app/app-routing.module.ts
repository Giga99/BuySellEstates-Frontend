import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EstateInfoComponent } from './estate-info/estate-info.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
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
  { path: '**', component: FrontPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
