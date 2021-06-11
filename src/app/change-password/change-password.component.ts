import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  username: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;

  changePassword() {
    if (this.newPassword != this.newPasswordConfirmation) alert("Lozinke se ne poklapaju!");
    else {
      this.authService.changePassword(this.username, this.oldPassword, this.newPassword).subscribe(response => {
        if(response['message'] == 'password updated') {
          this.storage.logout();
          this.router.navigate(['/']);
        }
      })
    }
  }
}
