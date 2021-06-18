import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  firstname: String;
  lastname: String;
  city: String;
  country: String;

  constructor(
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let username = this.route.snapshot.paramMap.get('username');
    this.usersService.getUserByUsername(username).subscribe((user: User) => {
      this.user = user;
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.city = this.user.city;
      this.country = this.user.country;
    });
  }

  updateInfo() {
    this.usersService.updateUserInfo(this.user.username, this.firstname, this.lastname, this.city, this.country).subscribe((res) => {
      if (res['message'] == 'user info updated') {
        this.usersService.getUserByUsername(this.user.username).subscribe((user: User) => {
          if (user) {
            this.location.back();
          } else console.log(user['message'])
        })
      }
    })
  }
}
