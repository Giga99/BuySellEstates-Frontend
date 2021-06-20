import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { FilesService } from '../files.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submited = false;
  image;
  imagePreview;
  regex;

  constructor(
    private authService: AuthService,
    private filesService: FilesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.regex = /^(?!.*([A-Za-z0-9!@#$%^&*()_+{}[\]|\\\/?.,><:"';])\1{3})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|\\\/?.,><:"';])[A-Za-z\d!@#$%^&*()_+{}[\]|\\\/?.,><:"';]{8,24}$/;

    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      city: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required])
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
    let firstname = this.registerForm.get('firstname').value;
    let lastname = this.registerForm.get('lastname').value;
    let username = this.registerForm.get('username').value;
    let password: string = this.registerForm.get('password').value;
    let confirmPassword = this.registerForm.get('confirmPassword').value;
    let email = this.registerForm.get('email').value;
    let city = this.registerForm.get('city').value;
    let country = this.registerForm.get('country').value;
    this.submited = true;
    console.log(this.registerForm.valid);

    if (password != confirmPassword && password != null && password != '' && confirmPassword != null && confirmPassword != '') {
      this.snackbar.open('Lozinka i potvrda lozinke se ne poklapaju', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (this.registerForm.valid) {

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

          this.authService.register(user).subscribe(response => {
            if (response['message'] == 'user added') {
              this.snackbar.open('Korisnik je uspesno registrovan', 'U redu', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
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

        this.authService.register(user).subscribe(response => {
          if (response['message'] == 'user added') {
            this.snackbar.open('Korisnik je uspesno registrovan', 'U redu', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
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
