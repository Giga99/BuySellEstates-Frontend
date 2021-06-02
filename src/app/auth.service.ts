import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username, password, userType) {
    const data = {
      username: username,
      password: password,
      userType: userType
    }

    return this.http.post(`${Constants.URI}/auth/login`, data);
  }

  register(user: User) {
    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      email: user.email,
      city: user.city,
      country: user.country,
      accepted: user.accepted,
      userType: user.userType,
      agency: user.agency
    }

    return this.http.post(`${Constants.URI}/auth/register`, data);
  }

  changePassword(username, oldPassword, newPassword) {
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post(`${Constants.URI}/auth/changePassword`, data);
  }
}
