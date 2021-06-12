import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { StorageService } from '../storage.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit {

  user: User;
  firstname: String;
  lastname: String;
  city: String;
  country: String;

  constructor(private storage: StorageService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.city = this.user.city;
    this.country = this.user.country;
  }

  updateInfo() {
    this.usersService.updateUserInfo(this.user.username, this.firstname, this.lastname, this.city, this.country).subscribe((res) => {
      if (res['message'] == 'user info updated') {
        this.usersService.getUserByUsername(this.user.username).subscribe((user: User) => {
          if (user) {
            this.storage.setUser(user)
            this.router.navigate(['..'])
          } else console.log(user['message'])
        })
      }
    })
  }
}
