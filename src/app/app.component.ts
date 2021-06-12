import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.storage.loggedInObserver().subscribe((val) => {
      this.isLoggedIn = this.storage.getUser() != null
    })
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
