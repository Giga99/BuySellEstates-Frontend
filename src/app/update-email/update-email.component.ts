import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { StorageService } from '../storage.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

  oldEmail: String;
  password: String;
  newEmail: String;
  user: User;

  constructor(private usersService: UsersService, private router: Router, private storage: StorageService) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
  }

  updateEmail() {
    this.usersService.updateEmail(this.oldEmail, this.password, this.newEmail).subscribe((res) => {
      if (res['message'] == 'email updated') {
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
