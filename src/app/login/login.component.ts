import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  userType: string;
  message: string;

  login() {
    this.authService.login(this.username, this.password, this.userType).subscribe((user: User) => {
      if(user) {
        alert('OK');
      } else {
        alert('GRESKA')
      }
    })
  }
}
