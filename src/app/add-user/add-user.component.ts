import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { User } from '../models/User';
import { UsersService } from '../users.service';
import { FilesService } from '../files.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  submited = false;
  image;
  imagePreview;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private location: Location,
    private filesService: FilesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let regex = /^(?!.*([A-Za-z0-9!@#$%^&*()_+{}[\]|\\\/?.,><:"';])\1{3})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|\\\/?.,><:"';])[A-Za-z\d!@#$%^&*()_+{}[\]|\\\/?.,><:"';]{8,24}$/;

    this.addUserForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      userType: new FormControl(null, [Validators.required])
    });
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
    let firstname = this.addUserForm.get('firstname').value;
    let lastname = this.addUserForm.get('lastname').value;
    let username = this.addUserForm.get('username').value;
    let password = this.addUserForm.get('password').value;
    let confirmPassword = this.addUserForm.get('confirmPassword').value;
    let email = this.addUserForm.get('email').value;
    let city = this.addUserForm.get('city').value;
    let country = this.addUserForm.get('country').value;
    let userType = this.addUserForm.get('userType').value;
    this.submited = true;

    if (password != confirmPassword && password != null && password != '' && confirmPassword != null && confirmPassword != '') {
      this.snackbar.open('Lozinka i potvrda lozinke se ne poklapaju', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.addUserForm.valid) {

      if (this.image != undefined) {
        this.filesService.uploadSingleFile(this.image).subscribe((response) => {
          let path: string = response['path'];
          const user = new User(
            firstname,
            lastname,
            username,
            password,
            email,
            city,
            country,
            "../.." + path.substring(19).replace("\\", "/").replace("\\", "/").replace("\\", "/")
          );
          user.userType = userType;
          user.agency = (userType == 'agent') ? 'agency1' : null;

          this.authService.register(user).subscribe(response => {
            if (response['message'] == 'user added') {
              this.usersService.answerUserRegistration(username, true).subscribe(response => {
                this.snackbar.open('Korisnik je uspesno dodat', 'U redu', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.location.back();
              });
            } else if (response['message'] == 'username exist') {
              this.snackbar.open('Korisnicko ime vec postoji', 'U redu', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            } else if (response['message'] == 'email exist') {
              this.snackbar.open('Email vec postoji', 'U redu', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            } else {
              this.snackbar.open(response['message'], 'U redu', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          });
        });
      } else {
        const user = new User(
          firstname,
          lastname,
          username,
          password,
          email,
          city,
          country,
          "../../assets/users/personPlaceHolder.jpg"
        );
        user.userType = userType;
        user.agency = (userType == 'agent') ? 'agency1' : null;

        this.authService.register(user).subscribe(response => {
          if (response['message'] == 'user added') {
            this.usersService.answerUserRegistration(username, true).subscribe(response => {
              this.snackbar.open('Korisnik je uspesno dodat', 'U redu', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.location.back();
            });
          } else if (response['message'] == 'username exist') {
            this.snackbar.open('Korisnicko ime vec postoji', 'U redu', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else if (response['message'] == 'email exist') {
            this.snackbar.open('Email vec postoji', 'U redu', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            this.snackbar.open(response['message'], 'U redu', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        });
      }
    }
  }
}
