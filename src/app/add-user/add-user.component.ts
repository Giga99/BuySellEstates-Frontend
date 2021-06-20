import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { User } from '../models/User';
import { UsersService } from '../users.service';
import { FilesService } from '../files.service';

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
  image;
  imagePreview;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private location: Location,
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imagePreview = reader.result;
      }
    }
  }

  register() {
    this.filesService.uploadSingleFile(this.image).subscribe((response) => {
      let path: string = response['path'];
      const user = new User(
        this.firstname, this.lastname, this.username, this.password, this.email, this.city, this.country, "../.." + path.substring(19).replace("\\", "/").replace("\\", "/").replace("\\", "/")
      );
      user.userType = this.userType;
      user.agency = (this.userType == 'agent') ? 'agency1' : null;

      this.authService.register(user).subscribe(response => {
        if (response['message'] == 'user added') {
          this.usersService.answerUserRegistration(this.username, true).subscribe((response) => {
            alert(response['message']);
            this.location.back();
          });
        }
      });
    });
  }
}
