import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../users.service';
import { Location } from '@angular/common';
import { FilesService } from '../files.service';

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
  profileImage: string;
  image;

  constructor(
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
    let username = this.route.snapshot.paramMap.get('username');
    this.usersService.getUserByUsername(username).subscribe((user: User) => {
      this.user = user;
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.city = this.user.city;
      this.country = this.user.country;
      this.profileImage = this.user.profileImage;
    });
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  updateInfo() {
    if (this.image != undefined) {
      this.filesService.uploadSingleFile(this.image).subscribe((response) => {
        let path: string = response['path'];
        this.usersService.updateUserInfo(this.user.username, this.firstname, this.lastname, this.city, this.country, "../.." + path.substring(19).replace("\\", "/").replace("\\", "/").replace("\\", "/")).subscribe((res) => {
          if (res['message'] == 'user info updated') {
            this.usersService.getUserByUsername(this.user.username).subscribe((user: User) => {
              if (user) {
                this.location.back();
              } else console.log(user['message'])
            })
          }
        });
      });
    } else {
      this.usersService.updateUserInfo(this.user.username, this.firstname, this.lastname, this.city, this.country, this.profileImage).subscribe((res) => {
        if (res['message'] == 'user info updated') {
          this.usersService.getUserByUsername(this.user.username).subscribe((user: User) => {
            if (user) {
              this.location.back();
            } else console.log(user['message'])
          })
        }
      });
    }
  }
}
