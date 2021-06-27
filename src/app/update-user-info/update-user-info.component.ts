import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FilesService } from '../files.service';
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
  firstname: string;
  lastname: string;
  city: string;
  country: string;
  profileImage: string;
  image

  constructor(
    private storage: StorageService,
    private usersService: UsersService,
    private router: Router,
    private filesService: FilesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.city = this.user.city;
    this.country = this.user.country;
    this.profileImage = this.user.profileImage;
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
                this.storage.setUser(user);
                this.snackbar.open('Uspesno izmenjeni korisnicki podaci', 'U redu', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.router.navigate(['..']);
              } else {
                this.snackbar.open(user['message'], 'U redu', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            })
          } else {
            this.snackbar.open(res['message'], 'U redu', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        });
      });
    } else {
      this.usersService.updateUserInfo(this.user.username, this.firstname, this.lastname, this.city, this.country, "../../assets/users/personPlaceHolder.jpg").subscribe((res) => {
        if (res['message'] == 'user info updated') {
          this.usersService.getUserByUsername(this.user.username).subscribe((user: User) => {
            if (user) {
              this.storage.setUser(user);
              this.snackbar.open('Uspesno izmenjeni korisnicki podaci', 'U redu', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.router.navigate(['..']);
            } else {
              this.snackbar.open(user['message'], 'U redu', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          })
        } else {
          this.snackbar.open(res['message'], 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
