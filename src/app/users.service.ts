import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  updateUserInfo(username, firstname, lastname, city, country, profileImage) {
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      city: city,
      country: country,
      profileImage: profileImage
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

  getUserByUsername(username) {
    const data = {
      username: username
    }
    return this.http.post(`${Constants.URI}/users/getUserByUsername`, data);
  }

  getRegistrationRequests() {
    return this.http.get(`${Constants.URI}/users/getRegistrationRequests`);
  }

  answerUserRegistration(username, accepted) {
    const data = {
      username: username,
      accepted: accepted
    }

    return this.http.post(`${Constants.URI}/users/answerUserRegistration`, data);
  }

  getAllUsers() {
    return this.http.get(`${Constants.URI}/users/getAllUsers`);
  }

  deleteUser(username) {
    const data = {
      username: username
    }

    return this.http.post(`${Constants.URI}/users/deleteUser`, data);
  }
}
