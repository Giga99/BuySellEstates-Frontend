import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/User';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  subject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.subject.next(this.getUser() !== null);
  }

  public setUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.subject.next(true);
  }

   public getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  logout() {
    window.sessionStorage.clear();
    this.subject.next(false);
  }

  loggedInObserver(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
