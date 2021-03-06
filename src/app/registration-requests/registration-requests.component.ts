import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {

  registrationRequests: Array<User>;
  allUsers: Array<User>;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.usersService.getRegistrationRequests().subscribe((requests: Array<User>) => {
      this.registrationRequests = requests;
    });


    this.usersService.getAllUsers().subscribe((users: Array<User>) => {
      this.allUsers = users.filter((user) => user.userType != 'admin');
    });
  }

  answerRegistrationRequest(username, answer) {
    this.usersService.answerUserRegistration(username, answer).subscribe((response) => {
      if (response['message'] == 'user updated') {
        this.snackbar.open("Uspesno odgovoreno na zahtev za registraciju!", 'U redu', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        this.snackbar.open(response['message'], 'U redu', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      window.location.reload();
    });
  }

  deleteUser(username) {
    this.usersService.deleteUser(username).subscribe((response) => {
      if (response['message'] == 'user deleted') {
        this.snackbar.open("Korisnik uspesno izbrisan!", 'U redu', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        this.snackbar.open(response['message'], 'U redu', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      window.location.reload();
    });
  }

  editUser(username) {
    this.router.navigate(['editUser', username]);
  }

  navigateToAddUser() {
    this.router.navigate(['addUser']);
  }
}
