import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './models/User';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nekretomat';

  isLoggedIn: Boolean;
  private isLoggedInSubscription: Subscription;
  showUserOptions = false;
  showAgentOptions = false;
  showAdminOptions = false;

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.storage.loggedInObserver().subscribe((val) => {
      this.isLoggedIn = this.storage.getUser() != null
      if(this.isLoggedIn) {
        let user = this.storage.getUser();

        this.showUserOptions = user.userType == "user";
        this.showAgentOptions = user.userType == "agent";
        this.showAdminOptions = user.userType == "admin";
      }
    })
  }

  logout() {
    this.storage.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }
}
