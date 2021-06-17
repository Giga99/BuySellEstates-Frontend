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
      }
    })
  }

  userEstates() {
    this.router.navigate(['userEstates']);
  }

  estateRequests() {
    this.router.navigate(['agentEstateRequests']);
  }
  
  allEstates() {
    this.router.navigate(['agentAllEstates']);
  }

  agreedOffers() {
    this.router.navigate(['allAgreedOffers']);
  }

  addEstate() {
    this.router.navigate(['addEstate']);
  }

  inbox() {
    this.router.navigate(['inbox']);
  }

  settings() {
    this.router.navigate(['settings']);
  }

  logout() {
    this.storage.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }
}
