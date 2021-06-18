import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/User';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  userType: string;
  message: string;

  login() {
    this.authService.login(this.username, this.password, this.userType).subscribe((user: User) => {
      if (user) {
        this.storage.setUser(user)
        if (user.userType == "user") {
          this.router.navigate(['home']);
        } else if (user.userType == "agent") {
          this.router.navigate(['agent']);
        } else {
          this.router.navigate(['admin']);
        }
      } else {
        alert('GRESKA')
      }
    })
  }
}
