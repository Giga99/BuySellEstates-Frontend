import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  updateUserInfo(username, firstname, lastname, city, country) {
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      city: city,
      country: country
    }
    return this.http.post(`${Constants.URI}/users/updateUserInfo`, data);
  }

  updateUsername(oldUsername, password, newUsername) {
    const data = {
      oldUsername: oldUsername,
      password: password,
      newUsername: newUsername
    }
    return this.http.post(`${Constants.URI}/users/updateUserUsername`, data);
  }

  updateEmail(oldEmail, password, newEmail) {
    const data = {
      oldEmail: oldEmail,
      password: password,
      newEmail: newEmail
    }
    return this.http.post(`${Constants.URI}/users/updateUserEmail`, data);
  }
}
