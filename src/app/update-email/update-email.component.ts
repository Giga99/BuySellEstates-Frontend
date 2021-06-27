import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  updateEmailForm: FormGroup;
  submited = false;
  user: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private storage: StorageService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.updateEmailForm = new FormGroup({
      oldEmail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      newEmail: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  updateEmail() {
    let oldEmail = this.updateEmailForm.get('oldEmail').value;
    let password = this.updateEmailForm.get('password').value;
    let newEmail = this.updateEmailForm.get('newEmail').value;
    this.submited = true;

    if (this.updateEmailForm.valid) {
      this.usersService.updateEmail(oldEmail, password, newEmail).subscribe((res) => {
        if (res['message'] == 'email updated') {
          this.usersService.getUserByUsername(this.user.username).subscribe((user: User) => {
            if (user) {
              this.storage.setUser(user);
              this.snackbar.open('Uspesno izmenjen mejl korisnika!', 'U redu', {
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
        } else if (res['message'] == 'email exists') {
          this.snackbar.open('Email vec postoji!', 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackbar.open('Pogresni korisnicki podaci!', 'U redu', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
