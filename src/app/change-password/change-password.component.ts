import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submited = false;
  username: string;

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.username = this.storage.getUser().username;

    let regex = /^(?!.*([A-Za-z0-9!@#$%^&*()_+{}[\]|\\\/?.,><:"';])\1{3})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|\\\/?.,><:"';])[A-Za-z\d!@#$%^&*()_+{}[\]|\\\/?.,><:"';]{8,24}$/;

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(regex)]),
      confirmNewPassword: new FormControl(null, [Validators.required]),
    });
  }

  changePassword() {
    let oldPassword = this.changePasswordForm.get('oldPassword').value;
    let newPassword = this.changePasswordForm.get('newPassword').value;
    let confirmNewPassword = this.changePasswordForm.get('confirmNewPassword').value;
    this.submited = true;

    if (newPassword != confirmNewPassword && newPassword != null && newPassword != '' && confirmNewPassword != null && confirmNewPassword != '') {
      this.snackbar.open('Lozinka i potvrda lozinke se ne poklapaju', 'U redu', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if(this.changePasswordForm.valid) {
      this.authService.changePassword(this.username, oldPassword, newPassword).subscribe(response => {
        if(response['message'] == 'password updated') {
          this.storage.logout();
          this.router.navigate(['/']);
        }
      }, err => {
        if(err['error']['message'] == 'user not found') {
          this.snackbar.open('Stara lozinka nije dobra', 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackbar.open(err['error']['message'], 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
