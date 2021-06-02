import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
        alert(response['message']);
      })
    }
  }
}
