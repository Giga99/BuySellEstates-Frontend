import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  city: string;
  country: string;

  register() {
    const user = new User(
      this.firstname, this.lastname, this.username, this.password, this.email, this.city, this.country
    );

    this.authService.register(user).subscribe(response => {
      if (response['message'] == 'user added') {
        alert('OK');
      }
    });
  }
}
