import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstatesService } from '../estates.service';
import { Estate } from '../models/estate';
import { User } from '../models/User';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-user-estates',
  templateUrl: './user-estates.component.html',
  styleUrls: ['./user-estates.component.css']
})
export class UserEstatesComponent implements OnInit {

  estates: Array<Estate>;
  user: User;

  constructor(
    private estatesService: EstatesService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.storage.getUser()
    let username = this.user.userType == 'agent' ? this.user.agency : this.user.username;
    this.estatesService.getUserEstates(username).subscribe((estates: Array<Estate>) => {
      this.estates = estates.filter(estate => estate.approved);
    })
  }

  navigateToInfo(id: Number) {
    this.router.navigate(['estateInfo', id]);
  }

  navigateToEdit(id: Number) {
    this.router.navigate(['editEstate', id]);
  }
}
