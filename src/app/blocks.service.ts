import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {

  constructor(private http: HttpClient) { }

  blockUnblockUser(username, blockedUsername) {
    const data = {
      username: username,
      blockedUsername: blockedUsername
    }

    return this.http.post(`${Constants.URI}/blocks/blockUnblockUser`, data);
  }

  isBlocked(username1, username2) {
    const data = {
      username1: username1,
      username2: username2
    }

    return this.http.post(`${Constants.URI}/blocks/isBlocked`, data);
  }
}
