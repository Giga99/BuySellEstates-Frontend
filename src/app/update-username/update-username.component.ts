import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.css']
})
export class UpdateUsernameComponent implements OnInit {

  oldUsername: String;
  password: String;
  newUsername: String;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  updateUsername() {
    this.usersService.updateUsername(this.oldUsername, this.password, this.newUsername).subscribe((res) => {
      if(res['message'] == 'username updated') {
        this.router.navigate(['..'])
      }
    })
  }
}
