import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { User } from '../models/User';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  city: string;
  country: string;
  userType: string;
  agency: string;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  register() {
    const user = new User(
      this.firstname, this.lastname, this.username, this.password, this.email, this.city, this.country, ''
    );
    user.userType = this.userType;
    user.agency = this.agency;

    this.authService.register(user).subscribe(response => {
      if (response['message'] == 'user added') {
        this.usersService.answerUserRegistration(this.username, true).subscribe((response) => {
          alert(response['message']);
          this.location.back();
        });
      }
    });
  }
}
