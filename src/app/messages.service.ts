import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getAllThreadsForUser(username) {
    const data = {
      username: username
    }

    return this.http.post(`${Constants.URI}/messages/getAllThreadsForUser`, data);
  }

  startThread(estateId, title, active, read, lastMessageDate, user1, user2, estateOwner, messages) {
    const data = {
      estateId: estateId,
      title: title,
      active: active,
      read: read,
      lastMessageDate: lastMessageDate,
      user1: user1,
      user2: user2,
      estateOwner: estateOwner,
      messages: messages
    }

    return this.http.post(`${Constants.URI}/messages/startThread`, data);
  }

  sendMessageOffer(threadId, text, sender, date, dateFrom, dateTo, offerId) {
    const data = {
      threadId: threadId,
      text: text,
      sender: sender,
      date: date,
      dateFrom: dateFrom,
      dateTo: dateTo,
      offerId: offerId
    }

    return this.http.post(`${Constants.URI}/messages/sendMessageOffer`, data);
  }

  getThreadById(id) {
    const data = {
      id: id
    }

    return this.http.post(`${Constants.URI}/messages/getThreadById`, data);
  }
  
  readMessage(id) {
    const data = {
      id: id
    }

    return this.http.post(`${Constants.URI}/messages/readMessage`, data);
  }
}
