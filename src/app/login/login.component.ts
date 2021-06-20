import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/User';
import { StorageService } from '../storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submited = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      userType: new FormControl(null, [Validators.required])
    });
  }

  login() {
    let username = this.loginForm.get('username').value
    let password = this.loginForm.get('password').value
    let userType = this.loginForm.get('userType').value
    this.submited = true;

    if (this.loginForm.valid) {
      this.authService.login(username, password, userType).subscribe((user: User) => {
        if (user) {
          if (user.reviewed == false) {
            this.snackbar.open('Korisnikov zahtev za registraciju se trenutno razmatra, molimo vas sacekajte odluku', 'U redu', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else if (user.accepted == false) {
            this.snackbar.open('Korisnikov zahtev za registraciju je odbijen', 'U redu', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            this.storage.setUser(user)
            if (user.userType == "user") {
              this.router.navigate(['home']);
            } else if (user.userType == "agent") {
              this.router.navigate(['agent']);
            } else {
              this.router.navigate(['admin']);
            }
          }
        } else {
          this.snackbar.open('Pogresni podaci', 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
