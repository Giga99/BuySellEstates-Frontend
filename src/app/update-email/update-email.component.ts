import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

  oldEmail: String;
  password: String;
  newEmail: String;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  updateEmail() {
    this.usersService.updateEmail(this.oldEmail, this.password, this.newEmail).subscribe((res) => {
      if(res['message'] == 'email updated') {
        this.router.navigate(['..'])
      }
    })
  }
}
