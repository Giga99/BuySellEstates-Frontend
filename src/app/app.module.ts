import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstateInfoComponent } from './estate-info/estate-info.component';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdateUsernameComponent } from './update-username/update-username.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UserEstatesComponent } from './user-estates/user-estates.component';
import { AddEstateComponent } from './add-estate/add-estate.component';
import { EditEstateComponent } from './edit-estate/edit-estate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FrontPageComponent,
    ChangePasswordComponent,
    EstateInfoComponent,
    UpdateUserInfoComponent,
    SettingsComponent,
    UpdateUsernameComponent,
    UpdateEmailComponent,
    UserEstatesComponent,
    AddEstateComponent,
    EditEstateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    MatSidenavModule,
    MatCheckboxModule,
    NgbModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue:'de-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
